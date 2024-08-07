const authService = require("../../services/auth");
const util = require("../../utils/messages");
//const authSchemaKey = require("../../utils/validation/authValidation");
//const validation = require("../../utils/validateRequest");
const utils = require("../../utils/messages");
const jwt = require("jsonwebtoken");
const { JWT } = require("../../config/authConstant");
const { createAccount } = require("../../config/recurly");
const { MESSAGE } = require("../../config/message");
module.exports = {
  login: async (req, res) => {
    try {
      let { email, password, loginToken } = req.body;
      let url = req.originalUrl;

      const result = await authService.loginUser({
        email,
        password,
        url,
        req,
        loginToken,
        res,
      });
      if (result?.falg) {
        req.userId = result.id;
        return util.loginSuccess(result.userToReturn, res);
      }
    } catch (error) {
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

  
  register: async (req, res) => {
    try {
      /*   let isValid = validation.validateParamsWithJoi(
            req.body,
            authSchemaKey.schemaKeys
        );
        if (isValid.error) {
            return utils.inValidParam(isValid.details, res);
        } */
      let url = req.originalUrl;


      // console.log(eq.body)
      var result = await authService.registration(req.body, url, req);
      let create = await createAccount(result.result);
      if (result) {
        res.message = MESSAGE.USERNAME_REGISTERED.message;
        return util.successResponse(result, res);
      }
    } catch (error) {
      logger.error("Error - register", error);
      util.failureResponse(error, res);
    }
  },


  verifyEmail: async (req, res) => {
    try {
      const body = req.query;
      let url = req.originalUrl;
      let result = await authService.verifyEmail(body);
      if (result) {
        res.message = MESSAGE.EMAIL_VERIFIED.message;
        res.redirect(`${process.env.APP_URL}`);
        // return util.successResponse('Email has been verified', res);
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
        return util.successResponse(
          "Email Verification Link has been sent",
          res
        );
      } else {
        res.message = MESSAGE.EMAIL_ALREADY_VERIFIED.message;
        return util.successResponse("Email is already verified", res);
      }
    } catch (error) {
      logger.error("Error - sending Email Verification Link");
      return util.failureResponse(error, res);
    }
  },
  /* verificationOtp: async (req, res) => {
        try {
            let isValid = validation.validateParamsWithJoi(
                req.body,
                authSchemaKey.verification
            );
            if (isValid.error) {
                return utils.inValidParam(isValid.details, res);
            }
            let result = await authService.verificationOTP(req.body);
            if (result) {
                return util.verificationOTP(result, res);
            }
        } catch (error) {
            logger.error("Error - verificationOtp",error)
            util.failureResponse(error, res);
        }
    },
    resendOtp: async (req, res) => {
        try {
            let isValid = validation.validateParamsWithJoi(
                req.body,
                authSchemaKey.email
            );
            if (isValid.error) {
                return utils.inValidParam(isValid.details, res);
            }
            let result = await authService.resendOTP(req.body);
            if (result) {
                return util.resendOTP(result, res);
            }
        } catch (error) {
            logger.error("Error - resendOtp",error)
            util.failureResponse(error, res);
        }
    }, */

  forgotPassword: async (req, res) => {
    try {
      /* let isValid = validation.validateParamsWithJoi(
          req.body,
          authSchemaKey.email
      );
      if (isValid.error) {
          return utils.inValidParam(isValid.details, res);
      } */
      let url = req.originalUrl;
      let result = await authService.forgotPassword(req.body, url);
      if (result) {
        res.message = MESSAGE.RESET_PASSWORD_LINK.message;
        return util.successResponse(
          "Password reset link has been sent to your email",
          res
        );
      }
    } catch (error) {
      logger.error("Error - forgotPassword", error);
      util.failureResponse(error, res);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const body = req.body;
      /*  let isValid = validation.validateParamsWithJoi(
           req.body,
           authSchemaKey.resetPassword
       );
       if (isValid.error) {
           return utils.inValidParam(isValid.details, res);
       } */
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
          const data = {
            activeStatus: user.activeStatus,
          };
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
