import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);

let token;
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
});
describe('GET /office/:user_id/register', () => {
  it('it should allow user to contest', ((done) => {
    const newCandidate = {
      office: 1,
      party: 2
    };
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('authorization', token)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    const newCandidate = {
      office: 1,
      party: 2
    };
    chai.request(app)
      .post('/api/v1/office/1/register')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const newCandidate = {
      party: 1
    };
    chai.request(app)
      .post('/api/v1/office/1/register')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('POST /votes', () => {
  it('it should return no token provided', ((done) => {
    const newCandidate = {
      office: 2,
      createdBy: 2,
      candidate: 2

    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should allow user to vote', ((done) => {
    const newCandidate = {
      office: 2,
      createdBy: 1,
      candidate: 2

    };
    chai.request(app)
      .post('/api/v1/votes')
      .set('authorization', token)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const newCandidate = {
      office: 1
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});
