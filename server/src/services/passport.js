"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../models/user"));

var _config = _interopRequireDefault(require("../config"));

var _passportJwt = require("passport-jwt");

var _passportLocal = _interopRequireDefault(require("passport-local"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//CREATE LOCAL STRATEGY
var localOptions = {
  usernameField: "email"
};
var localLogin = new _passportLocal.default(localOptions, function (email, password, done) {
  //VERIFY THIS USERNAME AND PASSWORD, CALL done WITH THE
  //USER  IF THE CREDENTIALS CHECKS OUT
  //OTHERWISE, CALLING done WITH false
  _user.default.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false);
    } //COMPARING PASSWORDS=> IS "password" EQUAL
    //TO user.password?


    user.comparePassword(password, function matcher(err, isMatch) {
      if (err) {
        return done(err);
      }

      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
}); //SETUP OPTIONS FOR JWT STRATEGY

var jwtOptions = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromHeader("authorization"),
  secretOrKey: _config.default.secret
}; //CREATE JWT Strategy

var jwtLogin = new _passportJwt.Strategy(jwtOptions, function (payload, done) {
  //SEE IF THE USER id IN THE payload EXISTS IN MY DB
  //IF IT DOES, CALL done WITH THAT USR, OTHERWISE,
  //CALL done WITHOUT A USER{}
  _user.default.findById(payload.sub, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

_passport.default.use(jwtLogin);

_passport.default.use(localLogin); //TELL PASSPORT TO USE THIS STRATEGY