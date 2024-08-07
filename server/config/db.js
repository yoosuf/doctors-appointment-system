const mongoose = require("mongoose");

const dConnection = `${process.env.MONGO_CONNECTION}://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;

mongoose.connect(dConnection, {
  useNewUrlParser: true, // Add this line to fix URL string parser deprecation warning
  useUnifiedTopology: true // Add this line to fix Server Discovery and Monitoring engine deprecation warning
});

var db = mongoose.connection;

db.once("open", () => {
  logger.info("Connection Successful");
});

db.on("error", () => {
  logger.error("Error in Connect Mongo");
});

module.exports = mongoose;
