import express, { Request, Response,  } from 'express'
import { OrderProducts, OrderStore } from "../models/order"
import { verifyAuthToken } from '../auth/auth'

const store = new OrderStore()

const showByOrderId = async (req: Request, res: Response) => {
    try {
        const order = await store.getOrderById(req.params.orderId)
        const details = await store.showProductsOfOrder(order.id as number)
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

const createOrder = async (req: Request, res: Response) => { 
    try {
        const newProduct = await store.createOrder(req.body.user_id) 
        res.json(newProduct)
    } catch (error) {
        res.status(401).json({ error });
        }
}
const addProductToOrder = async (req: Request, res: Response) => { 
    try{
        const product:OrderProducts = {
            quantity: req.body.quantity, 
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
        const order = await store.showRecentOrderByUserId(req.params.userId)
        const details = await store.showProductsOfOrder(order.id as number)
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

const orders_routes = (app: express.Application) => {
    app.get('/orders/:orderId', verifyAuthToken, showByOrderId)
    app.post('/orders/', verifyAuthToken, createOrder)
    app.post('/orders/:orderId/products', addProductToOrder)
    app.get('/users/:userId/order/recent', showRecentOrderByUserId)

}

export default orders_routes
