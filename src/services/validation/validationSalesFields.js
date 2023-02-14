const schemas = require('./schemas');
const handleErrorMessages = require('../../utils/handleErrorMessages');

const validateSalesFields = (sales) => {
  const resultArray = sales.map((sale) => {
    const { error } = schemas.salesProductsSchema.validate(sale);
    return error;
  });

  const [firstError] = resultArray.filter((error) => error);

  if (firstError) {
    return {
      type: handleErrorMessages.typeErrorReplace(firstError),
      result: { message: handleErrorMessages.errorMessage(firstError) },
    };
  }
  return { type: null, result: '' };
};

module.exports = {
  validateSalesFields,
};