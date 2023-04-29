import { Request, Response, NextFunction } from "express";
import { sessions } from "../..";
import { UserNotAuthenticated } from "../errors/UserNotAuthenticated";

const sessionChecker = (req: Request, res: Response, next: NextFunction) => {    
    const sessionId = req.headers.authorization?.replace('Bearer ', '');

    if (!sessionId || !sessions[sessionId] || sessions[sessionId].expiresAt < Date.now()) {
        if (sessions[sessionId]?.expiresAt < Date.now()) {
            delete sessions[sessionId];
        }
        throw new UserNotAuthenticated();
    }

    next();
};

export default sessionChecker;