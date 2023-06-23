import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import jwt,{Secret} from 'jsonwebtoken'

dotenv.config()
const {TOKEN_SECRET} = process.env

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
