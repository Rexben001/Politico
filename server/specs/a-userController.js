import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import seed from '../models/seed';

chai.should();
chai.use(chaiHttp);
seed();

let token;

describe('POST /auth/signup', () => {
  it('it should create a new user', ((done) => {
    const newUser = {
      firstname: 'Ben',
      lastname: 'Rex',
      othernames: 'Seyi',
      email: 'mex@gmail.com',
      password: '1234',
      username: 'benns',
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
      email: 'admin@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].should.have.property('token');
        // console.log(res.body.data[0].token);
        token = res.body.data[0].token;
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

describe('GET /auth/reset', () => {

  it('it should reset password', ((done) => {
    const reset = {
      email: 'dexy@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/reset')
      .set('authorization', token)
      .send(reset)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    const reset = {
      email: 'dexy@gmail.com',
    };
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send(reset)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const reset = {
      firstname: 'Ben'
    };
    chai.request(app)
      .post('/api/v1/auth/reset')
      .send(reset)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

