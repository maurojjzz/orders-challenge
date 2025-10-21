import { Router } from 'express';
import { ordersRouter } from './order.route.js';

const router = Router();

router.use('/orders', ordersRouter);

export { router };