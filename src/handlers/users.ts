import express, { Request, Response, NextFunction } from 'express'

import { User } from "../models/user"
import { UserStore } from "../models/user"
import dotenv from 'dotenv'
//import jwt from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const user = await store.index()
    res.json(user)
}

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.body.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => { 
    const user: User = { firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password } 
    const newUser = await store.create(user) 
    res.json(newUser)
}

const users_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    // app.put('/users/:id', verifyAuthToken, update)
    // app.delete('/users/:id', verifyAuthToken, destroy)
}

export default users_routes
