import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const token = 'hjfrh88i4j4092uijhfjkfporf,.mfpopriruiruiriri';

describe('Authenticate users', () => {
  it('it should return no token provided', ((done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
  it('it should return failed to authenticate token', ((done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(500);
        done(err);
      });
  }));

  it('it should return failed to authenticate token', ((done) => {
    chai.request(app)
      .post(`/api/v1/resetpassword/${token}`)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(500);
        done(err);
      });
  }));
});
