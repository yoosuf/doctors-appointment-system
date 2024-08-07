const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWT } = require("./authConstant");
const User = require("../model/v1/user");

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = JWT.SECRET;
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findOne(
        {
          emails: {
            $elemMatch: {
              email: jwt_payload.email,
              isDefault: true,
            },
          },
        },
        (err, user) => {
          if (err) return done(err, false);
          if (user) {
            if (jwt_payload.isImpersonated) {
              user.isImpersonated = true;
              user.adminId = jwt_payload.adminId;
            }
            return done(null, user);
          }
          return done(null, false);
        }
      );
    })
  );
};
