import { NextFunction, Request, Response } from 'express';
import { DependencyContainer } from '../dependency-container';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    // const { redisService } = DependencyContainer.getInstance();
    const session = 'a'//req.headers["x-auth-token"] as string;

    if (!session) {
        return res.status(403).send("A token is required for authentication");
    }
    // const key = await redisService.getKey(session)
    // if (!key) {
    //     return res.status(401).send("Invalid tinder session token.");
    // }
    // req.body.userId = key;
    next();
};
