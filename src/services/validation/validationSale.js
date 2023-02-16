const validate = require('./validationSalesFields');
const productsService = require('../productsService');

const validationSale = async (sale) => {
  const error = validate.validateSalesFields(sale);
  if (error.type) {
    return error;
  }

  const resultArrayProducts = await Promise.all(sale
    .map(async (productSale) => productsService.findById(productSale.productId)));

  const productNotFound = resultArrayProducts.find((product) => product.type);

  if (productNotFound) {
    return productNotFound;
  }
  
  return { type: null, result: '' };
};

module.exports = {
  validationSale,
};
