import { Product } from "../models/product.model.js";

const generateSKU = async (category) => {
  //count how many product is already present in the product category
  const count = await Product.countDocuments({ category: category });

  return `${category.toUpperCase()}-${String(count + 1).padStart(4, "0")}`;
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isProductAlreadyExists = await Product.findOne({
      name,
      description,
    });

    if (isProductAlreadyExists) {
      return res.status(400).json({
        message: "Product already exists",
      });
    }

    const sku = await generateSKU(category);

    const product = await Product.create({
      sku,
      name,
      description,
      price,
      category,
    });
    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products fetch Successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product Id is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product fetch Successfully", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { getProducts, createProduct, getProductById };
