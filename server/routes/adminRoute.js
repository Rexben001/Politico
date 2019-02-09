import express from 'express';
import AdminController from '../controllers/adminController';
import Authentication from '../middlewares/auth';

const adminRoute = express.Router();

adminRoute.patch('/admin/:user_id', Authentication.verifyUser, AdminController.makeAdmin);
adminRoute.get('/office/:office_id/result', Authentication.verifyUser, AdminController.getAllResults);

export default adminRoute;
