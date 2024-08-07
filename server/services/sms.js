const axios = require("axios");
const {
  SMS_APPLICATIONID,
  SMS_ACCOUNTID,
  SMS_FROM_NUMBER,
  SMS_AUTHORIZATION,
  SMS_BANDWIDTH_URL,
  SMS_BANDWIDTH_PRIORITY,
} = require("../config/environment/sms");
const accountId = SMS_ACCOUNTID;
const { loginSmsTemplate } = require("../views/smsTemplate");
const sendSMSBandwidth = async (params) => {
  var data = JSON.stringify({
    applicationId: SMS_APPLICATIONID,
    to: [
      `${
        params.countryCode.indexOf("+") == 0
          ? "" + params.countryCode
          : "+" + params.countryCode
      }${params.phone}`,
    ],
    from: SMS_FROM_NUMBER,
    text: loginSmsTemplate(params.link),
  });
  var config = {
    method: "post",
    url: `${SMS_BANDWIDTH_URL}/api/v2/users/${accountId}/messages`,
    headers: {
      Authorization: SMS_AUTHORIZATION,
      "Content-Type": "application/json",
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      logger.info(
        `Successfully login link sendSMSBandwidthApi ${response.data.id}`
      );
      return JSON.stringify(response.data);
    })
    .catch(function (error) {
      logger.error("Error - sendSMSBandwidthApi", error);
      throw new Error(error);
    });
};
module.exports = {
  sendSMSBandwidth,
};
