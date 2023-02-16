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

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, result: sales };
};

const getSaleById = async (id) => {
  const sale = await salesModel.getSaleById(id);
  if (sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', result: { message: 'Sale not found' } };
  }
  return { type: null, result: sale };
};

const deleteSale = async (saleId) => {
  const error = await getSaleById(saleId);
  if (error.type) return error;

  const result = await salesModel.deleteSale(saleId);
  return { type: null, result };
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  deleteSale,
};
