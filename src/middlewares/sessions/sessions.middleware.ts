import { Request, Response, NextFunction } from "express";
import { UserNotAuthenticated } from "../errors/UserNotAuthenticated";
import { Sessions } from "../../Sessions";

const sessionChecker = (req: Request, res: Response, next: NextFunction) => {    
    const sessionId = req.headers.authorization?.replace('Bearer ', '');

    const session = Sessions.getInstance().getSessionById(sessionId)

    if (!sessionId || !session || session.expiresAt < Date.now()) {
        if (session?.expiresAt < Date.now()) {
            Sessions.getInstance().deleteSessionById(sessionId)
        }
        throw new UserNotAuthenticated();
    }

    next();
};

export default sessionChecker;