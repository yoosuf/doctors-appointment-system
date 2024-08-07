const authService = require("../../services/auth");
const util = require("../../utils/messages");
const validation = require("../../utils/validateRequest");

module.exports = {
  changePassword: async (req, res) => {
    try {
      await authService
        .setNewPassword(req.user.id, req.body, req)
        .then((result) => {
          return util.changePasswordResponse(result, res);
        })
        .catch((err) => {
          return util.failureResponse({ message: err }, res);
        });
    } catch (error) {
      logger.error("Error - changePassword", error);
      return util.failureResponse(error, res);
    }
  },
};
