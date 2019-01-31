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

describe('GET /parties/<party-id>', () => {
    it('it should get a specific political party', ((done) => {
        chai.request(app)
            .get('/api/v1/parties/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.name.should.equal('Action People (AP)');
                res.body.data.logoUrl.should.equal('https://politico.com/ap_logo');
                done(err);
            });
    }));

    it('it should return error 404', ((done) => {
        chai.request(app)
            .get('/api/v1/parties/5')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.error.should.equal('Unable to retrieve party');
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
                res.should.have.status(201);
                res.body.data.name.should.equal('National Action People (NAP)');
                res.body.data.party_id.should.equal(1);
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
                res.body.error.should.equal('Unable to process your request, make sure the fields are entered correctly');
                done(err);
            });
    }));
});

describe('DELETE /parties/<party-id>', () => {
    it('it should delete a specific political party', ((done) => {
        chai.request(app)
            .delete('/api/v1/parties/1')
            .end((err, res) => {
                console.log(res.body.data);
                res.should.have.status(200);
                res.body.data.message.should.equal('You have successfully deleted National Action People (NAP)');
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