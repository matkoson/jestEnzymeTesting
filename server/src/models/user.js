"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//DEFINING A MODEL
var userSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
}); //ON SAVE HOOK, ENCRYPT PASSWORD

userSchema.pre("save", function (next) {
  var _this = this;

  _bcryptNodejs.default.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    _bcryptNodejs.default.hash(_this.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      console.log(hash, _this.password);
      _this.password = hash;
      next();
    });
  });
}); //CRT A MODEL class

var ModelClass = _mongoose.default.model.call(_mongoose.default, "user", userSchema); //export THE MODEL


var _default = ModelClass;
exports.default = _default;