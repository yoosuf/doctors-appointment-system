const sgMail = require("@sendgrid/mail");
const path = require("path");

const nodemailer = require("nodemailer");
const Email = require("email-templates");
const Log = require("../model/log");
const { LOG_TYPE, LOG_STATUS } = require("../constants/common");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (obj) => {
  try {
    let emailLogs = null;
    if (obj.log_id) {
      emailLogs = await Log.findOne({ _id: obj.log_id });
    } else {
      let logsData = {
        type: LOG_TYPE.MAIL,
        data: obj,
      };
      emailLogs = await Log.create(logsData);
    }

    await sgMail
      .send({
        from: "NOREPLAY <no-reply@vinixtech.net>",
        to: obj.email,
        subject: obj.subject,
        html: obj.htmlData,
        attachments: obj.attachments || [], // attachments: [{filename: change with filename,path: change with file path}]
      })
      .then(
        async () => {
          emailLogs
            ? await Log.updateOne(
                { _id: emailLogs._id },
                { status: LOG_STATUS.SENT }
              )
            : "";
          logger.info(
            "Mail response :- ",
            response.response,
            response.envelope.to
          );
        },
        async (err) => {
          if (err.response) {
            emailLogs
              ? await Log.updateOne(
                  { _id: emailLogs._id },
                  { status: LOG_STATUS.FAILED }
                )
              : "";
            logger.error("error", err);
            throw err;
          }
        }
      );
  } catch (error) {
    logger.error("Error - sendEmail", error);
  }
};

module.exports = {
  sendEmail,
};
