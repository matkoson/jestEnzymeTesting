"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = signin;
exports.signup = signup;

var _user = _interopRequireDefault(require("../models/user"));

var _jwtSimple = _interopRequireDefault(require("jwt-simple"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return _jwtSimple.default.encode({
    sub: user.id,
    iat: timestamp
  }, _config.default.secret);
}

function signin(req, res, next) {
  //USER HAS ALREADY HAD THEIR email&&passwd AUTH'D
  //I NEED TO JUST GIVE THEM A TOKEN
  res.send({
    token: tokenForUser(req.user)
  });
}

function signup(req, res, next) {
  //SEE IF A USR WITH THE GIVEN EMAIL EXISTS
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password; //IF A USR WITH email DOES EXIST, return AN ERROR

  if (!email || !password) {
    return res.status(422).send({
      error: "You must provide email and password."
    });
  }

  var user = new _user.default({
    email: email,
    password: password
  });

  _user.default.findOne({
    email: email
  }).then(function (existingUser) {
    if (existingUser) {
      throw new Error("email in use!");
    }

    return user.save();
  }) //RESPOND TO THE REQ INDICATING THE USR WAS CRTD
  .then(function () {
    return res.json({
      token: tokenForUser(user)
    });
  }).catch(function (err) {
    if (err.message === "email in use") {
      return res.status(422).send({
        error: err.message
      });
    }

    return next(err);
  });
}