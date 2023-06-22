import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { OrderProducts } from '../models/order'
import { OrderStore } from "../models/order"

import { ServiceStore } from '../services/dashboard'
//import jwt from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

const store = new OrderStore()
const service = new ServiceStore()

//map products to details
const index = async (_req: Request, res: Response) => {
    const order = await store.index()
    res.json(order)
}

const showByOrderId = async (req: Request, res: Response) => {
    const order = await store.show(req.body.orderId)
    const details = await service.showProductsOfOrder(order.id as number)
    const detailedOrder = {
        id: order.id,
        user_id: order.user_id,
        status: order.status, 
        products: details
    }
    res.json(detailedOrder)
}

const create = async (req: Request, res: Response) => { 
    const newProduct = await store.create(req.body.user_id) 
    res.json(newProduct)
}
const addProductToOrder = async (req: Request, res: Response) => { 
    const addedProduct = await store.addProductToOrder(req.body.quantity, req.params.id, req.body.product_id) 
    res.json(addedProduct)
}


const orders_routes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:orderId', showByOrderId)
    app.post('/orders/', create)
    app.post('/orders/:orderId/products', addProductToOrder)


    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
}

export default orders_routes
