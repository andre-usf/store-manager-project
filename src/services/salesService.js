const salesModel = require('../models/salesModel');
const validation = require('./validation/validationSale');

const createSales = async (sale) => {
  const error = await validation.validationSale(sale);
  if (error.type) return error;

  const saleId = await salesModel.insertSales();
  
  await Promise.all(sale.map(async (productSale) => salesModel
    .insertProductSale(saleId, productSale)));

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

const updateSale = async (saleId, sale) => {
  const error = await validation.validationSale(sale);
  if (error.type) return error;

  const errorSaleId = await getSaleById(saleId);
  if (errorSaleId.type) return errorSaleId;

  await deleteSale(saleId);

  await Promise.all(sale.map(async (productSale) => salesModel
    .insertProductSale(saleId, productSale)));

  return { type: null, result: saleId };
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
