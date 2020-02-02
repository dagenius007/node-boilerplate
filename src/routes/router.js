import { Router } from 'express';
import * as UserController from '../controllers/UserController';
const router = new Router();

router.get('/', function(req, res) {
	console.log('ji');
	res.status(200).json({ message: 'Hello' });
});
router.post('/signup', UserController.signup);
router.post('/login', UserController.loginUser);

export default router;
