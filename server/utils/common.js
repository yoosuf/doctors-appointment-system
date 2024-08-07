const moment = require("moment-timezone");
const { DATE_FORMAT, TIMEZONE } = require("../constants/common");

module.exports = {
  /*
   * convertObjectToEnum : convert object to enum
   * @param obj          : {}
   */
  convertObjectToEnum: (obj) => {
    const enumArr = [];
    Object.values(obj).map((val) => enumArr.push(val));
    return enumArr;
  },

  /*
   * randomNumber : generate random numbers.
   * @param length          : number *default 4
   */
  randomNumber: (length = 4) => {
    const numbers = "12345678901234567890";
    let result = "";
    for (let i = length; i > 0; i -= 1) {
      result += numbers[Math.round(Math.random() * (numbers.length - 1))];
    }
    return result;
  },

  convertToTz: (params) => {
    try {
      let obj = { ...params };
      const defaultTimezone = process.env.TIMEZONE
        ? process.env.TIMEZONE
        : TIMEZONE;
      const requestTimezone = obj?.tz ? obj.tz : defaultTimezone;
      if (obj && obj.date === undefined) {
        obj.date = moment().tz(requestTimezone).format(DATE_FORMAT);
      }
      let convertedDateTime = moment(obj.date)
        .tz(defaultTimezone)
        .format(DATE_FORMAT);
      return moment(convertedDateTime);
    } catch (error) {
      logger.error("Error - convertToTz", error);
      throw new Error(error);
    }
  },
};
