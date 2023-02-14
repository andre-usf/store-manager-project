const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, result: products };
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  if (!product) {
    return { type: 'PRODUCT_NOT_FOUND', result: { message: 'Product not found' } };
  }
  return { type: null, result: product };
};

const createProduct = async (productName) => {
  const insertId = await productsModel.insert(productName);
  return { type: null, result: insertId };
};

module.exports = {
  getAll,
  findById,
  createProduct,
};
