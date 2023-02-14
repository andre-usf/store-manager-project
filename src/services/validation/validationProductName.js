const schemas = require('./schemas');

const typeErrorReplace = (error) => error.details[0].type.toUpperCase().replace('.', '_');

const validateProductName = (productName) => {
  const { error } = schemas.productNameSchema.validate(productName);
  if (error) {
    return {
      type: typeErrorReplace(error),
      result: { message: error.details[0].message },
    };
  }
  return { type: null, result: '' };
};

module.exports = {
  validateProductName,
};
