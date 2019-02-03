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
      email: 'dexy@gmail.com',
      password: '1234',
      username: 'benny',
      phonenumber: '+234567890',
      passportUrl: 'http://www.politico.com/aban'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.firstname.should.equal('Ben');
        res.body.data[0].should.have.property('token');
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


describe('GET /auth/login', () => {
  it('it should log in the user', ((done) => {
    const loginDetails = {
      email: 'dexy@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('firstname');
        res.body.data[0].should.have.property('token');
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const login = {
      firstname: 'Ben'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});
