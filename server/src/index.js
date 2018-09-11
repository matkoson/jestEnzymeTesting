"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireWildcard(require("http"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _router = _interopRequireDefault(require("./router"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//MAIN START
var app = (0, _express.default)();

//DB SETUP
_mongoose.default.connect("mongodb://localhost:auth/auth", {
  useNewUrlParser: true
}); //APP SETUP


app.use((0, _morgan.default)("combined"));
app.use(_bodyParser.default.json({
  type: "*/*"
}));
(0, _router.default)(app); //SERVER SETUP

var port = process.env.PORT || 3090;
var server = (0, _http.createServer)(app);
server.listen(port);
console.log("Server listening on: ".concat(port));