import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import database from '../models/database';

chai.should();
chai.use(chaiHttp);


describe('POST /parties', () => {
  it('it should post a new political party', ((done) => {
    const newParty = {
      party_id: 3,
      name: 'Lion Action People (LAP)',
      hqAddress: '10, Allison Street, Jos',
      logoUrl: 'https://politico.com/lap_logo'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].name.should.equal('Lion Action People (LAP)');
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const newParty = {
      party_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('GET /parties', () => {
  it('it should get all political parties', ((done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('Array');
        res.body.data[0].name.should.equal('Action People (AP)');
        res.body.data[1].logoUrl.should.equal('https://politico.com/ppp_logo');
        res.body.data[2].hqAddress.should.equal('10, Allison Street, Jos');
        done(err);
      });
  }));
});

describe('GET /parties/<party-id>', () => {
  it('it should get a specific political party', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].name.should.equal('Action People (AP)');
        res.body.data[0].logoUrl.should.equal('https://politico.com/ap_logo');
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/5')
      .end((err, res) => {
        res.should.have.status(404);
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
      .send(editParty)
      .end((err, res) => {
        console.log(res.body.data);
        res.should.have.status(201);
        res.body.data[0].name.should.equal('National Action People (NAP)');
        res.body.data[0].id.should.equal(1);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)'
    };
    chai.request(app)
      .patch('/api/v1/parties/5/name')
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('DELETE /parties/<party-id>', () => {
  it('it should delete a specific political party', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].message.should.equal('You have successfully deleted National Action People (NAP)');
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/5')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Unable to retrieve party');
        done(err);
      });
  }));
});

describe('POST /offices', () => {
  it('it should post a new political office', ((done) => {
    const newOffice = {
      office_id: 3,
      type: 'Federal',
      name: 'President',
      region: 'Natioal'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data[0].type.should.equal('Federal');
        res.body.data[0].name.should.equal('President');
        done(err);
      });
  }));
  it('it should return status code of 400 and an error message', ((done) => {
    const newOffice = {
      office_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('GET /offices', () => {
  it('it should get all political offices', ((done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('Array');
        res.body.data[0].type.should.equal('State');
        res.body.data[1].name.should.equal('Senator');
        done(err);
      });
  }));
});

describe('GET /offices/<office-id>', () => {
  it('it should get a specific political office', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data[0].name.should.equal('Governor');
        res.body.data[0].type.should.equal('State');
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/5')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.error.should.equal('Unable to retrieve Office');
        done(err);
      });
  }));
});


