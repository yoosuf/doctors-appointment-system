const { Strategy, ExtractJwt } = require("passport-jwt");
const { JWT } = require("./authConstant");
const user = require("../model/v1/user");

module.exports = {
  adminPassportStrategy: (passport) => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = JWT.ADMIN_SECRET;
    passport.use(
      "admin-rule",
      new Strategy(options, (payload, done) => {
        user.findOne(
          {
            emails: {
              $elemMatch: {
                email: payload.email,
                isDefault: true,
              },
            },
          },
          (err, user) => {
            if (err) {
              logger.error(err);
              return done(err, false);
            }
            if (user) {
              return done(null, {
                ...user.toJSON(),
              });
            }
            return done(null, false);
          }
        );
      })
    );
  },
};
