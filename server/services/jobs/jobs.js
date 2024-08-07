const dbService = require("../../utils/dbService");
const Setting = require("../../model/setting");
const moment = require("moment");
const { sendEmail } = require("../../config/email");
const EventService = require("../appointment");
const User = require("../../model/v1/user");
const Event = require("../../model/v1/appointment");
const { EMAIL_SUBJECT } = require("../../config/authConstant");
const { sendMailNovu } = require("../../services/novuService");
const { sendSMSBandwidth } = require("../sms");
const ejs = require("ejs");
const path = require("path");
module.exports = {
  _processors: {
    sendMail: async ({ data }) => {
      try {
        logger.info("processing email sent");
        await sendEmail(data);
        logger.info("finish email sent");
      } catch (error) {
        logger.error("Error in email sent" + error);
      }
    },
    cancelEventCredit: async ({ data }) => {
      try {
        logger.info("processing event cancel creditAmount to user");
        await EventService.creditAmountCancelledEvent(data);
        logger.info("finish creditAmount to user");
      } catch (error) {
        logger.error("Error in creditAmount to user" + error);
      }
    },
    sendEventMail: async ({ data }) => {
      try {
        const result = await dbService.getDocumentByQuery(
          Event,
          { _id: data },
          [],
          { populate: { path: "locationId" } }
        );
        logger.info(data);
        logger.info("processing new event mail");
        const users = await User.find({
          locationIds: { $in: [result.locationId] },
        });
        let link = FRONT_URL;
        await Promise.all(
          _.map(users, async (user) => {
            const htmlData = await ejs.renderFile(
              path.join(__dirname, "../../views/eventCreate.ejs"),
              {
                data: {
                  name: `${user.firstName} ${user.lastName}`,
                  url: link,
                  eventName: result.name,
                  eventTime: moment(result.fromDateTime).format(
                    "dddd MMMM DD, YYYY [at] hh:mm a"
                  ),
                  location: result.locationId.locationName,
                },
              }
            );
            let obj = {
              email: user.email,
              subject: EMAIL_SUBJECT.NEW_UPCOMING_EVENT,
              htmlData: htmlData,
            };
            await sendEmail(obj);
          })
        );
        logger.info("finish new event mail");
      } catch (error) {
        logger.error("Error in email sent" + error);
      }
    },
    sendMailNovu: async ({ data }) => {
      try {
        logger.info("processing login email sent");
        await sendMailNovu(data);
        logger.info("finish login email sent");
      } catch (error) {
        logger.error("Error sendMailNovu" + error);
      }
    },
    sendSMS: async ({ data }) => {
      try {
        logger.info("processing sms sent");
        await sendSMSBandwidth(data);
        logger.info("finish sms sent");
      } catch (error) {
        logger.error("Error sendSMS" + error);
      }
    },
  },
};
