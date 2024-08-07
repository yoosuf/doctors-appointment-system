const UserActivity = require("../model/userActivity");
const service = require("../utils/dbService");
module.exports = {
  storeUserActivity: async (req, res, email, ACTIVITY_NAME, MESSAGE) => {
    const result = await service.findUser(email);
    const userId = result ? result._id : null;
    const {
      frontend_route,
      rawHeaders,
      httpVersion,
      method,
      socket,
      originalUrl,
      deviceId,
    } = req;
    const { statusCode, statusMessage } = res;
    const ipInfo = req.ipInfo;
    const roleId = result ? result.roleId : null;

    let data = {
      activityName: ACTIVITY_NAME,
      name: result
        ? result.firstName + " " + result.middleName + " " + result.lastName
        : null,
      userId: userId !== null ? userId : null,
      roleId: result ? (result.roleId !== undefined ? roleId : null) : null,
      route: req.originalUrl,
      frontend_route: frontend_route !== undefined ? frontend_route : null,
      response: {
        httpStatus: statusCode,
        message: MESSAGE,
        method: method,
      },
      location: ipInfo ? ipInfo.city + "," + ipInfo.country : "",
      ip: ipInfo ? ipInfo.ip : "",
    };
    await UserActivity.create(data);
  },
};
