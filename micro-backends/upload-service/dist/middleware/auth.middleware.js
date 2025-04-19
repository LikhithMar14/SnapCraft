"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authMiddleware = (req, res, next) => {
    const token = req.headers["x-user-id"];
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    req.user = { userId: token };
    next();
};
exports.authMiddleware = authMiddleware;
