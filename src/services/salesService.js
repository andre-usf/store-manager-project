const salesModel = require('../models/salesModel');
/* const validation = require('./validation/validationSalesFields'); */

const createSales = async (sales) => {
  /* const error = validation.validateSalesFields(sales);
  if (error.type) return error; */
  
  const saleId = await salesModel.insertSales();
  
  await Promise.all(sales.map(async (sale) => salesModel.insertProductSale(saleId, sale)));

  return { type: null, result: saleId };
};

module.exports = {
  createSales,
};
