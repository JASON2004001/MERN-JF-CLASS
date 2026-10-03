import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export function connectDB() {
    mongoose
        .connect(process.env.MONGO_DB_URI)
        .then(() => console.log("DB connected"))
        .catch((err) => console.log(err));
}

connectDB();