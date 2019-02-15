import express from 'express';
import partyController from '../controllers/partyController';
import partyValidator from '../middlewares/Validators/partyValidator';
import Authentication from '../middlewares/auth';

const partyRoute = express.Router();

partyRoute.post('/parties', partyValidator, Authentication.verifyUser, partyController.registerParty);
partyRoute.get('/parties', Authentication.verifyUser, partyController.getAllParties);
partyRoute.get('/parties/:party_id', Authentication.verifyUser, partyController.getOneParty);
partyRoute.patch('/parties/:party_id/name', partyValidator, Authentication.verifyUser, partyController.editOneParty);
partyRoute.delete('/parties/:party_id', Authentication.verifyUser, partyController.deleteOneParty);

export default partyRoute;
