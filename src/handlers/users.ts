import express, { Request, Response } from 'express'

import { User } from "../models/user"
import { UserStore } from "../models/user"
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'
import { verifyAuthToken } from '../auth/auth'

dotenv.config()
const {TOKEN_SECRET} = process.env

export const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const user = await store.index();
        res.json(user);
    } catch (error) {
        res.status(401).json({ error });
    }
};
    
const show = async (req: Request, res: Response) => {
    try {
        const user = await store.showUserById(parseInt(req.params.id));
        res.json(user);
    } catch (error) {
        res.status(401).json({ error });
        }
    };
    
const create = async (req: Request, res: Response) => {
    try {
    const user: User = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    };
    const newUser = await store.create(user);
    let token = jwt.sign({user: newUser}, TOKEN_SECRET as Secret)
    res.json(token);
    } catch (error) {
        res.status(401).json({ error });
    }
};

const users_routes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)

}

export default users_routes
