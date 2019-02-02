import express from 'express';
import validator from '../middlewares/validation';
import AdminController from '../controllers/adminController';
import UserController from '../controllers/userController';

const router = express.Router();

// router.post('/parties', validator.partyValidator, AdminController.registerParty);
// router.get('/parties', AdminController.getAllParties);
// router.get('/parties/:party_id', AdminController.getOneParty);
// router.patch('/parties/:party_id/name', validator.editPartyValidator, AdminController.editOneParty);
// router.delete('/parties/:party_id', AdminController.deleteOneParty);

// router.post('/offices', validator.officeValidator, AdminController.registerOffice);
// router.get('/offices', AdminController.getAllOffices);
// router.get('/offices/:office_id', AdminController.getOneOffice);

router.post('/auth/signup', UserController.createUser);


export default router;
