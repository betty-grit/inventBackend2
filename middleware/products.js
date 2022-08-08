import Products from "../models/Products.js";
import { productSchema } from "./validation.js";

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).send({
      error,
    });
  }
  next();
};

export const checkProduct = async (req, res, next) => {
  const product = await Products.findOne({
    id: req.params.id,
  });
  if (!product) {
    return res.status(404).send({
      message: "product not found",
      data: null,
    });
  }
  req.product = product;
  next();
};
