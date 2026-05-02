import {NextFunction, Request, Response} from "express"
import {HydratedDocument} from "mongoose";
import {UserFields} from "../types";
import User from "../models/User";
import jwt, {TokenExpiredError} from "jsonwebtoken";
import config from "../config";

export interface RequestWithUser extends Request {
    user: HydratedDocument<UserFields>;
}

const auth = async (expressReq: Request, res: Response, next: NextFunction) => {
    try {
        const req = expressReq as RequestWithUser;

        let jwtToken = req.cookies.accessToken;

        if (!jwtToken) {
            const authHeader = req.get('Authorization');
            if (authHeader && authHeader.startsWith('Bearer ')) {
                jwtToken = authHeader.split(' ')[1];
            }
        }

        if (!jwtToken) return res.status(401).send('No access token present')


        const decoded = jwt.verify(jwtToken, config.jwtSecret) as { _id: string };

        const user = await User.findOne({_id: decoded._id});
        if (!user) return res.status(401).send({error: "Invalid or expired access token"});


        req.user = user;
        next();
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            return res.status(401).send({error: 'Your token expired'});
        } else {
            res.status(401).send({error: 'Please authenticate.Invalid access token'})

        }
    }


}

export default auth;