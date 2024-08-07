module.exports = {
  SMS_APPLICATIONID:
    process.env.SMS_APPLICATIONID || "",
  SMS_FROM_NUMBER: process.env.SMS_FROM_NUMBER || "",
  SMS_ACCOUNTID: process.env.SMS_ACCOUNTID || "",
  SMS_USERNAME:
    process.env.SMS_USERNAME || "",
  SMS_PASSWORD: process.env.SMS_PASSWORD || "=",
  SMS_AUTHORIZATION:
    process.env.SMS_AUTHORIZATION ||
    "",
  SMS_BANDWIDTH_URL:
    process.env.SMS_BANDWIDTH_URL || "",
  SMS_BANDWIDTH_PRIORITY: process.env.SMS_BANDWIDTH_PRIORITY || "high",
};
