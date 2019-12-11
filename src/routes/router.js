import { Router } from 'express';
import * as api from '../controllers/homeController';

const router = new Router();

router.use('/', api.getHome);

export default router;
