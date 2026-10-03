import {Schema, model} from "mongoose";

const productSchema = new Schema({
    sku:{
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
},{timestamps: true,});

export const Product = model("Product", productSchema);