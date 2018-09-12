"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authentication = require("./controllers/authentication");

var _passport = _interopRequireDefault(require("./services/passport"));

var _passport2 = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requireAuth = _passport2.default.authenticate("jwt", {
  session: false
});

var requreSignin = _passport2.default.authenticate("local", {
  session: false
});

var _default = function _default(app) {
  app.get("/", requireAuth, function (req, res) {
    res.send({
      hi: "there"
    });
  });
  app.post("/signin", requreSignin, _authentication.signin);
  app.post("/signup", _authentication.signup);
};

exports.default = _default;