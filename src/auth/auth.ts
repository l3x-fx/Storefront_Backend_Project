import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyJwtToken = (authorizationHeader: string | undefined): string | JwtPayload => {
  const token: string | undefined = authorizationHeader?.split(" ")[1];
  return jwt.verify(token as string, TOKEN_SECRET as Secret);
};

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    verifyJwtToken(req.headers.authorization);
    next();
  } catch (error) {
    res.status(401);
    res.json("Access denied, invalid token");
  }
};

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedAndVerifiedToken = verifyJwtToken(req.headers.authorization);
    const requestedUserId = req.params.userId;
    // @ts-ignore
    if (requestedUserId !== decodedAndVerifiedToken.user.id) {
      res.status(403).json({ error: "Access denied, not authorized" });
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Access denied, not authorized" });
  }
};
