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