import express from 'express';
import AdminController from '../controllers/adminController';
import Authentication from '../middlewares/auth';

const adminRoute = express.Router();

adminRoute.patch('/admin/:user_id', Authentication.verifyUser, AdminController.makeAdmin);
adminRoute.get('/office/:office_id/result', Authentication.verifyUser, AdminController.getAllResults);
adminRoute.get('/users', Authentication.verifyUser, AdminController.getAllUsers);
adminRoute.get('/candidates', Authentication.verifyUser, AdminController.getAllPending);
adminRoute.post('/office/:user_id/register', Authentication.verifyUser, AdminController.acceptCandidate);
adminRoute.get('/populateVote', Authentication.verifyUser, AdminController.populateValuesForVotes);
adminRoute.get('/petitions/all', Authentication.verifyUser, AdminController.getAllPetitions);

export default adminRoute;
