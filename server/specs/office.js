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
      email: 'bendinho@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        // eslint-disable-next-line prefer-destructuring
        token = res.body.data[0].token;
        done(err);
      });
  }));

  it('it should log in the user', ((done) => {
    const loginDetails = {
      email: 'ben@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        token2 = res.body.data[0].token;
        done(err);
      });
  }));
});


describe('POST /offices', () => {
  it('it should create new office', ((done) => {
    const office = {
      type: 'Federal',
      name: 'Senate (Kano 2)'
    }
    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 409', ((done) => {
    const office = {
      type: 'federal',
      name: 'senate (kano 2)'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    const office = {
      type: 'federal',
      name: 'senate (lagos 1)'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});

describe('GET /offices', () => {
  it('it should get all offices', ((done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});


describe('GET /offices/1', () => {
  it('it should get oe office', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/100')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});

