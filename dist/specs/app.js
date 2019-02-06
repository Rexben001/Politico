"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.should();

_chai.default.use(_chaiHttp.default);

describe('GET /', () => {
  it('it should get homepage', done => {
    _chai.default.request(_app.default).get('/').end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('message').equal('Politico Xpress');
      done(err);
    });
  });
});