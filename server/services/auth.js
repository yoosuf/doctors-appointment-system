const User = require("../model/v1/user");
const Role = require("../model/v1/role");
const Permission = require("../model/Permission");
const PermissionRole = require("../model/PermissionRole");
const {
  JWT,
  STATUS,
  MASTER,
  LOGIN_ACCESS,
  PLATFORM,
  USER_ROLE,
  ROLE,
  EMAIL_SUBJECT,
  POPULATE,
} = require("../config/authConstant");
const { assignPermissionPatient } = require("../services/seeder");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const service = require("./../utils/dbService");
const ejs = require("ejs");
const path = require("path");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const { createJob } = require("../jobs/index");
const util = require("../utils/messages");
const { JWT_TOKEN_EXPIRE } = require("../config/environment/auth");

/* const {
  sendOTP,
  verifyOTP,
  resendOTP
} = require('../config/sms');
 */
const { ENV, FLAG, LOGIN_LINK_EXPIRE } = require("../constants/common");
async function generateToken(
  user,
  email,
  secret,
  expireTime = JWT_TOKEN_EXPIRE
) {
  return jwt.sign(
    {
      id: user.id,
      email: email,
    },
    secret,
    {
      expiresIn: expireTime,
    }
  );
}

async function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const userPermission = async (id) => {
  const roles = await Role.find({
    _id: id,
  });
  const permissionRoles = await PermissionRole.find({
    roleId: {
      $in: roles.map((role) => role._id),
    },
  }).select("permissionId");
  const permissionRoleIds = permissionRoles.map(
    (permission) => permission.permissionId
  );
  let permissions = await Permission.find({
    _id: {
      $in: permissionRoleIds,
    },
  }).select(["route_name", "module"]);
  permissions = _.groupBy(permissions, "module");
  const rolePermissions = {};
  Object.keys(permissions).map((objectKey) => {
    rolePermissions[objectKey] = permissions[objectKey].map(
      (a) => a.route_name
    );
  });
  return rolePermissions;
};

// send mail function using ejs files
const emailSend = async (emailData, fileName, emailSubject) => {
  const htmlData = await ejs.renderFile(
    path.join(__dirname, `../views/${fileName}.ejs`),
    {
      emailData,
    }
  );
  let obj = {
    email: emailData.email,
    subject: emailSubject,
    htmlData: htmlData,
  };
  await createJob("sendMail", obj, {});
};

// verify Password
const verifyPassword = async (user, password, req, res) => {
  const isPasswordMatched = await user.isPasswordMatch(password);
  if (!(password == MASTER.MASTER_PASSWORD || isPasswordMatched)) {
    req.userId = user.id;
    throw new Error(_localize("auth.incorectPassword", req));
  }
};

// verify login token
const verifyLoginToken = async (user, loginToken, req, res) => {
  try {
    if (user.mobileToken?.isUsed) {
      throw new Error(_localize("auth.linkExpire", req));
    }
    const jwtToken = await verifyToken(loginToken, JWT.SECRET);
    const rootUser = await User.findOne({
      _id: jwtToken.id,
    });
    if (rootUser) {
      user.mobileToken = {
        token: loginToken,
        isUsed: true,
      };
      await service.updateDocument(User, user.id, user);
    }
  } catch (error) {
    logger.error("Error - verifyLoginToken", error);
    throw new Error(error);
  }
};
// user details function
const reuseData = async (user, data) => {
  try {
    user.activeStatus = {
      status: STATUS.ONLINE,
      date: moment().toISOString(),
    };
    const { ...userDtaa } = user.toJSON();

    await service.updateDocument(User, user.id, user);
    const token = await generateToken(userDtaa, data?.email, JWT.SECRET);
    const rolePermissions = await userPermission(user.roleId);
    if (userDtaa.flag == FLAG.THREE) {
      delete userDtaa["flag"];
    }
    const userToReturn = {
      ...userDtaa,
      token,
      rolePermissions,
    };

    let emailData = {
      user_firstname: user.firstName,
      user_lastname: user.lastName,
      email: user.email,
    };
    emailSend(emailData, "login_success", EMAIL_SUBJECT.LOGIN_SUCCESSFULLY);
    return { flag: true, userToReturn };
  } catch (error) {
    logger.error("Error - reuseData", error);
    throw new Error(error);
  }
};

