const { permit, permitForUser } = require("../lib/index");
const passport = require("passport");
var ObjectId = require("mongodb").ObjectId;
const IpAddress = require("../model/ipAddress");
const utils = require("../utils/messages");

function authentication(req, res, next) {
  return passport.authenticate(
    "jwt",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.MESSAGE = "Unauthenticated";
        return res.status(401).send({
          message: "Unauthenticated.",
        });
      }
      // Forward user information to the next middleware
      req.userId = user.id;
      req.user = user;
      req.roleIds = [user.roleId];
      next();
    }
  )(req, res, next);
}

async function checkPermission(req, res, next) {
  try {
    const result = await permit(req);
    if (result) {
      const user = req.user;
      const userDetails = (({ _id, firstName, lastName, email, phone }) => ({
        _id: new ObjectId(_id),
        firstName,
        lastName,
        email,
        phone,
      }))(user);


      if (req.method !== "GET") {

        if (req.method === "POST") {


         
          req.body.createdBy = userDetails || {};



        } else if (req.method === "PUT") {
          const softDelete = req.originalUrl.search("softDelete");
          if (softDelete !== -1) {
            req.body.deletedBy = userDetails || {};
          }
        }

        req.body.updatedBy = userDetails || {};
      }

      next();
    } else {
      res.MESSAGE = "Unauthorized permission !";
      return res.status(403).send({
        message: "Unauthorized permission !",
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function checkPermissionByUser(req, res, next) {
  try {
    const result = await permitForUser(req);
    if (result) {
      next();
    } else {
      res.MESSAGE = "Unauthorized permission !";
      return res.status(403).send({
        message: "Unauthorized permission !",
      });
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function locationQuery(req, res, next) {
  try {
    const user = req.user;
    req.body.query = {
      locationIds: {
        $in: user.locationIds[0],
      },
      ...req.body.query,
    };
    next();
  } catch (err) {
    throw new Error(err);
  }
}

async function checkInRequest(req, res, next) {
  try {
    const ipAddress = req.body.ipAddress;
    let result = await IpAddress.findOne({ ipAddress: ipAddress });
    if (!result) {
      res.message =
        "You can not proceed with this because you are accessing this site from unauthorized IP address.";
      return utils.successResponse({ isValid: false }, res);
    }
    next();
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  authentication: authentication,
  checkPermission: checkPermission,
  checkPermissionByUser: checkPermissionByUser,
  locationQuery: locationQuery,
  checkInRequest: checkInRequest,
};
