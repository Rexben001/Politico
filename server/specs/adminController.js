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
        res.body.data[0].user.email.should.equal('admin@politico.com');
        token = res.body.data[0].token;
        done(err);
      });
  }));

  it('it should log in the user', ((done) => {
    const loginDetails = {
      email: 'reex@gmail.com',
      password: '1234'
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].user.should.have.property('email');
        res.body.data[0].should.have.property('token');
        res.body.data[0].user.email.should.equal('reex@gmail.com');
        token2 = res.body.data[0].token;
        done(err);
      });
  }));
});

describe('POST /parties', () => {
  it('it should post a new political party', ((done) => {
    const newParty = {
      name: 'Plight Action People (LAP)',
      hqAddress: '1001, Allison Street, Jos',
      logoUrl: 'https://politico.com/pap_logo.jpg'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .set('authorization', token)
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    const newParty = {
      name: 'Might Action People (LAP)',
      hqAddress: '101, Allison Street, Jos',
      logoUrl: 'https://politico.com/map_logo'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .set('authorization', token2)
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));

  it('it should return 409', ((done) => {
    const newParty = {
      name: 'Lion Action People (LAP)',
      hqAddress: '10, Allison Street, Jos',
      logoUrl: 'https://politico.com/lp_logo'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .set('authorization', token)
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    const newParty = {
      name: 'Lion Action People (LAP)',
      hqAddress: '10, Allison Street, Jos',
      logoUrl: 'https://politico.com/lap_logo'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return status code of 422 and an error message', ((done) => {
    const newParty = {
      party_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
});

describe('GET /parties', () => {
  it('it should get all political parties', ((done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
  it('it should get all political parties', ((done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});

describe('GET /parties/<party-id>', () => {
  it('it should get a specific political party', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
  it('it should get a specific political party', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});

describe('PATCH /parties/<party-id>/name', () => {
  it('it should edit a specific political party', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)',
      hqAddress: '10, Anthony Street, Delta',
      logoUrl: 'http://www.politico.com/nap'
    };
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .set('authorization', token)
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)',
      hqAddress: '10, Anthony Street, Delta',
      logoUrl: 'http://www.politico.com/nap'
    };
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .set('authorization', token2)
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)',
      hqAddress: '10, Anthony Street, Delta',
      logoUrl: 'http://www.politico.com/nap'
    };
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)'
    };
    chai.request(app)
      .patch('/api/v1/parties/100/name')
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
});

describe('DELETE /parties/<party-id>', () => {
  it('it should delete a specific political party', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/6')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return 401', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/6')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));
  it('it should return no token provided', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        done(err);
      });
  }));
});

describe('POST /offices', () => {
  it('it should post a new political office', ((done) => {
    const newOffice = {
      type: 'Federal',
      name: 'Senate (Delta)',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', token)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    const newOffice = {
      type: 'Federal',
      name: 'Senate (Delta)',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', token2)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));

  it('it should return 409', ((done) => {
    const newOffice = {
      type: 'Federal',
      name: 'Senate (Delta)',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .set('authorization', token)
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    const newOffice = {
      type: 'Federal',
      name: 'President',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return status code of 422 and an error message', ((done) => {
    const newOffice = {
      office_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
});

describe('GET /offices', () => {
  it('it should get all political offices', ((done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
  it('it should return token not provided', ((done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});

describe('GET /offices/<office-id>', () => {
  it('it should get a specific political office', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/100')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        done(err);
      });
  }));
});

describe('GET /office/:office_id/result', () => {
  it('it should get a specific political office', ((done) => {
    chai.request(app)
      .get('/api/v1/office/1/result')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    chai.request(app)
      .get('/api/v1/office/1/result')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    chai.request(app)
      .get('/api/v1/office/1/result')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});

describe('PATCH /admin/:user_id', () => {
  it('it should make a user an Admin', ((done) => {
    chai.request(app)
      .patch('/api/v1/admin/2')
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

  it('it should return no token provided', ((done) => {
    chai.request(app)
      .patch('/api/v1/admin/2')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});


describe('GET /office/:office_id/result', () => {
  it('it should get the result of an election', ((done) => {
    chai.request(app)
      .get('/office/1/result')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/office/200/result')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));

  it('it should return 401', ((done) => {
    chai.request(app)
      .get('/office/1/result')
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      });
  }));

  it('it should return no token provided', ((done) => {
    chai.request(app)
      .get('/office/1/result')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});
