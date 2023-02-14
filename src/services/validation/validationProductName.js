const schemas = require('./schemas');

const typeErrorReplace = (error) => error.details[0].type.toUpperCase().replace('.', '_');

const errorMessage = (error) => error.details[0].message;

const validateProductName = (productName) => {
  const { error } = schemas.productNameSchema.validate(productName);
  if (error) {
    return {
      type: typeErrorReplace(error),
      result: { message: errorMessage(error) },
    };
  }
  return { type: null, result: '' };
};

module.exports = {
  validateProductName,
};
