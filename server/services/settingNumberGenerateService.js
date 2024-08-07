const dbService = require("../utils/dbService");
const SettingNumberGenerate = require("../model/settingNumberGenerator");

const generateNo = async (type) => {
  const setting = await SettingNumberGenerate.findOne({ type: type });
  let number = "";
  let totalNo = 1;
  if (setting.prefix) {
    number = `${setting.prefix}`;
  }
  if (!setting.total_no) {
    number = `${number}${setting.start_from}`;
  } else {
    totalNo = setting.total_no + 1;
    number = `${number}${totalNo}`;
  }
  if (setting.postfix) {
    number = `${number}${setting.postfix}`;
  }
  await dbService.updateDocument(SettingNumberGenerate, setting._id, {
    total_no: totalNo,
  });
  return number;
};

module.exports = {
  generateNo,
};
