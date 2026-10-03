import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./connectDB/connectDB.js";
import userRouter from "../src/routes/user.route.js";
import productRoute from "./routes/product.route.js";

dotenv.config({
    path: "./.env",
});

const app = express();

app.disable("x-powered-by");

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cookieParser());

app.use("/api/v1/products", productRoute);
app.use("/api/v1/user", userRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});