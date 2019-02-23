import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('Return 422 http error code', () => {
  it('it should return invalid office', ((done) => {
    const contest = {
    };
    chai.request(app)
      .post('/api/v1/office/register')
      .send(contest)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid party', ((done) => {
    const contest = {
      office: 1
    };
    chai.request(app)
      .post('/api/v1/office/register')
      .send(contest)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));


  it('it should return invalid email', ((done) => {
    const login = {
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid password', ((done) => {
    const login = {
      email: 'rexben.rb@gmail.com',
      password: 1234
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(login)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));


  it('it should return invalid name', ((done) => {
    const office = {
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid type', ((done) => {
    const office = {
      name: 'Senate  '
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(office)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));


  it('it should return invalid name', ((done) => {
    const parties = {
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(parties)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid hqAddress', ((done) => {
    const parties = {
      name: 'Honorable Party'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(parties)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid logoUrl', ((done) => {
    const parties = {
      name: 'Honorable Party',
      hqAddress: '10, Oke Street'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(parties)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));


  it('it should return invalid office', ((done) => {
    const petitions = {
    };
    chai.request(app)
      .post('/api/v1/petitions')
      .send(petitions)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid bodyValue', ((done) => {
    const petitions = {
      office: 1
    };
    chai.request(app)
      .post('/api/v1/petitions')
      .send(petitions)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid evidence', ((done) => {
    const petitions = {
      office: 1,
      bodyValue: 'Ballot snatching'
    };
    chai.request(app)
      .post('/api/v1/petitions')
      .send(petitions)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));


  it('it should return invalid firstname', ((done) => {
    const signup = {
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid lastname', ((done) => {
    const signup = {
      firstname: 'Ben'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid username', ((done) => {
    const signup = {
      firstname: 'Titi',
      lastname: 'Faith',
      username: 1,
      email: 'ijay2@gmail.com',
      password: '1234',
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqi'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid email', ((done) => {
    const signup = {
      firstname: 'Titi',
      lastname: 'Faith',
      othernames: 'Ijeoma',
      username: 'Ijay2',
      email: 'ijaycom',
      password: '1234',
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqi'
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid phone number', ((done) => {
    const signup = {
      firstname: 'Titi',
      lastname: 'Faith',
      othernames: 'Ijeoma',
      username: 'Ijay2',
      email: 'ijay2@gmail.com',
      password: '1234',
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqi'
    }
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid password', ((done) => {
    const signup = {
      firstname: 'Titi',
      lastname: 'Faith',
      othernames: 'Ijeoma',
      username: 'Ijay2',
      email: 'ijay2@gmail.com',
      phonenumber: '1234567890',
      password: 1234,
      passportUrl: 'https://res.cloudinary.com/rexben/image/upload/v1550596757/h6vdmirqi'
    }
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid passportUrl', ((done) => {
    const signup = {
      firstname: 'Titi',
      lastname: 'Faith',
      othernames: 'Ijeoma',
      username: 'Ijay2',
      email: 'ijay2@gmail.com',
      password: '1234',
      phonenumber: '1234567890',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signup)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));

  it('it should return invalid office', ((done) => {
    const votes = {
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(votes)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
  it('it should return invalid candidate', ((done) => {
    const votes = {
      office: 1
    };
    chai.request(app)
      .post('/api/v1/votes')
      .send(votes)
      .end((err, res) => {
        res.should.have.status(422);
        done(err);
      });
  }));
});

