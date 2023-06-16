import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Review = mongoose.models.Review || model("Review", productSchema);

export default Review;
