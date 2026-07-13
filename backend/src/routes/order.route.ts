import { Router } from "express";
import { Sanitize, findAll, findOne, create, update, remove } from "../controllers/order.controller.js";

const ordersRouter = Router();

ordersRouter
    .get('/', findAll)
    .get('/:id', findOne)
    .post('/', Sanitize, create)
    .put('/:id', Sanitize, update)
    .delete('/:id', remove);

export { ordersRouter };



