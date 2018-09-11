"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authentication = require("./controllers/authentication");

var _default = function _default(app) {
  app.post("/signup", _authentication.signup);
};

exports.default = _default;