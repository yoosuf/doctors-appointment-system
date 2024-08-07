const user = require("../model/v1/user");
const Role = require("../model/v1/role");
const filterService = require("../utils/filterQuery");
// const moment = require("moment");
const moment = require("moment-timezone"); // Import moment-timezone library

const {
  JWT,
  ACTION,
  LOGIN_ACCESS,
  PLATFORM,
  USER_ROLE,
  ROLE,
  EMAIL_SUBJECT,
} = require("../config/authConstant");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { forEach } = require("lodash");
var ObjectId = require("mongodb").ObjectId;
const roleJson = require("../seeder/roles.json");
const file = require("../model/file");

const createDocument = (model, data) =>
  new Promise((resolve, reject) => {
    model.create(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const updateDocument = (model, id, data) =>
  new Promise((resolve, reject) => {
    model.updateOne(
      {
        _id: id,
      },
      data,
      {
        runValidators: true,
        context: "query",
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });

const deleteDocument = (model, id) =>
  new Promise((resolve, reject) => {
    model.deleteOne(
      {
        _id: id,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

const getAllDocuments = (model, query, options) =>
  new Promise(async (resolve, reject) => {
    query = await filterService.getFilterQuery(query);
    model.paginate(query, options, (err, data) => {
      if (err) reject(err);
      else {

        resolve(data);
      };
    });
  });


const conditionalSearch = (model, query, options) => {
  return new Promise(async (resolve, reject) => {
    // Extract firstName, lastName, and dob from the query
    const { firstName, lastName, dob, ...restQuery } = query;

    // Create a filter for firstName, lastName, and dob
    const nameAndDobFilter = {};
    if (firstName) {
      nameAndDobFilter.firstName = { $regex: firstName, $options: "i" }; // Case-insensitive firstName match
    }
    if (lastName) {
      nameAndDobFilter.lastName = { $regex: lastName, $options: "i" }; // Case-insensitive lastName match
    }
    if (dob) {
      // Parse DOB with the specified timezone
      const timezone = process.env.TIMEZONE || "UTC"; // Use the TIMEZONE environment variable, default to UTC
      const formattedDob = moment.tz(dob, timezone).format("YYYY-MM-DD");

      nameAndDobFilter.dob = {
        $lte: new Date(formattedDob + "T23:59:59Z"), // End of the day
        $gte: new Date(formattedDob),
      };
    }

    // Combine the nameAndDobFilter with the rest of the query
    const combinedQuery = { ...restQuery, ...nameAndDobFilter };



    // Use the combined query to retrieve documents
    // model.paginate(combinedQuery, options, async (err, data) => {
    model.paginate(combinedQuery, { ...options, populate: "profile_image" }, async (err, data) => {

      if (err) reject(err);
      else {
        if (data.data) {
          const modifiedData = await Promise.all(data.data.map(async (item) => {
            // Create a copy of the current object to avoid modifying the original data
            const modifiedItem = { ...item };

            // Check if the "dob" field is present and remove the time part
            if (modifiedItem.dob) {
              const dobDate = new Date(modifiedItem.dob);

              if (!isNaN(dobDate.getTime())) {
                modifiedItem.dob = dobDate.toISOString();
              } else {
                modifiedItem.dob = null; // or another appropriate value
              }
            }

            // Retrieve file information and add it to the result
            // if (modifiedItem.profile_image) {

            //   console.log(`######### PROFILE IMAGE ############`);
            //   console.log(modifiedItem.profile_image);

            //   // Assuming you have a File model and a function to fetch a file by ID
            //   const fileObj =  file.findById(modifiedItem.profile_image);
            //   modifiedItem.profile_image = fileObj; // You can change the property name as needed
            // // }


            console.log(`___________________ PRINT QUERY ___________________`);
            console.log(modifiedItem);
            return modifiedItem;
          }));

          data.data = modifiedData;
        }

        resolve(data);
      }
    });
  });
};

// const conditionalSearch = (model, query, options) => {
//   return new Promise(async (resolve, reject) => {
//     // Extract firstName, lastName, and dob from the query
//     const { firstName, lastName, dob, ...restQuery } = query;

//     // Create a filter for firstName, lastName, and dob
//     const nameAndDobFilter = {};
//     if (firstName) {
//       nameAndDobFilter.firstName = { $regex: firstName, $options: "i" }; // Case-insensitive firstName match
//     }
//     if (lastName) {
//       nameAndDobFilter.lastName = { $regex: lastName, $options: "i" }; // Case-insensitive lastName match
//     }
//     if (dob) {
//       // Parse DOB with the specified timezone
//       const timezone = process.env.TIMEZONE || "UTC"; // Use the TIMEZONE environment variable, default to UTC
//       const formattedDob = moment.tz(dob, timezone).format("YYYY-MM-DD");

//       nameAndDobFilter.dob = {
//         $lte: new Date(formattedDob + "T23:59:59Z"), // End of the day
//         $gte: new Date(formattedDob),
//       };
//     }

//     // Combine the nameAndDobFilter with the rest of the query
//     const combinedQuery = { ...restQuery, ...nameAndDobFilter };

//     console.log(`___________________ PRINT QUERY ___________________`);
//     console.log(combinedQuery);

//     // Use the combined query to retrieve documents
//     model.paginate(combinedQuery, options, (err, data) => {
//       if (err) reject(err);
//       else {
//         if (data.data) {
//           data.data = data.data.map((item) => {
//             // Create a copy of the current object to avoid modifying the original data
//             const modifiedItem = { ...item };

//             // Check if the "dob" field is present and remove the time part
//             if (modifiedItem.dob) {
//               // modifiedItem.dob = modifiedItem.dob.split("T")[0];

//               const dobDate = new Date(modifiedItem.dob);

//               // Check if dobDate is a valid Date object
//               if (!isNaN(dobDate.getTime())) {
//                 // Convert the Date object to ISO string
//                 modifiedItem.dob = dobDate.toISOString();
//               } else {
//                 // Handle the case where the dob string is not a valid date
//                 modifiedItem.dob = null; // or another appropriate value
//               }
//             }

//             return modifiedItem;
//           });
//         }

//         resolve(data);
//       }
//     });
//   });
// };




const getSingleDocumentById = (model, id, select = []) =>
  new Promise((resolve, reject) => {
    model.findOne(
      {
        _id: id,
      },
      select,
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

const findExistsData = (model, data) => {
  // let { model } = data;
  const { query } = data;
  const { and } = query;
  const { or } = query;
  const q = {};

  if (and) {
    q.$and = [];
    for (let index = 0; index < and.length; index += 1) {
      q.$and.push(and[index]);
    }
  }
  if (or) {
    q.$or = [];
    for (let index = 0; index < or.length; index += 1) {
      q.$or.push(or[index]);
    }
  }

  return new Promise((resolve, reject) => {
    model.find(q, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const getDocumentByAggregation = (model, query) => {
  let keyInJson, valuesOfAggregate;
  let valuesOfFields, keysOfFields;
  let input = {},
    finalInput = {},
    aggregate = {};
  let array = [];
  for (const [keys, values] of Object.entries(query)) {
    for (const [key, value] of Object.entries(values)) {
      switch (keys) {
        case "group":
          keyInJson = "key" in value;
          if (keyInJson) {
            valuesOfAggregate = Object.values(value);
            valuesOfFields = Object.values(valuesOfAggregate[0]);
            keysOfFields = Object.keys(valuesOfAggregate[0]);
            for (const [nestKey, nestValue] of Object.entries(valuesOfFields)) {
              if (Array.isArray(nestValue)) {
                input._id = `$${keysOfFields[nestKey]}`;
                for (const [i, j] of Object.entries(nestValue)) {
                  finalInput[`$${key}`] = "";
                  finalInput[`$${key}`] += `$${j}`;
                  input[j] = finalInput;
                  finalInput = {};
                }
                aggregate.$group = input;
                array.push(aggregate);
              } else {
                input._id = `$${keysOfFields[nestKey]}`;
                finalInput[`$${key}`] = "";
                finalInput[`$${key}`] = `$${nestValue}`;
                input[nestValue] = finalInput;
                aggregate.$group = input;
                array.push(aggregate);
              }
            }
          }
          aggregate = {};
          finalInput = {};
          input = {};
          break;

        case "match":
          valuesOfFields = Object.values(value).flat();
          keysOfFields = Object.keys(value);
          if (Array.isArray(valuesOfFields) && valuesOfFields.length > 1) {
            finalInput.$in = valuesOfFields;
            input[keysOfFields[0]] = finalInput;
          } else {
            input[keysOfFields[0]] = valuesOfFields[0];
          }
          aggregate.$match = input;
          array.push(aggregate);
          aggregate = {};
          input = {};
          finalInput = {};
          break;

        case "project":
          valuesOfFields = Object.values(value);
          if (valuesOfFields.length === 1) {
            const projectValues = Object.values(valuesOfFields[0]).toString();
            const projectKeys = Object.keys(valuesOfFields[0]).toString();
            const projectArr = [];

            if (isNaN(projectValues)) {
              projectArr.push(`$${projectKeys}`);
              projectArr.push(`$${projectValues}`);
            } else {
              projectArr.push(`$${projectKeys}`);
              projectArr.push(projectValues);
            }
            finalInput[`$${key}`] = projectArr;
            input[projectKeys] = finalInput;
            aggregate.$project = input;
            array.push(aggregate);
          }
          aggregate = {};
          input = {};
          finalInput = {};
          break;
      }
    }
  }
  return new Promise((resolve, reject) => {
    model.aggregate(array, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const softDeleteDocument = (model, id) =>
  new Promise(async (resolve, reject) => {
    const result = await getSingleDocumentById(model, id);
    result.isDeleted = true;
    result.isActive = false;
    model.updateOne(
      {
        _id: id,
      },
      result,
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });

const bulkInsert = (model, data) =>
  new Promise((resolve, reject) => {
    model.insertMany(data, (err, result) => {
      if (result !== undefined && result.length > 0) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const bulkUpdate = (model, filter, data) =>
  new Promise((resolve, reject) => {
    model.updateMany(filter, data, (err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const countDocument = (model, where) =>
  new Promise((resolve, reject) => {
    model.where(where).countDocuments((err, result) => {
      if (result !== undefined) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });

const getDocumentByQuery = (model, where, select = [], options = {}) =>
  new Promise((resolve, reject) => {
    model.findOne(where, select, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const findOneAndUpdateDocument = (model, filter, data, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndUpdate(filter, data, options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });

const findOneAndDeleteDocument = (model, filter, options = {}) =>
  new Promise((resolve, reject) => {
    model.findOneAndDelete(filter, options, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const findUser = async (email, phone) => {
  const findUser = await user.findOne({
    $or: [
      {
        email: email,
      },
      {
        phone: phone,
      },
    ],
  });
  return findUser;
};

const checkId = async (parentId) => {
  return await user.distinct("_id", {
    parentId: {
      $in: parentId,
    },
  });
};

const getHierachicalId = async (id) => {
  const userRole = await user.findById(id).populate({
    path: "roleId",
    model: "role",
  });
  const userWeight = userRole.roleId.weight;
  let result = [id];
  for (let i = userWeight; i < roleJson.length - 1; i++) {
    let ids = await checkId(result);
    result = result.concat(ids);
  }
  result = result.map((x) => x.toString());
  result = [...new Set(result)];
  result = result.map((x) => new ObjectId(x));
  return result;
};

module.exports = {
  createDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  getSingleDocumentById,
  findExistsData,
  softDeleteDocument,
  bulkInsert,
  bulkUpdate,
  countDocument,
  getDocumentByQuery,
  getDocumentByAggregation,
  findOneAndUpdateDocument,
  findOneAndDeleteDocument,
  findUser,
  getHierachicalId,
  conditionalSearch,
};
