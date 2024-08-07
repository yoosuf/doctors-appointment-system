const Appointment = require("../../model/v1/appointment");
const Order = require("../../model/v1/order");
const User = require("../../model/v1/user");
const Role = require("../../model/v1/role");
const utils = require("../../utils/messages");
const dbService = require("../../utils/dbService");
const {
  APPOINTMENT_STATUS,
  DASHBOARD_BAR_CHART_TYPE,
} = require("../../constants/common");
const validation = require("../../utils/validateRequest");
const dashboardSchemaKey = require("../../utils/validation/dashboardValidation");
const ObjectId = require("mongodb").ObjectId;
const { MESSAGE } = require("../../config/message");

const dashboardReport = async (req, res) => {
  try {
    let body = req.body;
    let dashboardReports = {
      totalAppointment: 0,
      waitingGuest: 0,
      avgTransaction: 0,
      newBooking: 0,
      servedCustomer: 0,
      noShow: 0,
      bookingThisPeriod: 0,
      visitors: 0,
      newMembership: 0,
    };
    const toDate = new Date(body.toDate);
    toDate.setDate(toDate.getDate() + 1);

    let dashboardFilter = {
      appointmentDate: { $gte: new Date(body.fromDate), $lte: toDate },
    };
    let newBookingFilter = {
      createdAt: { $gte: new Date(body.fromDate), $lte: toDate },
    };
    if (body.locationId) {
      Object.assign(dashboardFilter, { locationId: ObjectId(body.locationId) });
      Object.assign(newBookingFilter, {
        locationId: ObjectId(body.locationId),
      });
    }

    let appointment = await Appointment.aggregate([
      {
        $facet: {
          totalAppointment: [
            { $match: dashboardFilter },
            { $count: "totalAppointment" },
          ],
          waitingGuest: [
            {
              $match: {
                ...dashboardFilter,
                status: APPOINTMENT_STATUS.WAITING,
              },
            },
            { $count: "waitingGuest" },
          ],
          newBooking: [{ $match: newBookingFilter }, { $count: "newBooking" }],
          servedCustomer: [
            {
              $match: {
                ...dashboardFilter,
                status: APPOINTMENT_STATUS.COMPLETED,
              },
            },
            { $count: "servedCustomer" },
          ],
          noShow: [
            {
              $match: {
                ...dashboardFilter,
                status: APPOINTMENT_STATUS.NO_SHOW,
              },
            },
            { $count: "noShow" },
          ],
          newBooking: [{ $match: newBookingFilter }, { $count: "newBooking" }],
        },
      },
      {
        $project: {
          totalAppointment: {
            $arrayElemAt: ["$totalAppointment.totalAppointment", 0],
          },
          waitingGuest: { $arrayElemAt: ["$waitingGuest.waitingGuest", 0] },
          newBooking: { $arrayElemAt: ["$newBooking.newBooking", 0] },
          servedCustomer: {
            $arrayElemAt: ["$servedCustomer.servedCustomer", 0],
          },
          noShow: { $arrayElemAt: ["$noShow.noShow", 0] },
        },
      },
    ]);

    let avgTransQry = [];
    let avgMinQry = [];
    if (body.locationId) {
      avgTransQry.push({
        $match: {
          locationId: ObjectId(body.locationId),
        },
      });
      avgMinQry.push({
        $match: {
          locationId: ObjectId(body.locationId),
        },
      });
    }
    avgTransQry.push(
      {
        $match: {
          createdAt: { $gte: new Date(body.fromDate), $lte: toDate },
        },
      },
      {
        $group: {
          _id: null,
          avg: {
            $avg: "$total",
          },
        },
      }
    );
    avgMinQry.push(
      {
        $match: {
          appointmentDate: { $gte: new Date(body.fromDate), $lte: toDate },
        },
      },
      {
        $group: {
          _id: null,
          avgServedMin: {
            $avg: "$servedMin",
          },
          avgWaitMin: {
            $avg: "$waitMin",
          },
        },
      }
    );
    let chartQuery = await dashboardChartQuery({ ...body, toDate });
    let userChartQuery = await dashboardChartQuery({
      ...body,
      toDate,
      user: true,
    });
    let visitorsQry = [];
    let newMembershipQry = [];
    visitorsQry.push(
      {
        $lookup: {
          from: "appointment",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$patientId", "$$userId"] } } },
            { $match: { appointmentDate: { $exists: true } } },
            { $match: { locationId: { $exists: true } } },
          ],
          as: "result",
        },
      },

      {
        $match: {
          $and: [
            { result: { $not: { $size: 0 } } },
            { result: { $not: { $size: 1 } } },
          ],
        },
      }
    );
    if (body.locationId) {
      visitorsQry.push(
        {
          $project: {
            result: {
              $filter: {
                input: "$result",
                as: "result",
                cond: {
                  $and: [
                    { $lte: ["$$result.appointmentDate", toDate] },
                    { $eq: ["$$result.locationId", ObjectId(body.locationId)] },
                  ],
                },
              },
            },
          },
        },

        {
          $match: {
            $and: [
              { result: { $not: { $size: 0 } } },
              { result: { $not: { $size: 1 } } },
            ],
          },
        },
        { $count: "visitors" }
      );
      newMembershipQry.push({
        $match: {
          locationIds: { $in: [ObjectId(body.locationId), "$locationIds"] },
        },
      });
    }

    newMembershipQry.push(
      {
        $lookup: {
          from: "order",
          let: { orderId: "$purchasedPlans.orderId" },
          pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$orderId"] } } }],
          as: "result",
        },
      },

      {
        $project: {
          result: {
            $filter: {
              input: "$result",
              as: "result",
              cond: {
                $and: [
                  { $gte: ["$$result.createdAt", new Date(body.fromDate)] },
                  { $lte: ["$$result.createdAt", toDate] },
                ],
              },
            },
          },
        },
      },
      {
        $match: {
          result: {
            $not: {
              $size: 0,
            },
          },
        },
      },
      { $count: "newMembership" }
    );

    let avgMin = _.first(await Appointment.aggregate(avgMinQry));
    let avgTransaction = _.first(await Order.aggregate(avgTransQry));
    dashboardReports.newCustomer = await User.aggregate(userChartQuery);
    dashboardReports.appointment = await Appointment.aggregate(chartQuery);
    let visitorsCount = _.first(await User.aggregate(visitorsQry));
    let newMembershipCount = _.first(await User.aggregate(newMembershipQry));

    dashboardReports.revenue = await Order.aggregate(
      await dashboardRevenueChartQuery({ ...body, toDate })
    );
    dashboardReports.avgWaitMin = avgMin?.avgWaitMin ? avgMin.avgWaitMin : 0;
    dashboardReports.avgServedMin = avgMin?.avgServedMin
      ? avgMin.avgServedMin
      : 0;
    dashboardReports.avgTransaction = avgTransaction ? avgTransaction.avg : 0;
    dashboardReports.visitors = visitorsCount?.visitors
      ? visitorsCount.visitors
      : 0;
    dashboardReports.newMembership = newMembershipCount?.newMembership
      ? newMembershipCount.newMembership
      : 0;

    dashboardReports = { ...dashboardReports, ..._.first(appointment) };
    return utils.successResponse(dashboardReports, res);
  } catch (error) {
    logger.error("Error -", error);
    return utils.failureResponse(error, res);
  }
};

