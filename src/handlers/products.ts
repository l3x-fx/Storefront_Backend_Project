import express, { Request, Response, NextFunction } from 'express'

import { Product } from "../models/product"
import { ProductStore } from '../models/product'
import dotenv from 'dotenv'
import { ServiceStore } from '../services/services'
import verifyAuthToken from './servicehandler'

dotenv.config()
const {TOKEN_SECRET} = process.env

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

const users_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', showById)
    app.post('/products', verifyAuthToken,  create)
    app.get('/products/category/:category', showByCategory)
}

export default users_routes
