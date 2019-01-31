import express from 'express';
import validator from '../middlewares/validation';
import AdminController from '../controllers/adminController';

const router = express.Router();

router.post('/parties', validator.partyValidator, AdminController.registerParty);
router.get('/parties', AdminController.getAllParties);
router.get('/parties/:party_id', AdminController.getOneParty);
router.patch('/parties/:party_id/name', validator.editPartyValidator, AdminController.editOneParty);
router.delete('/parties/:party_id', AdminController.deleteOneParty);

router.post('/offices', AdminController.registerOffice);


export default router;