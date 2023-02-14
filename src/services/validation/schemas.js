const Joi = require('joi');

const productNameSchema = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least {#limit} characters long',
});

module.exports = {
  productNameSchema,
};
