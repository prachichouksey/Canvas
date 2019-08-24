"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = function(passport) {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "canvas_cmpe273"
  };
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, callback) {
      let userid = jwt_payload.userid;

      callback(null, userid);
    })
  );
};
