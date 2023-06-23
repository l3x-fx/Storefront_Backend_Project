import express, { Request, Response } from 'express'
import { Product } from "../models/product"
import { ProductStore } from '../models/product'
import { verifyAuthToken } from '../auth/auth'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    try{
        const product = await store.index()
        res.json(product)
    } catch (error) 
    {
        res.status(401).json({ error });
    }
}

const showById = async (req: Request, res: Response) => {
    try {
        const product = await store.showById(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const create = async (req: Request, res: Response) => { 
    try{
        const product: Product = { name: req.body.name, price: req.body.price, category: req.body.category } 
        const newProduct = await store.create(product) 
        res.json(newProduct)
    } catch (error) {
        res.status(401).json({ error });
    }
}

const showByCategory = async (req: Request, res: Response) => {
    try {
        const product = await store.showByCategory(req.params.category)
        res.json(product)
    } catch (error) 
    {
        res.status(401).json({ error });
    }
}

//map product infos
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
    app.get('/products/:id', showById)
    app.post('/products', verifyAuthToken,  create)
    app.get('/products/stats/topFive', showTopFiveProducts)
    app.get('/products/category/:category', showByCategory)
}

export default users_routes
