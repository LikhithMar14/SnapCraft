import { Request, Response, NextFunction } from 'express';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email?: string;
        name?: string;
        picture?: string;
    };
}

async function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            error: "Access denied. No token provided.",
            message: "Please provide a valid token in the Authorization header.",
        });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                error: "Access denied. Invalid token payload.",
                message: "The token could not be verified properly.",
            });
        }

        req.user = {
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
        };

        req.headers['x-user-id'] = payload.sub;
        req.headers['x-user-email'] = payload.email;
        req.headers['x-user-name'] = payload.name;
        req.headers['x-user-picture'] = payload.picture;

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(401).json({
            error: "Access denied. Invalid token.",
            message: "Please provide a valid token in the Authorization header.",
        });
    }
}

export default authMiddleware;