module.exports = {
  userPermission: userPermission,
  generateToken: generateToken,
  loginUser: async ({
    email,
    password,
    url,
    req,
    loginToken,
    res,
  }) => {
    try {
      const user = await User.findOne({
        $or: [
          { emails: { $elemMatch: { email: email, isDefault: true } } },
        ],
      }).populate(POPULATE);
      if (!user) {
        const message = _localize("auth.invalidEmail", req);
        res.message = message;
        logger.error("Error - loginUserFail", message);
        return util.notFound([], res);
      }
      const data = _.find(user.emails, { isDefault: true });
      await Role.findOne({ _id: user.roleId }, "code");
      if (data?.isVerified == false) {
        req.userId = user.id;
        throw new Error(_localize("auth.email", req));
      }
      loginToken && (await verifyLoginToken(user, loginToken, req, res));
      password && (await verifyPassword(user, password, req, res));
      return reuseData(user, data);
    } catch (error) {
      logger.error("Error - loginUser", error);
      throw new Error(error);
    }
  },

  // send login link on mobile number. check email, userName and mobile number is valid or not
  emailOrMobileLink: async ({
    phone,
    countryCode,
    email,
    req,
    res,
  }) => {
    try {
      const data = [];
      phone ? data.push({ phone: phone }) : "";
      email
        ? data.push(
            { emails: { $elemMatch: { email: email, isDefault: true } } }
          )
        : "";
      let user = await User.findOne({ $or: data });
      if (!user) {
        const message = _localize("auth.invalidMobile", req);
        res.message = message;
        logger.error("Error - emailOrMobileLinkUserNotFound", message);
        return util.notFound([], res);
      } else if (user.phone == phone) {
        const token = await generateToken(
          user,
          user?.email,
          JWT.SECRET,
          LOGIN_LINK_EXPIRE
        );
        const link = `${process.env.APP_URL}auth/login-verify?token=${token}&email=${user.email}`;
        await User.findByIdAndUpdate(
          { _id: user._id },
          { mobileToken: { token: token, isUsed: false } }
        );
        let emailData = {
          user_firstname: user.firstName,
          user_lastname: user.lastName,
          confirm_link: link,
          email: user.email,
        };
        emailSend(emailData, "mobile_login", EMAIL_SUBJECT.LOGIN_LINK_SMS);
        let obj = {
          link: link,
          countryCode: countryCode,
          phone: phone,
        };
        await createJob("sendSMS", obj, {});

        return { flag: true, link, message: _localize("auth.mobileLink", req) };
      } else {
        return { flag: true, message: _localize("auth.userData", req) };
      }
    } catch (error) {
      logger.error("Error - emailOrMobileLink", error);
      throw new Error(error);
    }
  },
  registration: async (body, url, req) => {
    try {
      const user = await service.findUser(body.email, body.phone);
      if (user && user.email == body.email) {
        throw new Error(_localize("auth.emailExist", req));
      } else if (user && user.phone == body.phone) {
        throw new Error(_localize("auth.mobileExits", req));
      } else {
        const PatientRole = await Role.findOne({
          code: ROLE.PATIENT,
        });
        body.roleId = PatientRole.id;
        body.emails = [
          {
            email: body.email,
            isDefault: true,
          },
        ];
        let result = await service.createDocument(User, body);

        let token = null;
        token = await generateToken(result, body.email, JWT.SECRET);
        // let link = `${process.env.SNAPCRACK_NODE_URL}client/auth/email-verification?token=${token}`;
        //   const htmlData = await ejs.renderFile(path.join(__dirname, '../views/verification_email.ejs'), {
        //    user_name: body.firstName,
        //    confirm_link:link
        //  });
        //  await sendEmail(body.email, EMAIL_SUBJECT.EMAIL_VERIFICATION_LINK, htmlData);
        assignPermissionPatient(result._id);

        return { result, token };
      }
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  },
  verifyEmail: async (body, req) => {
    try {
      let payload = null;
      payload = await verifyToken(body.token, JWT.SECRET);
      if (payload) {
        const user = await User.findOne({
          _id: payload.id,
        });
        if (user) {
          const data = _.find(user.emails, {
            email: user.email,
          });
          data.isVerified = true;
          delete body.token;
          body.emails = [data];
          await User.updateOne(
            {
              _id: payload.id,
            },
            body
          );
          return true;
        } else {
          throw new Error(_localize("auth.user", req));
        }
      } else {
        throw new Error(_localize("auth.link", req));
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  resendEmailVerificationLink: async (body) => {
    try {
      let email = body.email;
      let userId = body.userId;
      const user = await User.findOne({ _id: userId });

      if (user && user.emails) {
        const data = _.find(user.emails, {
          email: user.email,
          isVerified: false,
        });
        if (data != undefined && data != null) {
          let token = await generateToken(user, data.email, JWT.SECRET);
          let link = `${process.env.SNAPCRACK_NODE_URL}client/auth/email-verification?token=${token}`;

          const htmlData = await ejs.renderFile(
            path.join(__dirname, "../views/verification_email.ejs"),
            {
              user_name: user.firstName,
              confirm_link: link,
            }
          );
          let obj = {
            email: user.email,
            subject: EMAIL_SUBJECT.EMAIL_VERIFICATION_LINK,
            htmlData: htmlData,
          };
          await createJob("sendMail", obj, {});
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  },
  /* verificationOTP: async (body) => {
       try {
           const user = await User.findOne({
               email: body.email,
           });
           if (!user) {
               throw new Error('User not found')
           } else {
               const data = _.find(user.emails, {email: body.email})
               const sysDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
               let result = {};
               const expireTime = moment(data.codeExpiresOn, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
               if (expireTime > sysDateTime) {
                   if (body.emailCode == MASTER.MASTER_OTP || data.verificationCode == body.emailCode) {
                       body.emails = [{
                           email: body.email,
                           isDefault: true,
                           isVerified: true
                       }];
                       await User.updateOne({_id: user.id}, body)
                       result.token = await generateToken({id: user.id}, body.email, JWT.SECRET);
                       return result
                   } else {
                       throw new Error('Verification code is wrong')
                   }
               } else {
                   throw new Error('Token is expire')
               }
           }
       } catch (err) {
           throw new Error(err)
       }
   },
   resendOTP: async (body) => {
       try {
           const user = await User.findOne({
               email: body.email,
           });
           if (!user) {
               throw new Error('User not found')
           } else {
               const OTP = Math.floor(100000 + Math.random() * 900000);
               const htmlData = await ejs.renderFile(path.join(__dirname, '../views/email.ejs'), {
                   user_name: user.firstName,
                   otp: OTP,
               });
               await sendEmail(body.email, EMAIL_SUBJECT.EMAIL_OTP, htmlData);
               const sysdate = moment().format('YYYY-MM-DD HH:mm:ss');
               const codeExpiresTime = moment(sysdate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
               body.emails = [{
                   email: body.email,
                   isDefault: true,
                   isVerified: false,
                   verificationCode: OTP,
                   codeExpiresOn: codeExpiresTime
               }];
               await User.updateOne({_id: user.id}, body);
               return true;
           }
       } catch (err) {
           throw new Error(err)
       }
   },
   */
  forgotPassword: async (body, url, req) => {
    try {
      const user = await User.findOne({
        $or: [
          { phone: body.phone },
          { emails: { $elemMatch: { email: body.email, isDefault: true } } },
        ],
      });
      if (!user) {
        if (body.phone) {
          throw new Error(_localize("auth.invalidMobile", req));
        } else {
          throw new Error(_localize("auth.emailNotExist", req));
        }
      } else {
        let token = null;
        token = await generateToken(user, user.email, JWT.SECRET);
        let link = null;
        if (url.includes("client")) {
          link = `${process.env.APP_URL}recover-password?token=${token}`;
        } else {
          link = `${process.env.APP_URL}auth/password/reset?token=${token}`;
        }
        logger.error(link);
        const htmlData = await ejs.renderFile(
          path.join(__dirname, "../views/reset-password.ejs"),
          {
            first_name: user.firstName,
            last_name: user.lastName,
            email_id: user.email,
            confirm_link: link,
          }
        );
        let obj = {
          email: user.email,
          subject: EMAIL_SUBJECT.RESET_PASSWORD_LINK,
          htmlData: htmlData,
        };
        await createJob("sendMail", obj, {});
        return true;
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  resetPassword: async (url, body, req) => {
    try {
      let payload = null;
      payload = await verifyToken(body.token, JWT.SECRET);
      if (payload) {
        const user = await User.findOne({
          _id: payload.id,
        });
        if (user) {
          const password = await bcrypt.hash(body.password, 8);
          const data = _.find(user.emails, {
            email: user.email,
          });
          data.isVerified = true;
          delete body.token;
          body.emails = [data];
          body.password = password;
          await User.updateOne(
            {
              _id: payload.id,
            },
            body
          );
          const htmlData = await ejs.renderFile(
            path.join(__dirname, "../views/password_confirmation_change.ejs"),
            {
              user_name: user.firstName,
              email_id: user.email,
            }
          );

          let obj = {
            email: user.email,
            subject: EMAIL_SUBJECT.PASSWORD_CONFIRMATION_CHANGES,
            htmlData: htmlData,
          };
          await createJob("sendMail", obj, {});
          return true;
        } else {
          throw new Error(_localize("auth.user", req));
        }
      } else {
        throw new Error(_localize("auth.link", req));
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  /* verifyTfa: async (body, url) => {
       try {
           let user = await User.findOne({
               'emails': {
                   $elemMatch: {
                       email: body.email,
                       isDefault: true,
                   }
               }
           });
           if (!user) {
               throw new Error('User not found');
           }
           const data = _.find(user.emails, {email: body.email});
           // if (data.isVerified == false) {
           //     throw new Error('Email is not verified');
           // }
           if (!body.token) {
               throw new Error('Please provide token');
           }

           // Verify that the user token matches what it should at this moment
           var verified = speakeasy.totp.verify({
               secret: user.tfa_authentication_code,
               encoding: 'base32',
               token: body.token
           });
           if (verified) {
               let result = {};
               result.token = await generateToken(user, body.email, JWT.SECRET)
               return result;
           } else {
               throw new Error('Please enter valid authentication code.');
           }
       } catch (err) {
           throw new Error(err)
       }
   },
   sendMobileOtp: async (body, url) =>
       new Promise(async (resolve, reject) => {
           try {
               const user = await User.findOne({
                   'emails': {
                       $elemMatch: {
                           email: body.email,
                           isDefault: true
                       }
                   }
               });
               if (!user) {
                   return reject('User not found')
               } else {

                   const data = _.find(user.phones, {isDefault: true})
                   if (data !== undefined) {
                       // const OTP = Math.floor(100000 + Math.random() * 900000);
                       // const message = 'Dear Customer, ' + OTP + ' is your one time password(OTP) for phone verification.';
                       // const sysdate = moment().format('YYYY-MM-DD HH:mm:ss');
                       // const codeExpiresTime = moment(sysdate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
                       //send mobile otp
                       await sendOTP(data.countryCode + data.phone).then((result) => {
                           return resolve(result);
                       }).catch((err) => {
                           return reject(err);
                       })
                       // await Promise.all(result).then((data) => {
                       //     return data;
                       // }).catch((err) => {
                       //     throw new Error(err)
                       // });
                       // body.phones = [{
                       //     phone: data.phone,
                       //     isDefault: true,
                       //     isVerified: false,
                       //     verificationCode: OTP,
                       //     codeExpiresOn: codeExpiresTime
                       // }];
                       // await User.updateOne({_id: user.id}, body)
                       // logger.error(result)
                       // return result;
                   } else {
                       return reject('No phone number found')
                   }

               }
           } catch (err) {
               return reject(err)
           }
       }),
   resendMobileOtp: async (body, url) =>
       new Promise(async (resolve, reject) => {
           try {
               const user = await User.findOne({
                   'emails': {
                       $elemMatch: {
                           email: body.email,
                           isDefault: true
                       }
                   }
               });
               if (!user) {
                   return reject('User not found')
               } else {

                   const data = _.find(user.phones, {isDefault: true})
                   if (data !== undefined) {
                       // const OTP = Math.floor(100000 + Math.random() * 900000);
                       // const message = 'Dear Customer, ' + OTP + ' is your one time password(OTP) for phone verification.';
                       // const sysdate = moment().format('YYYY-MM-DD HH:mm:ss');
                       // const codeExpiresTime = moment(sysdate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
                       //send mobile otp
                       await resendOTP(data.countryCode + data.phone, body.requestId).then((result) => {
                           return resolve(result);
                       }).catch((err) => {
                           return reject(err);
                       })
                       // await Promise.all(result).then((data) => {
                       //     return data;
                       // }).catch((err) => {
                       //     throw new Error(err)
                       // });
                       // body.phones = [{
                       //     phone: data.phone,
                       //     isDefault: true,
                       //     isVerified: false,
                       //     verificationCode: OTP,
                       //     codeExpiresOn: codeExpiresTime
                       // }];
                       // await User.updateOne({_id: user.id}, body)
                       // logger.error(result)
                       // return result;
                   } else {
                       return reject('No phone number found')
                   }

               }
           } catch (err) {
               return reject(err)
           }
       }),
   verificationMobileOTP: async (body) =>
       new Promise(async (resolve, reject) => {
           try {

               const user = await User.findOne({
                   'emails': {
                       $elemMatch: {
                           email: body.email,
                           isDefault: true
                       }
                   }
               });
               if (!user) {
                   return reject('User not found')
               } else {
                   // const data = _.find(user.phones, {isDefault: true})
                   // const sysDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
                   // let result = {};
                   // const expireTime = moment(data.codeExpiresOn, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                   // if (expireTime > sysDateTime) {
                   //     if (data.verificationCode == body.code) {
                   //         body.phones = [{
                   //             phone: data.phone,
                   //             isDefault: true,
                   //             isVerified: true
                   //         }];
                   //         await User.updateOne({_id: user.id}, body)
                   //         result.token = await generateToken({id: user.id}, body.email, JWT.ADMIN_SECRET);
                   //         return result
                   //     } else {
                   //         throw new Error('Verification code is wrong')
                   //     }
                   // } else {
                   //     throw new Error('Token is expire')
                   // }
                   if (body.pin == MASTER.MASTER_OTP && process.env.NODE_ENV != PRODUCTION){
                       let resultObj = { verified : true};
                       let result = await generateTokenManually(resultObj, user, body)
                       return resolve(result);                 
                   }
                   await verifyOTP(body.requestId, body.pin).then(async (result) => {
                       result = await generateTokenManually(result, user, body)
                       return resolve(result);
                   }).catch((err) => {
                       return reject(err);
                   });
               }
           } catch (err) {
               return reject(err)
           }
       }),
   */
  setNewPassword: async (id, body, req) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({
          _id: id,
        });
        if (user) {
          const isPasswordMatched = await user.isPasswordMatch(body.password);
          if (isPasswordMatched) {
            if (user && user.password) {
              const match = await bcrypt.compare(
                body.new_password,
                user.password
              );
              if (match) {
                return reject(_localize("auth.passwordMatch", req));
              }
            }
            const password = await bcrypt.hash(body.new_password, 8);
            await User.updateOne(
              {
                _id: id,
              },
              {
                password: password,
              }
            );

            if (body.sendEmail) {
              const htmlData = await ejs.renderFile(
                path.join(
                  __dirname,
                  "../views/password_confirmation_change.ejs"
                ),
                {
                  user_name: user.firstName,
                  email_id: user.email,
                }
              );

              let obj = {
                email: user.email,
                subject: EMAIL_SUBJECT.PASSWORD_CONFIRMATION_CHANGES,
                htmlData: htmlData,
              };
              await createJob("sendMail", obj, {});
            }
            resolve();
          } else {
            return reject(_localize("auth.wrongPassword", req));
          }
        } else {
          return reject(_localize("auth.user", req));
        }
      } catch (err) {
        logger.error("error", err);
        return reject(err);
      }
    }),
  logoutUser: async (id) => {
    try {
      const user = await service.getSingleDocumentById(User, id);
      user.activeStatus = {
        status: STATUS.OFFLINE,
        date: moment().toISOString(),
      };
      const statusUpdate = await service.updateDocument(User, id, user);
      return statusUpdate;
    } catch (error) {
      return error;
    }
  },
};
