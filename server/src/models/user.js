"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//DEFINING A MODEL
var userSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
}); //CRT A MODEL class

var modelClass = _mongoose.default.model("user", userSchema); //export THE MODEL


var _default = modelClass;
exports.default = _default;