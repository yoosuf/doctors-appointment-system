const authService = require("../../services/auth");
const util = require("../../utils/messages");
const User = require("../../model/v1/user");
const service = require("../../utils/dbService");
const _ = require("lodash");
const storeUserActivity = require("../../services/storeUserActivity");

const { JWT, EMAIL_SUBJECT } = require("../../config/authConstant");
//const validation = require("../../utils/validateRequest");
//const authSchemaKey = require("../../utils/validation/authValidation");
const ejs = require("ejs");
const { generateToken, resetPassword } = require("../../services/auth");
const path = require("path");
//const {sendEmail} = require('../../config/email');
const jwt = require("jsonwebtoken");
const { MESSAGE } = require("../../config/message");
const { ACTIVITY } = require("../../constants/common");
const { result } = require("lodash");

module.exports = {
  login: async (req, res) => {
    try {
      var { email, password, loginToken } = req.body;
      let url = req.originalUrl;
      const result = await authService.loginUser({
        email,
        password,
        url,
        req,
        loginToken,
        res,
      });
      if (result?.flag) {
        req.userId = result.id;
        storeUserActivity.storeUserActivity(
          req,
          res,
          email,
          ACTIVITY.LOGIN_USER,
          _localize("auth.userLogin", req)
        );
        return util.loginSuccess(result.userToReturn, res);
      }
    } catch (error) {
      storeUserActivity.storeUserActivity(
        req,
        res,
        email,
        ACTIVITY.LOGIN_USER,
        error
      );
      logger.error("Error - login", error);
      return util.loginFailed(error, res);
    }
  },

  // Send login link on mobile number. check userName and email is valid user or not
  emailOrMobileLinkLogin: async (req, res) => {
    try {
      var { phone, countryCode, email } = req.body;
      let url = req.originalUrl;
      const result = await authService.emailOrMobileLink({
        phone,
        countryCode,
        email,
        req,
        res,
      });
      if (result?.flag) {
        return util.successResponse(result, res);
      }
    } catch (error) {
      logger.error("Error - emailOrMobileLinkLogin", error);
      return util.loginFailed(error, res);
    }
  },
  /* enableTfa: async (req, res) => {
        try {
            const body = req.body;
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

            var secret = speakeasy.generateSecret();
            var url = speakeasy.otpauthURL({secret: secret.ascii, label: body.email, algorithm: 'sha512'});

            QRCode.toDataURL(url, async function (err, image_data) {
                if (err) {
                    throw new Error(err)
                }
                await User.updateOne(
                    {_id: user._id},
                    {tfa_authentication_code: secret.base32, tfa: true, tfa_image_url: image_data}
                );
                return util.successResponse(image_data, res);
            });
        } catch (error) {
            logger.error("Error - enableTfa",error)
            util.failureResponse(error, res);
        }
    },
    verifyTfa: async (req, res) => {
        try {
            const body = req.body;
            let url = req.originalUrl
            let result = await authService.verifyTfa(body, url);
            if (result) {
                return util.successResponse(result, res);
            }
        } catch (err) {
            logger.error("Error - verifyTfa",error)
            util.failureResponse(err, res);
        }
    }, */
  verifyEmail: async (req, res) => {
    try {
      let result = await authService.verifyEmail(req.body);
      if (result) {
        res.message = MESSAGE.EMAIL_VERIFIED.message;
        return util.successResponse(result, res);
      }
    } catch (error) {
      logger.error("Error - Failed to Verify Email", error);
      util.loginFailed(error, res);
    }
  },

  resendEmailVerificationLink: async (req, res) => {
    try {
      let result = await authService.resendEmailVerificationLink(req.body);
      if (result) {
        res.message = MESSAGE.EMAIL_VERIFICATION.message;
        return util.successResponse(result, res);
      } else {
        return util.failureResponse(
          { message: MESSAGE.EMAIL_ALREADY_VERIFIED.message },
          res
        );
      }
    } catch (error) {
      logger.error("Error - sending Email Verification Link");
      return util.failureResponse(error, res);
    }
  },

  forgotPassword: async (req, res) => {
    const body = req.body;
    try {
      /*  let isValid = validation.validateParamsWithJoi(
                 req.body,
                 authSchemaKey.forgotPassword
             );
             if (isValid.error) {
                 return util.inValidParam(isValid.details, res);
             } */
      let url = req.originalUrl;
      let result = await authService.forgotPassword(req.body, url, req);
      if (result) {
        storeUserActivity.storeUserActivity(
          req,
          res,
          body.email,
          ACTIVITY.FORGOT_PASSWORD,
          _localize("auth.passwordReset", req)
        );
        res.message = MESSAGE.RESET_PASSWORD_LINK.message;
        return util.successResponse(
          _localize("auth.passwordLinkSend", req),
          res
        );
      }
    } catch (error) {
      storeUserActivity.storeUserActivity(
        req,
        res,
        body.email,
        ACTIVITY.FORGOT_PASSWORD,
        error
      );
      logger.error("Error - forgotPassword", error);
      util.failureResponse(error, res);
    }
  },

  resetPassword: async (req, res) => {
    try {
      const body = req.body;
      /* let isValid = validation.validateParamsWithJoi(
                req.body,
                authSchemaKey.resetPassword
            );
            if (isValid.error) {
                return util.inValidParam(isValid.details, res);
            }
 */
      let url = req.originalUrl;
      let result = await authService.resetPassword(url, body, req);
      if (result) {
        return util.changePasswordResponse({}, res);
      }
    } catch (error) {
      logger.error("Error - resetPassword", error);
      return util.failureResponse(error, res);
    }
  },
  /*   loginViaOtp: async (req, res) => {
         try {
             const body = req.body;
             let isValid = validation.validateParamsWithJoi(
                 req.body,
                 authSchemaKey.email
             );
             if (isValid.error) {
                 return util.inValidParam(isValid.details, res);
             }
             let url = req.originalUrl;
             await authService.sendMobileOtp(body, url).then((result) => {
                 return util.successResponse(result, res);
             }).catch((err) => {
                 return util.failureResponse({message: err}, res);
             });
         } catch (error) {
             logger.error("Error - loginViaOtp",error)
             return util.failureResponse(error, res);
         }
     },
     resendLoginOtp: async (req, res) => {
         try {
             const body = req.body;
             let isValid = validation.validateParamsWithJoi(
                 req.body,
                 authSchemaKey.email
             );
             if (isValid.error) {
                 return util.inValidParam(isValid.details, res);
             }
             let url = req.originalUrl;
             await authService.resendMobileOtp(body, url).then((result) => {
                 return util.successResponse(result, res);
             }).catch((err) => {
                 return util.failureResponse({message: err}, res);
             });

         } catch (error) {
             logger.error("Error - resendLoginOtp",error)
             return util.failureResponse(error, res);
         }
     },
     verificationViaOtp: async (req, res) => {
         try {
             let isValid = validation.validateParamsWithJoi(
                 req.body,
                 authSchemaKey.mobileVerification
             );
             if (isValid.error) {
                 return util.inValidParam(isValid.details, res);
             }
             await authService.verificationMobileOTP(req.body).then((result) => {
                 return util.verificationOTP(result, res);
             }).catch((err) => {
                 return util.failureResponse({message: err}, res);
             });
         } catch (error) {
             logger.error("Error - verificationViaOtp",error)
             return util.failureResponse(error, res);
         }
     },
     */
  getProfile: async (req, res) => {
    try {
      let options = {};
      let query = {};

      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };
      }

      if (req.body.query !== undefined) {
        query = {
          ...req.body.query,
        };
      }
      query._id = req.user.id;
      const result = await service.getAllDocuments(User, query, options);
      if (result && result !== undefined) {
        res.message = MESSAGE.USER_PROFILE_GET.message;
        return util.successResponse(result, res);
      } else {
        return util.recordNotFound([], res);
      }
    } catch (error) {
      logger.error("Error - getProfile", error);
      return util.failureResponse(error, res);
    }
  },

  getMe: async (req, res) => {
    try {
      let options = {};
      let query = {};

      if (req.body.options !== undefined) {
        options = {
          ...req.body.options,
        };
      }

      if (req.body.query !== undefined) {
        query = {
          ...req.body.query,
        };
      }
      query._id = req.user.id;
      const result = await service.getAllDocuments(User, query, options);
      if (result && result !== undefined) {
        res.message = MESSAGE.USER_PROFILE_GET.message;
        return util.successResponse(result, res);
      } else {
        return util.recordNotFound([], res);
      }
    } catch (error) {
      logger.error("Error - getProfile", error);
      return util.failureResponse(error, res);
    }
  },
  updateProfile: async (req, res) => {
    try {
      let data = {
        ...req.body,
      };

      const findUser = await service.findUser(data.email, data.phone);
      const result = await service.updateDocument(User, req.user.id, data);
      if (findUser && findUser.email !== data.email) {
        let token = await generateToken(findUser, data.email, JWT.SECRET);
        let link = `${process.env.APP_URL}admin/set-password?token=${token}`;
        /*     const htmlData = await ejs.renderFile(path.join(__dirname, '../../views/reset_password.ejs'), {
                        user_name: data.firstName,
                        confirm_link: link,
                    });
                    await sendEmail(data.email, EMAIL_SUBJECT.RESET_PASSWORD_LINK, htmlData); */
        res.message = MESSAGE.RESET_PASSWORD_LINK.message;
        return util.successResponse(
          "Password Link has been send successfully",
          res
        );
      }
      return util.updateProfileResponse({}, res);
    } catch (error) {
      logger.error("Error - updateProfile", error);
      return util.failureResponse(error, res);
    }
  },

  logout: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT.SECRET, async (err, verifiedJwt) => {
        if (err) {
          res.send(err.message);
        } else {
          const id = verifiedJwt.id;
          const user = await authService.logoutUser(id);
          const data = user.activeStatus;
          res.message = MESSAGE.LOGOUT.message;
          util.successResponse(data, res);
        }
      });
    } catch (error) {
      logger.error("Error - logout", error);
      util.failureResponse(error, res);
    }
  },
};
