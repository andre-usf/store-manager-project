const productsModel = require('../models/productsModel');
const validation = require('./validation/validationProductName');

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
  const error = validation.validateProductName(productName);
  if (error.type) return error;
  
  const insertId = await productsModel.insert(productName);
  return { type: null, result: insertId };
};

const updateProduct = async (productName, productId) => {
  const error = validation.validateProductName(productName);
  if (error.type) return error;

  const errorId = await findById(productId);
  if (errorId.type) return errorId;

  const result = await productsModel.updateProduct(productName, productId);
  return { type: null, result };
};

const deleteProduct = async (productId) => {
  const error = await findById(productId);
  if (error.type) return error;
  
  const result = await productsModel.deleteProduct(productId);
  return { type: null, result };
 };

module.exports = {
  getAll,
  findById,
  createProduct,
  updateProduct,
  deleteProduct,
};
