import { Router } from 'express';
import * as userController from '../controllers/userController';
const User = require('../models/userModel');
import mongoose from 'mongoose';

const router = new Router();

router.post('/signup', userController.createUser);
router.post('/login' , )

export default router;
