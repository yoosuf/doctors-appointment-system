const ObjectId = require("mongodb").ObjectId;
const User = require("../model/v1/user");
const Category = require("../model/v1/category");
const _ = require("lodash");

const getPurchasedPlan = async (id) => {
  try {
    const aggregate = [
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "membership",
          let: {
            id: "$purchasedPlans.membershipId",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$id"],
                },
              },
            },
          ],
          as: "membership",
        },
      },
      {
        $project: {
          planAccess: {
            $ifNull: ["$membership.planAccess", ""],
          },
        },
      },
    ];
    const userData = await User.aggregate(aggregate);
    const categoriesData = await Category.find({
      isDeleted: false,
      isActive: true,
    }).select("name");
    let obj = {};
    await Promise.all(
      _.map(categoriesData, async (data) => {
        Object.assign(obj, { [data.name]: 0 });
        await Promise.all(
          _.map(userData[0]?.planAccess[0], async (doc) => {
            if (data._id.toString() === doc.categoryId.toString()) {
              Object.assign(obj, { [data.name]: doc.quantity });
            }
          })
        );
        return obj;
      })
    );
    return obj;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getPurchasedPlan,
};
