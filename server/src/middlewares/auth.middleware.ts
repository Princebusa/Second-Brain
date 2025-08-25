import type { NextFunction, Response, Request } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { UserModel } from "../models/userModel.js"

export interface AuthRequest extends Request {
  userId?: string
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {

    const token = req.cookies?.token || req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & string
        req.userId  = decoded._id
        return next()

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}