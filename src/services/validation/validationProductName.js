const schemas = require('./schemas');
const handleErrorMessages = require('../../utils/handleErrorMessages');

const validateProductName = (productName) => {
  const { error } = schemas.productNameSchema.validate(productName);
  if (error) {
    return {
      type: handleErrorMessages.typeErrorReplace(error),
      result: { message: handleErrorMessages.errorMessage(error) },
    };
  }
  return { type: null, result: '' };
};

module.exports = {
  validateProductName,
};
