import express from 'express';
import AdminController from '../controllers/adminController';

const router = express.Router();

router.post('/parties', AdminController.registerParty);

export default router;