const dashboardRevenueChartQuery = async (filter) => {
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let aggregate = [];
  if (filter.locationId) {
    aggregate.push({
      $match: {
        locationId: ObjectId(filter.locationId),
      },
    });
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.YEARLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          createdAt: { $first: "$createdAt" },
          count: { $sum: 1 },
          total: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project: {
          value: "$_id",
          count: 1,
          _id: 0,
          total: 1,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.WEEKLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
          },
          createdAt: { $first: "$createdAt" },
          count: { $sum: 1 },
          total: {
            $sum: "$total",
          },
        },
      },
      {
        $sort: { "_id.week": -1 },
      },
      {
        $project: {
          createdAt: 1,
          count: 1,
          _id: 0,
          total: 1,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.DAILY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      { $project: { day: { $substr: ["$createdAt", 0, 10] }, total: 1 } },
      {
        $group: {
          _id: "$day",
          count: { $sum: 1 },
          total: {
            $sum: "$total",
          },
        },
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
          total: 1,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.HOURLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $project: {
          total: 1,
          createdAt: 1,
          _id: 0,
        },
      }
    );
    return aggregate;
  }
  aggregate.push(
    {
      $match: {
        createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
      },
    },
    {
      $group: {
        _id: { month: { $substrCP: ["$createdAt", 0, 7] } },
        total: {
          $sum: "$total",
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [
                monthsArray,
                {
                  $subtract: [
                    { $toInt: { $substrCP: ["$_id.month", 5, 2] } },
                    1,
                  ],
                },
              ],
            },
            "-",
            { $substrCP: ["$_id.month", 0, 4] },
          ],
        },
        total: 1,
      },
    },
    {
      $group: {
        _id: null,
        data: { $push: { k: "$month", v: "$count", total: "$total" } },
      },
    },
    {
      $project: {
        data: { $arrayToObject: "$data" },
        _id: 0,
      },
    }
  );
  return aggregate;
};

