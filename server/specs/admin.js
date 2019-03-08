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


describe('PATCH /admin/:user_id', () => {
  it('it should make a user an Admin', ((done) => {
    chai.request(app)
      .patch('/api/v1/admin/3')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .patch('/api/v1/admin/200')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    chai.request(app)
      .patch('/api/v1/admin/2')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});


describe('GET /office/:office_id/result', () => {
  it('it should get the results of an election', ((done) => {
    chai.request(app)
      .get('/api/v1/office/1/result')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/api/v1/office/7/result')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});


describe('GET /users', () => {
  it('it should return all users', ((done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    chai.request(app)
      .get('/api/v1/users')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});


describe('GET /candidates', () => {
  it('it should get all pending candidates', ((done) => {
    chai.request(app)
      .get('/api/v1/candidates')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    chai.request(app)
      .get('/api/v1/candidates')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});


describe('POST /office/:user_id/register', () => {
  it('it should accept candidate', ((done) => {
    chai.request(app)
      .post('/api/v1/office/3/register')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 404', ((done) => {
    chai.request(app)
      .post('/api/v1/office/15/register')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    chai.request(app)
      .post('/api/v1/office/1/register')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});

describe('POST /office/:user_id/reject', () => {
  it('it should accept candidate', ((done) => {
    chai.request(app)
      .post('/api/v1/office/3/reject')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 404', ((done) => {
    chai.request(app)
      .post('/api/v1/office/15/reject')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    chai.request(app)
      .post('/api/v1/office/1/reject')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});

describe('GET /populateVote', () => {
  it('it should get all accepted candidates', ((done) => {
    chai.request(app)
      .get('/api/v1/populateVote')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});

describe('GET /petitions/all', () => {
  it('it should get all petitions', ((done) => {
    chai.request(app)
      .get('/api/v1/petitions/all')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    chai.request(app)
      .get('/api/v1/petitions/all')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});
