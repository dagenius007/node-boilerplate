import { Router } from 'express';
import * as t from '../controllers/homeController';

const router = new Router();

router.use('/', (req, res) => {
	console.log('Just things');
	res.status(200).json({ message: 'Hi hello' });
});

export default router;