const dashboardChartQuery = async (filter) => {
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let aggregate = [];
  if (filter.locationId) {
    if (filter.user) {
      aggregate.push({
        $match: {
          locationIds: {
            $elemMatch: { $eq: ObjectId(filter.locationId) },
          },
        },
      });
    } else {
      aggregate.push({
        $match: {
          locationId: ObjectId(filter.locationId),
        },
      });
    }
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.YEARLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $group: {
          _id: { $year: "$createdAt" },
          createdAt: { $first: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project: {
          value: "$_id",
          count: 1,
          _id: 0,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.WEEKLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
          },
          createdAt: { $first: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.week": -1 },
      },
      {
        $project: {
          createdAt: 1,
          count: 1,
          _id: 0,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.DAILY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      { $project: { day: { $substr: ["$createdAt", 0, 10] } } },
      { $group: { _id: "$day", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      }
    );
    return aggregate;
  }
  if (filter.chartType === DASHBOARD_BAR_CHART_TYPE.HOURLY) {
    aggregate.push(
      {
        $match: {
          createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
        },
      },
      {
        $project: {
          createdAt: 1,
          _id: 1,
        },
      }
    );
    return aggregate;
  }
  aggregate.push(
    {
      $match: {
        createdAt: { $gte: new Date(filter.fromDate), $lte: filter.toDate },
      },
    },
    {
      $group: {
        _id: { month: { $substrCP: ["$createdAt", 0, 7] } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.month": 1 },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        month: {
          $concat: [
            {
              $arrayElemAt: [
                monthsArray,
                {
                  $subtract: [
                    { $toInt: { $substrCP: ["$_id.month", 5, 2] } },
                    1,
                  ],
                },
              ],
            },
            "-",
            { $substrCP: ["$_id.month", 0, 4] },
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        data: { $push: { k: "$month", v: "$count" } },
      },
    },
    {
      $project: {
        data: { $arrayToObject: "$data" },
        _id: 0,
      },
    }
  );
  return aggregate;
};

const globalSearch = async (req, res) => {
  try {
    const body = req.body;
    let isValid = validation.validateParamsWithJoi(
      req.body,
      dashboardSchemaKey.schemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    const roles = await Role.find({ code: { $in: body.roles } });
    const search = body.search;
    const results = await User.aggregate([
      {
        $match: {
          roleId: { $in: _.map(roles, "_id") },
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "location",
          let: {
            ids: "$locationIds",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$_id", "$$ids"],
                },
              },
            },
            {
              $project: {
                locationName: 1,
              },
            },
          ],
          as: "locationIds",
        },
      },
      {
        $lookup: {
          from: "file",
          localField: "profile_image",
          foreignField: "_id",
          as: "profile_image",
        },
      },
      {
        $lookup: {
          from: "role",
          localField: "roleId",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $unwind: "$role",
      },
      {
        $group: {
          _id: "$roleId",
          role: { $first: "$role.code" },
          users: { $push: "$$ROOT" },
        },
      },
    ]);
    return utils.successResponse(results, res);
  } catch (error) {
    logger.error("Error - global search", error);
    return utils.failureResponse(error, res);
  }
};

const userDashboardCount = async (req, res) => {
  try {
    const body = req.body;
    let isValid = validation.validateParamsWithJoi(
      req.body,
      dashboardSchemaKey.dashboardCountSchemaKeys
    );
    if (isValid.error) {
      return utils.inValidParam(isValid.details, res);
    }
    let populate = {
      path: "purchasedPlans",
      populate: [
        {
          path: "membershipId",
        },
        {
          path: "orderId",
          populate: [{ path: "planAccess", populate: "categoryId" }],
        },
      ],
    };
    const user = await dbService.getDocumentByQuery(
      User,
      { _id: body.userId },
      [ "firstName", "lastName", "purchasedPlans"],
      { populate: populate }
    );
    let planAccess = [];
    if (!_.isEmpty(user.purchasedPlans)) {
      await Promise.all(
        _.map(user.purchasedPlans.orderId.planAccess, (item) => {
          planAccess.push({
            name: item.categoryId.name,
            remaining: item.quantity,
            total: item.totalQuantity,
          });
        })
      );
    }

    return utils.successResponse(planAccess, res);
  } catch (error) {
    logger.error("Error - dashboard count", error);
    return utils.failureResponse(error, res);
  }
};
module.exports = {
  dashboardReport,
  globalSearch,
  userDashboardCount,
};
