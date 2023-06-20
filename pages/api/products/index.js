import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/Products";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const product = await Product.find();

    response.status(200).json(product);
  }

  if (request.method === "POST") {
    try {
      const productData = request.body;
      await Product.create(productData);

      response.status(201).json({ status: "product createt" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
