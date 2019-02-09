import express from 'express';
import OfficeController from '../controllers/officeController';
import officeValidator from '../middlewares/Validators/officeValidator'
import Authentication from '../middlewares/auth';

const officeRoute = express.Router();

officeRoute.post('/offices', officeValidator, Authentication.verifyUser, OfficeController.registerOffice);
officeRoute.get('/offices', Authentication.verifyUser, OfficeController.getAllOffices);
officeRoute.get('/offices/:office_id', Authentication.verifyUser, OfficeController.getOneOffice);

export default officeRoute;
