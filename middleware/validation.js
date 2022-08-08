import Joi from "joi";

export const createUserValidation = (req, res, next) => {
  const userSchema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    shopName: Joi.string().required(),
    password: Joi.string().min(4).required(),
  });
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(400).send({
      message: "Something went wrong",
      data: result.error.details[0].message,
    });
  }
  next();
};

export const productSchema = Joi.object({
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  unitPrice: Joi.number().required(),
  status: Joi.string().required(),
  category: Joi.string().required(),
});
