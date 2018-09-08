"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(app) {
  app.get("/", function (req, res, next) {
    console.log("got it");
    return res.send(["lolololo"]);
  });
};

exports.default = _default;