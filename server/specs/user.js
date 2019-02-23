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
      email: 'joyce@gmail.com',
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

describe('POST /auth/signup', () => {
  it('it should create new user', ((done) => {
    const user = {
      firstname: 'Titi',
      lastname: 'Faith',
      username: 'faithtiti',
      email: 'faithtiti@gmail.com',
      password: '1234',
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqinou1cpnxydk.webps.jpg',
      phonenumber: '234567445890'
    }
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return 409', ((done) => {
    const user = {
      firstname: 'Titi',
      lastname: 'Faith',
      username: 'faithtiti',
      email: 'faithtiti@gmail.com',
      password: '1234',
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqinou1cpnxydk.webp.jpg',
      phonenumber: '234567890'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));
});


describe('POST /auth/reset', () => {
  //   it('it should log in the user', ((done) => {
  //     const resetDetails = {
  //       email: 'rexben.rb@gmail.com',
  //     };
  //     chai.request(app)
  //       .post('/api/v1/auth/reset')
  //       .send(resetDetails)
  //       .end((err, res) => {
  //         res.should.have.status(201);
  //         done(err);
  //       });
  //   }));

  // it('it should log in the user', ((done) => {
  //   const resetDetails = {
  //     email: 'rexben.rbbbb@gmail.com',
  //   };
  //   chai.request(app)
  //     .post('/api/v1/auth/reset')
  //     .send(resetDetails)
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       done(err);
  //     });
  // }));
});


describe('POST /office/register', () => {
  it('it should log in the user', ((done) => {
    const interest = {
      office: 1,
      party: 4
    };
    chai.request(app)
      .post('/api/v1/office/register')
      .send(interest)
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should log in the user', ((done) => {
    const interest = {
      office: 1,
      party: 4
    };
    chai.request(app)
      .post('/api/v1/office/register')
      .send(interest)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));

  it('it should log in the user', ((done) => {
    const interest = {
      office: 100,
      party: 100
    };
    chai.request(app)
      .post('/api/v1/office/register')
      .send(interest)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});

describe('POST /votes', () => {
  it('it should cast votes', ((done) => {
    const interest = {
      office: 1,
      candidate: 2
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(interest)
      .set('authorization', token2)
      .end((err, res) => {
        res.should.have.status(201);
        done(err);
      });
  }));

  it('it should return error 409', ((done) => {
    const interest = {
      office: 1,
      candidate: 72
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(interest)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(409);
        done(err);
      });
  }));

  it('it should log in the user', ((done) => {
    const interest = {
      office: 100,
      candidate: 100
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(interest)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  }));
});

describe('POST /petitions', () => {
  it('it should create petition', ((done) => {
    const petitionsDetails = {
      office: 1,
      bodyValue: 'Election outcome not free and fair',
      evidence: 'trikmd.jpg'
    };
    chai.request(app)
      .post('/api/v1/petitions')
      .send(petitionsDetails)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.data.should.have.property('office');
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const petitions = {
      office: 100,
      bodyValue: 'Election outcome not free and fair',
      evidence: 'trikmd.jpg'
    };
    chai.request(app)
      .post('/api/v1/petitions')
      .send(petitions)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});


describe('GET /votes/user', () => {
  it('it should get all votes casted by the user', ((done) => {
    chai.request(app)
      .get('/api/v1/votes/user')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});


describe('GET /votes/offices&candidates', () => {
  it('it should get all candidates', ((done) => {
    chai.request(app)
      .get('/api/v1/votes/offices&candidates')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});


describe('GET /users/profile', () => {
  it('it should get users profile', ((done) => {
    chai.request(app)
      .get('/api/v1/users/profile')
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        done(err);
      });
  }));
});

// describe('POST /resetpassword/:token', () => {
//   it('it should get users profile', ((done) => {
//     const update = {
//       password: '1234'
//     }
//     chai.request(app)
//       .post('/api/v1/resetpassword/:token')
//       .send(update)
//       .set('authorization', token)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done(err);
//       });
//   }));
// });
