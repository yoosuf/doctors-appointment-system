const { LOG_STATUS, LOG_TYPE } = require("../constants/common");
const Log = require("../model/log");
const { createJob } = require("../jobs/index");
const retryMail = async (logs) => {
  try {
    let logFilter = {
      status: LOG_STATUS.RETRY,
      type: LOG_TYPE.MAIL,
    };
    if (logs.length) {
      await Promise.all(
        _.map(logs, async (log) => {
          let mailObj = log.data;
          mailObj.log_id = log._id;
          logFilter._id = log._id;
          let logData = await Log.findOne(logFilter);
          if (logData) {
            await createJob("sendMail", mailObj, {});
          }
        })
      );
    }
    return true;
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  retryMail,
};
