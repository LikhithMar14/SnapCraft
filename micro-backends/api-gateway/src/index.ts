import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import proxy from "express-http-proxy";
import authMiddleware from "./middleware/auth.middleware";
dotenv.config();



const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const proxyOptions = {
    proxyReqPathResolver:(req:Request) => {
        return req.originalUrl.replace(/^\/v1/, '/api');
    },
    proxyErrorHandler: (err: any, res: Response) => {
        res.status(500).json({
            message: "Error in API Gateway",
            error: err.message,
        });
    },
};

app.use('/v1/media',authMiddleware,proxy(process.env.UPLOAD_SERVICE_URL!,{
    ...proxyOptions,
    parseReqBody: false, 
}));
app.use('/v1/design',authMiddleware,proxy(process.env.DESIGN_SERVICE_URL!,{
    ...proxyOptions,
}));
app.use('/v1/subscription',authMiddleware,proxy(process.env.SUBSCRIPTION_SERVICE_URL!,{
    ...proxyOptions,
}));

app.listen(PORT,()=>{
    console.log(`API Gateway is running on port ${PORT}`);
    console.log(`Design service is running on ${process.env.DESIGN_SERVICE_URL}`);
    console.log(`Subscription service is running on ${process.env.SUBSCRIPTION_SERVICE_URL}`);
    console.log(`Upload service is running on ${process.env.UPLOAD_SERVICE_URL}`);
});
