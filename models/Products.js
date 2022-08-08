import mongoose from "mongoose";
const { model, Schema } = mongoose;

const productsSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Products", productsSchema);
