import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
});

const Product = mongoose.models.Product || model("Product", productSchema);

export default Product;
