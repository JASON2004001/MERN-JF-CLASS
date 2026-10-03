import express from "express";

import { createProduct, getProductById, getProducts } from "../controllers/product.controller.js";

import { verifyJwt, checkRole } from "../middleware/verifyJWT.js";

const router = express.Router();

router.route("/create-product").post(verifyJwt,checkRole,createProduct);
router.route("/get-products").get(getProducts);
router.route("/get-product/:productId").get(getProductById);


export default router;