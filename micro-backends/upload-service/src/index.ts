import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8002;


mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function startServer() {
  try{
    app.listen(PORT, () => {
      console.log(`Upload service is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting server", error);
    process.exit(1);
  }
}

startServer();