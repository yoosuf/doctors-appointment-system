const User = require("../../model/v1/user");
const Order = require("../../model/v1/order");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const { PROFILE_NOTIFICATIONS } = require("../../config/authConstant");
const _ = require("lodash");
const { MESSAGE } = require("../../config/message");

const getNotificaion = async (req, res) => {
  try {
    const notifications = await User.findById(req.params.id).populate({
      path: "notificationSettings._id",
      model: "master",
    });
    res.message = `Profile Notifications has${MESSAGE.ITEM_LIST.message}`;
    return utils.successResponse(notifications.notificationSettings, res);
  } catch (error) {
    logger.error("Error - Profile Notification Settings");
    return utils.failureResponse(error, res);
  }
};

const getUser = async (id) => {
  const user = await User.findById(id).populate({
    path: "notificationSettings._id",
    model: "master",
  });
  return user;
};
const updateProfileNotification = async (req, res) => {
  try {
    const user = await getUser(req.params.id);

    if (user.parentId !== undefined) {
      const parentUser = await getUser(user.parentId);
      const checkPermission = parentUser.notificationSettings.filter(
        (data) => data._id.code === PROFILE_NOTIFICATIONS.NOTIFICATION
      );
      if (checkPermission[0].value === false) {
        throw new Error("Cannot update Notification which is off by Owner");
      }
    }
    const data = { ...req.body };
    const updateNotification = await dbService.updateDocument(
      User,
      req.params.id,
      data
    );
    res.message = `Profile Notifications ${MESSAGE.ITEM_UP.message}`;

    return utils.successResponse(updateNotification, res);
  } catch (error) {
    logger.error(error);
    logger.error("Error - update Notification Settings");
    return utils.failureResponse(error, res);
  }
};

module.exports = {
  getNotificaion,
  updateProfileNotification,
};
