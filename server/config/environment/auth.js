const { JWT_TOKEN_EXPIRE } = require("../../constants/common");
module.exports = {
  JWT_TOKEN_EXPIRE: process.env.JWT_TOKEN_EXPIRE || JWT_TOKEN_EXPIRE,
};
