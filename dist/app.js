"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _route = _interopRequireDefault(require("./routes/route"));

var _database = _interopRequireDefault(require("./models/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const {
  users,
  party,
  office,
  candidate,
  vote
} = _database.default;
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'Politico Xpress'
}));

const createTable = async () => {
  await users();
  await party();
  await office();
  await candidate();
  await vote();
};

createTable();
app.use('/api/v1', _route.default);
app.listen(process.env.PORT || 8080, () => {
  console.log('Working');
});
var _default = app;
exports.default = _default;