const Joi = require('joi');

const productNameSchema = Joi.string().min(5).required().messages({
  'string.min': '"name" length must be at least {#limit} characters long',
  'any.required': '"name" is required',
});

module.exports = {
  productNameSchema,
};
