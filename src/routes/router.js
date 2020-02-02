import { Router } from 'express';
const UserController = require('../controllers/UserController');
const User = require('../models/User');


const router = new Router();

router.post('/signup', UserController.createUser);
router.post('/login');

export default router;
