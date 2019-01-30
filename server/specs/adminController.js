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

    it('it should post a new political party', ((done) => {
        const newParty = {
            party_id: 4,
            name: 'Faithful People (FP)',
            hqAddress: 'KM. 42, Lagos Ibadan ExpressWay, Ogun',
            logoUrl: 'https://politico.com/fp_logo'
        };
        chai.request(app)
            .post('/api/v1/parties')
            .send(newParty)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.name.should.equal('Faithful People (FP)');
                res.body.data.logoUrl.should.equal('https://politico.com/fp_logo');
                res.body.data.hqAddress.should.be.a('String');
                done(err);
            });
    }));

});