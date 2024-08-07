const Appointment = require("../../model/v1/appointment");
const Service = require("../../model/v1/service");
const User = require("../../model/v1/user");
const Role = require("../../model/v1/role");
const { ROLE } = require("../../config/authConstant");

/**
 * A test endpoint
 */
const tenantTest = (req, res) => {
  // Your logic for handling the POST request
  // console.log(`req`, req);
  res.send("GET request to /:id successful");
};

const tenantServices = async (req, res) => {
  try {
    const result = await Service.aggregate([
      {
        $lookup: {
          from: "category", // Collection name for categories
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $sort: { order: 1 }, // Add this $sort stage to preserve the order
      },
      {
        $match: {
          'category.isDeleted': { $ne: true },
          'category.isActive': { $ne: false },
        }
      },
      {
        $group: {
          _id: "$categoryId",
          name: { $first: "$category.name" },
          description: { $first: "$category.description" },
          servedBy: { $first: "$category.servedBy" },
          data: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              price: "$price",
              duration: "$timeDuration",
              items: "$items",
            },
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving services:", error);
    throw error;
  }
};




const tenantSearch = async (req, res) => {
  try {
    // Remove the role filter
    // const patientRole = await Role.findOne({ code: ROLE.PATIENT });
    // You may want to adjust this line based on your needs

    let matchObject = {};

    if (req.query.name) {
      const inputValue = new RegExp(req.query.name, "i");

      matchObject.$or = [
        {
          firstName: {
            $regex: inputValue,
          },
        },
        {
          lastName: {
            $regex: inputValue,
          },
        },
        {
          fullName: {
            $regex: inputValue,
          },
        },
      ];

      console.log("inputValue:", inputValue);
      console.log("matchObject:", JSON.stringify(matchObject));
    }

    const result = await User.aggregate([
      {
        $match: matchObject,
      },
      {
        $project: {
          id: 1,
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
        },
      },
    ]);

    console.log("Result:", result);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  tenantTest,
  tenantServices,
  tenantSearch,
};
