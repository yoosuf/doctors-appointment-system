const userActivity = require("../model/userActivity");
module.exports = {
  userActivity: async (data) => {
    await userActivity.create(data);
  },
  getUserActivity: async (data) => {
    await userActivity.find(data);
  },
};
