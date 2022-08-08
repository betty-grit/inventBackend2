import Products from "../models/Products.js";
import { User } from "../models/User.js";

export const addProduct = async (req, res) => {
  const { id, ...productObject } = req.body;
  // const user = await User.findById(id);
  const addedProduct = await User.updateOne(
    { _id: id },
    { $push: { products: { productId: req.id, ...productObject } } }
  );
  return res.status(200).send({
    message: "Product added",
    data: productObject,
  });
};

export const getAllUserProducts = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  const products = user.products;
  return res.status(200).send({
    message: "User products retrieved",
    data: products,
  });
};

export const getSingleProduct = (req, res) => {
  res.status(200).send({
    message: " single product found successfully",
    data: req.product,
  });
};

export const deleteSingleProduct = async (req, res) => {
  const id = req.params.id;
  const newProduct = await Products.findByIdAndDelete(id);
  return res.status(200).send({
    message: "product deleted in store",
    data: newProduct,
  });
};
