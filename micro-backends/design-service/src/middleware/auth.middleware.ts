import { NextFunction, Request, Response } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["x-user-id"] as string;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  req.user = { userId: token };
  next(); 
};
