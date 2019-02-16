import express from 'express';
import multer from 'multer';
import data from '../middlewares/multer';
import UserController from '../controllers/userController';
import ContestController from '../controllers/contestController';
import voteValidator from '../middlewares/Validators/voteValidator';
import loginValidator from '../middlewares/Validators/loginValidator';
import signupValidator from '../middlewares/Validators/signupValidator';
import contestValidator from '../middlewares/Validators/contestValidator';
import petitionValidator from '../middlewares/Validators/petitionValidator';
import Authentication from '../middlewares/auth';

const userRoute = express.Router();
const { dataStorage } = data;
const uploads = multer({ dataStorage }).single('passportUrl');

userRoute.post('/auth/signup', uploads, signupValidator, UserController.createUser);
userRoute.post('/auth/login', loginValidator, UserController.loginUser);
userRoute.post('/auth/reset', Authentication.verifyUser, UserController.resetPassword);
userRoute.post('/office/register', contestValidator, Authentication.verifyUser, ContestController.contestInElection);
userRoute.post('/votes', voteValidator, Authentication.verifyUser, UserController.userVote);
userRoute.post('/petitions', petitionValidator, Authentication.verifyUser, UserController.writePetition);
userRoute.get('/votes/user', Authentication.verifyUser, UserController.totalVotes);
userRoute.get('/votes/offices&candidates', Authentication.verifyUser, UserController.allVotes);
userRoute.get('/users/profile', Authentication.verifyUser, UserController.userProfile);

export default userRoute;
