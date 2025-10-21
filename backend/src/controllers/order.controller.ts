import { Request, Response, NextFunction } from "express";
import { Order, OrderStatus } from "../entities/order.entity.js";
import { orm } from "../shared/orm.js";

const em = orm.em;
em.getRepository(Order);

const Sanitize = async (req: Request, res: Response, next: NextFunction) => {
    req.body.sanitizedInput = {
        customer_name: req.body.customer_name,
        item: req.body.item,
        quantity: req.body.quantity,
        status: req.body.status,
    }
    if (req.body.status !== undefined) {
        const validStatuses = Object.values(OrderStatus);
        if (!validStatuses.includes(req.body.status)) {
            return res.status(400).json({
                message: "Invalid status value",
                error: `Status must be one of: ${validStatuses.join(', ')}`
            });
        }
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

const findAll = async (req: Request, res: Response) => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const page_size = Math.min(100, Math.max(1, parseInt(req.query.page_size as string) || 10));
        
        const offset = (page - 1) * page_size;
        
        const [orders, total] = await em.findAndCount(Order, {}, {
            limit: page_size,
            offset: offset,
            orderBy: { created_at: 'DESC' }
        });
        
        const total_pages = Math.ceil(total / page_size);
        const has_next = page < total_pages;
        const has_previous = page > 1;
        
        res.status(200).json({
            message: "Orders retrieved successfully",
            data: orders,
            pagination: {
                page,
                page_size,
                total_items: total,
                total_pages,
                has_next,
                has_previous
            }
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error retrieving orders",
            error: error.message
        });
    }
}

const findOne = async (req: Request, res: Response) => {
    try {
        console.log(req.params.id);
        const order = await em.findOneOrFail(Order, { id: req.params.id });
        res.status(200).json({
            message: "Order retrieved successfully",
            data: order
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error retrieving order",
            error: error.message
        });
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order = em.create(Order, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({
            message: "Order created successfully",
            data: order
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const order = await em.findOneOrFail(Order, { id: req.params.id });
        em.assign(order, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({
            message: "Order updated successfully",
            data: order
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error updating order",
            error: error.message
        });
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const order = await em.findOneOrFail(Order, { id: req.params.id });
        await em.removeAndFlush(order);
        res.status(200).json({
            message: "Order removed successfully",
            data: order
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error removing order",
            error: error.message
        });
    }
}





export { Sanitize, findAll, findOne, create, update, remove };