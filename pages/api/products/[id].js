import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/Products";

export default async function handler(request, response) {
  const { id } = request.query;

  const product = await Product.findById(id);

  if (!product) {
    return response.status(404).json({ status: "Not Found" });
  }

  response.status(200).json(product);
}
