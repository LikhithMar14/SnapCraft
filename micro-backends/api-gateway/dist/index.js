"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, '/api');
    },
    proxyErrorHandler: (err, res) => {
        res.status(500).json({
            message: "Error in API Gateway",
            error: err.message,
        });
    },
};
app.use('/v1/media', auth_middleware_1.default, (0, express_http_proxy_1.default)(process.env.UPLOAD_SERVICE_URL, Object.assign(Object.assign({}, proxyOptions), { parseReqBody: false })));
app.use('/v1/design', auth_middleware_1.default, (0, express_http_proxy_1.default)(process.env.DESIGN_SERVICE_URL, Object.assign({}, proxyOptions)));
app.use('/v1/subscription', auth_middleware_1.default, (0, express_http_proxy_1.default)(process.env.SUBSCRIPTION_SERVICE_URL, Object.assign({}, proxyOptions)));
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
    console.log(`Design service is running on ${process.env.DESIGN_SERVICE_URL}`);
    console.log(`Subscription service is running on ${process.env.SUBSCRIPTION_SERVICE_URL}`);
    console.log(`Upload service is running on ${process.env.UPLOAD_SERVICE_URL}`);
});
