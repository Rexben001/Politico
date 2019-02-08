import express from 'express';
import UserController from '../controllers/userController';
import AdminController from '../controllers/adminController';
import ContestController from '../controllers/contestController';
import voteValidator from '../middlewares/Validators/voteValidator';
import loginValidator from '../middlewares/Validators/loginValidator';
import signupValidator from '../middlewares/Validators/signupValidator';
import contestValidator from '../middlewares/Validators/contestValidator';
import petitionValidator from '../middlewares/Validators/petitionValidator';
import Authentication from '../middlewares/auth';

const userRoute = express.Router();

userRoute.post('/auth/signup', signupValidator, UserController.createUser);
userRoute.post('/auth/login', loginValidator, UserController.loginUser);
userRoute.post('/auth/reset', Authentication.verifyUser, UserController.resetPassword);
userRoute.post('/office/:user_id/register', contestValidator, Authentication.verifyUser, ContestController.contestInElection);
userRoute.patch('/makeAdmin/:user_id', Authentication.verifyUser, AdminController.makeAdmin);
userRoute.post('/votes', voteValidator, Authentication.verifyUser, UserController.userVote);
userRoute.post('/petitions', petitionValidator, Authentication.verifyUser, UserController.writePetition);

export default userRoute;