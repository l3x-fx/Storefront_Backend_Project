import express, { Request, Response,  } from 'express'
import { OrderProducts, OrderStore } from "../models/order"
import { verifyAuthToken } from '../auth/auth'

export const store = new OrderStore()

const showByOrderId = async (req: Request, res: Response) => {
    try {
        const order = await store.getOrderById(parseInt(req.params.orderId))
        res.json(order)
    } catch (error) {
        res.status(401).json({ error });
        }
}

const createOrder = async (req: Request, res: Response) => { 
    try {
        const newProduct = await store.createOrder(parseInt(req.body.user_id)) 
        res.json(newProduct)
    } catch (error) {
        res.status(401).json({ error });
        }
}
const addProductToOrder = async (req: Request, res: Response) => { 
    try{
        const product:OrderProducts = {
            quantity: parseInt(req.body.quantity),
            order_id: req.params.orderId, 
            product_id: req.body.product_id
        }    
        const addedProduct = await store.addProductToOrder(product) 
        res.json(addedProduct)
    } catch (error) {
        res.status(401).json({ error });
        }
}

const showRecentOrderByUserId = async (req: Request, res: Response) => {
    try {
        const order = await store.showRecentOrderByUserId(parseInt(req.params.userId))
    res.json(order)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const showCompletedOrdersByUser = async (req: Request, res: Response) => {
    try {
        const order = await store.showCompletedOrdersByUser(parseInt(req.params.userId))
    res.json(order)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const orders_routes = (app: express.Application) => {
    app.get('/orders/:orderId', verifyAuthToken, showByOrderId)
    app.post('/orders', verifyAuthToken, createOrder)
    app.post('/orders/:orderId/products', verifyAuthToken, addProductToOrder)
    app.get('/users/:userId/order/recent', verifyAuthToken, showRecentOrderByUserId)
    app.get('/users/:userId/order/completed', verifyAuthToken, showCompletedOrdersByUser)
}

export default orders_routes
