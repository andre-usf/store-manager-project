const salesModel = require('../models/salesModel');
const validation = require('./validation/validationSalesFields');
const productsService = require('./productsService');

const createSales = async (sales) => {
  const error = validation.validateSalesFields(sales);
  if (error.type) {
    return error;
  } 
  
  const resultArrayProducts = await Promise.all(sales
    .map(async (sale) => productsService.findById(sale.productId)));
  
  const productNotFound = resultArrayProducts.find((product) => product.type);

  if (productNotFound) {
    return productNotFound;
  }

  const saleId = await salesModel.insertSales();
  
  await Promise.all(sales.map(async (sale) => salesModel.insertProductSale(saleId, sale)));

  return { type: null, result: saleId };
};

module.exports = {
  createSales,
};
