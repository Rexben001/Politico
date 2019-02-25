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



describe('POST /parties', () => {
  it('it should create new party', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    }
    chai.request(app)
      .post('/api/v1/parties')
      .send(party)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 409', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    }
    chai.request(app)
      .post('/api/v1/parties')
      .send(party)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(party)
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
});

describe('GET /parties', () => {
  it('it should get all parties', ((done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});


describe('GET /parties/1', () => {
  it('it should get all accepted candidates', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/100')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});


describe('PATCH /parties/3', () => {
  it('it should edit a party', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    }
    chai.request(app)
      .patch('/api/v1/parties/3/name')
      .send(party)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    }
    chai.request(app)
      .patch('/api/v1/parties/3/name')
      .send(party)
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    const party = {
      name: 'Peace and Unity Group',
      hqAddress: 'Blk 2, Adeun Estate',
      logoUrl: 'partylogo.jpg'
    }
    chai.request(app)
      .patch('/api/v1/parties/60/name')
      .send(party)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});


describe('DELETE /parties/1', () => {
  it('it should delete a party', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/5')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/5')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
  it('it should return 404', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/100')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});
