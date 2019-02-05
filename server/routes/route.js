import express from 'express';
import validator from '../middlewares/validation';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';
import Authentication from '../middlewares/auth';

const router = express.Router();

router.post('/parties', Authentication.verifyUser, validator.partyValidator, AdminController.registerParty);
router.get('/parties', Authentication.verifyUser, AdminController.getAllParties);
router.get('/parties/:party_id', Authentication.verifyUser, AdminController.getOneParty);
router.patch('/parties/:party_id/name', Authentication.verifyUser, validator.editPartyValidator, AdminController.editOneParty);
router.delete('/parties/:party_id', Authentication.verifyUser, AdminController.deleteOneParty);

router.post('/offices', Authentication.verifyUser, validator.officeValidator, AdminController.registerOffice);
router.get('/offices', Authentication.verifyUser, AdminController.getAllOffices);
router.get('/offices/:office_id', Authentication.verifyUser, AdminController.getOneOffice);

router.post('/auth/signup', validator.userValidator, UserController.createUser);
router.post('/auth/login', validator.loginValidator, UserController.loginUser);
router.post('/auth/reset', Authentication.verifyUser, validator.resetValidator, UserController.resetPassword);
router.post('/office/:user_id/register', Authentication.verifyUser, validator.contestValidator, UserController.contestInElection);
router.patch('/makeAdmin/:user_id', Authentication.verifyUser, UserController.makeAdmin);


export default router;
