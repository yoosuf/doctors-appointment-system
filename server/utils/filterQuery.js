const moment = require("moment");

const getFilterQuery = async (query) => {
  let filter = {};

  if (query.dob) {
    const dateOfBirth = moment(new Date(query.dob)).add(1, "days").format("YYYY-MM-DD");

    query.dob = {
      $lte: new Date(dateOfBirth),
      $gte: new Date(query.dob),
    };
  }
  if (query.fromDate && query.toDate !== "") {
    const toDate = moment(query.toDate).add(1, "days").format("YYYY-MM-DD");
    query.createdAt = {
      $lte: new Date(toDate),
      $gte: new Date(query.fromDate),
    };
  }

  delete query.fromDate;
  delete query.toDate;
  delete query.search;

  let newQuery = { ...query };

  console.log(newQuery);

  return newQuery;
};

module.exports = {
  getFilterQuery,
};
