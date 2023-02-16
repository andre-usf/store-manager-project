const schemas = require('./schemas');
const handleErrorMessages = require('../../utils/handleErrorMessages');

const validateSalesFields = (sale) => {
  const resultArray = sale.map((productSale) => {
    const { error } = schemas.salesProductsSchema.validate(productSale);
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