import chai from 'chai';
import app from '../app';

chai.should();

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
                res.body.data.name.should.equal('Lion Action People (LAP)');
                res.body.data.logoUrl.should.equal('https://politico.com/lap_logo');
                res.body.data.hqAddress.should.be.a('String');
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
                res.body.error.should.equal('Unable to process your request, make sure the fields are entered correctly');
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