const { BRAND_NAME, CMD_CANCEL } = require("../config/authConstant");
const Nexmo = require("nexmo");
const nexmo = new Nexmo({
  apiKey: process.env.VONAGE_SMS_API,
  apiSecret: process.env.VONAGE_SMS_SECRET,
});
const sendOTP = async (phoneNumber) =>
  new Promise(async (resolve, reject) => {
    try {
      nexmo.verify.request(
        {
          number: phoneNumber,
          brand: BRAND_NAME,
        },
        (err, result) => {
          if (err) {
            // throw new Error(err);
            return reject(err);
          } else {
            let requestId = result.request_id;
            if (result.status == "0") {
              return resolve({
                requestId: requestId,
              });
            } else {
              return reject(result.error_text);
            }
          }
        }
      );
    } catch (err) {
      return reject(err);
    }
  });
const resendOTP = async (phoneNumber, requestId) =>
  new Promise(async (resolve, reject) => {
    try {
      nexmo.verify.control(
        {
          request_id: requestId,
          cmd: CMD_CANCEL,
        },
        (err, result) => {
          if (err) {
            logger.error("Error - resendOTP", err);
          } else {
            logger.info(result);
          }
        }
      );
      nexmo.verify.request(
        {
          number: phoneNumber,
          brand: BRAND_NAME,
        },
        (err, result) => {
          if (err) {
            // throw new Error(err);
            return reject(err);
          } else {
            let requestId = result.request_id;
            if (result.status == "0") {
              return resolve({
                requestId: requestId,
              });
            } else {
              return reject(result.error_text);
            }
          }
        }
      );
    } catch (err) {
      return reject(err);
    }
  });
const verifyOTP = async (requestId, pin) =>
  new Promise(async (resolve, reject) => {
    nexmo.verify.check(
      {
        request_id: requestId,
        code: pin,
      },
      (err, result) => {
        if (err) {
          // handle the error
          return reject(err);
        } else {
          if (result && result.status == "0") {
            // Success!
            return resolve({
              verified: true,
            });
          } else {
            return reject("wrong pin");
            // handle the error - e.g. wrong PIN
          }
        }
      }
    );
  });

const sendMessage = async (phoneNumber, message) =>
  new Promise(async (resolve, reject) => {
    try {
      const from = BRAND_NAME;
      const to = phoneNumber;
      const text = message;

      nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          logger.error("Error - sendMessage", err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            return resolve("Message Sent Successfully");
          } else {
            logger.info(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
            return reject({
              message: `Message failed with error: ${responseData.messages[0]["error-text"]}`,
            });
          }
        }
      });
    } catch (err) {
      return reject(err);
    }
  });
// const message=await sendMessage("917984359262","Hello from SnapCrack") to trigger sms from anywhere this will be the format

module.exports = {
  sendOTP: sendOTP,
  verifyOTP: verifyOTP,
  resendOTP: resendOTP,
  sendMessage: sendMessage,
};
