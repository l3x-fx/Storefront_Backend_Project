import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

dotenv.config();
const { TOKEN_SECRET } = process.env;

export const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized, token missing" });
    }
    let authenticatedUser: JwtPayload | undefined;
    try {
      authenticatedUser = jwt.verify(token.split(" ")[1], TOKEN_SECRET as Secret) as JwtPayload;
    } catch (verificationError) {
      return res.status(403).json({ error: "Access denied, token invalid" });
    }

    const requestedUserId = parseInt(req.params.userId);

    // @ts-ignore
    if ((requestedUserId as number) !== authenticatedUser.user.id) {
      return res.status(403).json({ error: "Access denied, not authorized" });
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "Access denied, not authorized" });
  }
};
