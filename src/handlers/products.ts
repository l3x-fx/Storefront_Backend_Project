import express, { Request, Response } from 'express'
import { Product } from "../models/product"
import { ProductStore } from '../models/product'
import { verifyAuthToken } from '../auth/auth'

export const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try{
        const product = await store.index()
        res.json(product)
    } catch (error) 
    {
        res.status(401).json({ error });
    }
}

const showProductById = async (req: Request, res: Response) => {
    try {
        const product = await store.showProductById(parseInt(req.params.id))
        res.json(product)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const createProduct = async (req: Request, res: Response) => { 
    try{
        const product: Product = { 
            name: req.body.name, 
            price: req.body.price, 
            category: req.body.category 
        } 
        const newProduct = await store.createNewProduct(product) 
        res.json(newProduct)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const showProductByCategory = async (req: Request, res: Response) => {
    try {
        const product = await store.showProductByCategory(req.params.category)
        res.json(product)
    } catch (error) 
    {
        res.status(401).json({ error });
    }
}


const showTopFiveProducts= async (_req: Request, res:Response) => {
    try {
        const topFive = await store.showTopFiveProducts()
        res.json(topFive)
    }catch (error) 
    {
        res.status(401).json({ error });
    }
}
const users_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', showProductById)
    app.post('/products', verifyAuthToken,  createProduct)
    app.get('/products/stats/topFive', showTopFiveProducts)
    app.get('/products/category/:category', showProductByCategory)
}

export default users_routes
