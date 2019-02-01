import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

describe('GET /', () => {
  it('it should get homepage', ((done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').equal('Politico Xpress');
        done(err);
      });
  }));
});
