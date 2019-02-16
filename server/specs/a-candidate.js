import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();
chai.use(chaiHttp);

let token;
let token2;
describe('GET /auth/login', () => {
  it('it should log in the user', ((done) => {
    const loginDetails = {
      email: 'admin@politico.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].should.have.property('token');
        token = res.body.data[0].token;
        done(err);
      });
  }));
  it('it should log in the user', ((done) => {
    const loginDetails = {
      email: 'dex@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].should.have.property('token');
        res.body.data[0].user.email.should.equal('dex@gmail.com');
        token2 = res.body.data[0].token;
        done(err);
      });
  }));
});
describe('POST /office/:user_id/register', () => {
  it('it should allow user to contest', ((done) => {
    const newCandidate = {
      office: 1,
      party: 9
    };
    chai.request(app)
      .post('/api/v1/office/10/register')
      .set('authorization', token)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    const newCandidate = {
      office: 1,
      party: 9
    };
    chai.request(app)
      .post('/api/v1/office/100/register')
      .set('authorization', token)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    const newCandidate = {
      office: 1,
      party: 9
    };
    chai.request(app)
      .post('/api/v1/office/10/register')
      .set('authorization', token2)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
  it('it should return error 409', ((done) => {
    const newCandidate = {
      office: 1,
      party: 9
    };
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('authorization', token)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(409);
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

  it('it should return status code of 422 and an error message', ((done) => {
    const newCandidate = {
      party: 1
    };
    chai.request(app)
      .post('/api/v1/office/1/register')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(422);
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
      office: 1,
      candidate: 3
    };
    chai.request(app)
      .post('/api/v1/votes')
      .set('authorization', token2)
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return status code of 422 and an error message', ((done) => {
    const newCandidate = {
      office: 1
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(newCandidate)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
});
