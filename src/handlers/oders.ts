import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { OrderStore } from "../models/order"

import { ServiceStore } from '../services/services'
import verifyAuthToken from './servicehandler'

dotenv.config()
const {TOKEN_SECRET} = process.env

const store = new OrderStore()
const service = new ServiceStore()



//map products to details
const index = async (_req: Request, res: Response) => {
    try {
        const order = await store.index()
        res.json(order)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const showByOrderId = async (req: Request, res: Response) => {
    try {
        const order = await store.show(req.params.orderId)
        const details = await service.showProductsOfOrder(order.id as number)
        const detailedOrder = {
            id: order.id,
            user_id: order.user_id,
            status: order.status, 
            products: details
        }
        res.json(detailedOrder)
    } catch (error) {
        res.status(401).json({ error });
        }
}

const create = async (req: Request, res: Response) => { 
    try {
        const newProduct = await store.create(req.body.user_id) 
        res.json(newProduct)
    } catch (error) {
        res.status(401).json({ error });
        }
}
const addProductToOrder = async (req: Request, res: Response) => { 
    try{
        const addedProduct = await store.addProductToOrder(req.body.quantity, req.params.orderId, req.body.product_id) 
        res.json(addedProduct)
    } catch (error) {
        res.status(401).json({ error });
        }
}


const orders_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:orderId', verifyAuthToken, showByOrderId)
    app.post('/orders/', create)
    app.post('/orders/:orderId/products', addProductToOrder)


    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
}

export default orders_routes
