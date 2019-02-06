import express from 'express';
import validator from '../middlewares/validation';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';
import Authentication from '../middlewares/auth';

const router = express.Router();

router.post('/parties', validator.partyValidator, Authentication.verifyUser, AdminController.registerParty);
router.get('/parties', Authentication.verifyUser, AdminController.getAllParties);
router.get('/parties/:party_id', Authentication.verifyUser, AdminController.getOneParty);
router.patch('/parties/:party_id/name', validator.editPartyValidator, Authentication.verifyUser, AdminController.editOneParty);
router.delete('/parties/:party_id', Authentication.verifyUser, AdminController.deleteOneParty);

router.post('/offices', validator.officeValidator, Authentication.verifyUser, AdminController.registerOffice);
router.get('/offices', Authentication.verifyUser, AdminController.getAllOffices);
router.get('/offices/:office_id', Authentication.verifyUser, AdminController.getOneOffice);

router.post('/auth/signup', validator.userValidator, UserController.createUser);
router.post('/auth/login', validator.loginValidator, UserController.loginUser);
router.post('/auth/reset', validator.resetValidator, Authentication.verifyUser, UserController.resetPassword);
router.post('/office/:user_id/register', validator.contestValidator, Authentication.verifyUser, UserController.contestInElection);
router.patch('/makeAdmin', Authentication.verifyUser, UserController.makeAdmin);
router.post('/votes', validator.voteValidator, Authentication.verifyUser, UserController.userVote);


export default router;
