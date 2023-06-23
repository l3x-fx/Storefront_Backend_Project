import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import { ServiceStore } from '../services/services'
import jwt,{Secret} from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

const service = new ServiceStore()

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization
        const token:string | undefined = authorizationHeader?.split(' ')[1]
        jwt.verify(token as string, TOKEN_SECRET as Secret)

        next()
    } catch (error) {
        res.status(401) 
        res.json('Access denied, invalid token')
    }
}

const showTopFiveProducts= async (_req: Request, res:Response) => {
    try {
        const topFive = await service.showTopFiveProducts()
        res.json(topFive)
    }catch (error) 
    {
        res.status(401).json({ error });
    }
}

const showRecentOrderByUserId = async (req: Request, res: Response) => {
    try {
        const order = await service.showRecentOrderByUserId(req.params.userId)
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

    app.get('/products/stats/topFive', showTopFiveProducts)
    app.get('/users/:userId/order/recent', showRecentOrderByUserId)
  //  app.get('/users/:userId/orders/complete', showCompletedByUser)

    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
}

export default service_routes