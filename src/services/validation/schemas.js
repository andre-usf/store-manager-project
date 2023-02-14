const Joi = require('joi');

const productNameSchema = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least {#limit} characters long',
});

const salesProductsSchema = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}).required();

module.exports = {
  productNameSchema,
  salesProductsSchema,
};
