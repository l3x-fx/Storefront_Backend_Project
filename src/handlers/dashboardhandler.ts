import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { OrderProducts } from '../models/order'
import { OrderStore } from "../models/order"

import { ServiceStore } from '../services/dashboard'
//import jwt from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

const service = new ServiceStore()

const showTopFiveProducts= async (_req: Request, res:Response) => {
    const topFive = await service.showTopFiveProducts()
    res.json(topFive)
}

const showRecentOrderByUserId = async (req: Request, res: Response) => {
    const order = await service.showRecentOrderByUserId(req.params.userId)
    const details = await service.showProductsOfOrder(order.id as number)
    const detailedOrder = {
        id: order.id,
        user_id: order.user_id,
        status: order.status, 
        products: details
    }
    res.json(detailedOrder)
}

// const showCompletedByUser = async (req: Request, res: Response) => { 
//     const orders = await service.showCompletedOrdersByUser(req.params.userId);

//     const detailedOrders = await Promise.all(
//         orders.map(async (order) => {
//             const details = await service.showProductsOfOrder(order.id as number);
            
//             return {
//             id: order.id,
//             user_id: order.user_id,
//             status: order.status,
//             products: details,
//             };
//         })
//     );
//
//    res.json(detailedOrders);
//}

const service_routes = (app: express.Application) => {

    app.get('/products/top5', showTopFiveProducts)
    app.get('/users/:userId/order/recent', showRecentOrderByUserId)
  //  app.get('/users/:userId/orders/complete', showCompletedByUser)

    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
}

export default service_routes