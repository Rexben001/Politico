import express from 'express';
import validator from '../middlewares/validation';
import AdminController from '../controllers/adminController';

const router = express.Router();

router.post('/parties', validator.partyValidator, AdminController.registerParty);
router.get('/parties', AdminController.getAllParties);


export default router;