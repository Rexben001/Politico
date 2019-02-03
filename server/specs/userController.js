import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);


describe('POST /auth/signup', () => {
  it('it should create a new user', ((done) => {
    const newUser = {
      firstname: 'Ben',
      lastname: 'Rex',
      othernames: 'Seyi',
      email: 'xy@gmail.com',
      password: '1234',
      username: 'ben',
      phonenumber: '+234567890',
      passportUrl: 'http://www.politico.com/aban'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.firstname.should.equal('Ben');
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const newUser = {
      firstname: 'Ben'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});
