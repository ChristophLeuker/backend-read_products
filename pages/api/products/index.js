import dbConnect from "../../../db/connect.js";
import Product from "../../../db/models/Products";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const product = await Product.find();

    return response.status(200).json(product);
  }
  return <div>NOO!!!!</div>;
}
