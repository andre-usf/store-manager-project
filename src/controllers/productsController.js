const productsService = require('../services/productsService');
const errorMap = require('../utils/errorMap');

const listAllProducts = async (_req, res) => {
  const { result } = await productsService.getAll();
  
  return res.status(200).json(result);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await productsService.findById(id);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);

  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, result } = await productsService.createProduct(name);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(201).json({ name, id: result });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, result } = await productsService.updateProduct(name, id);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(200).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await productsService.deleteProduct(id);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(204).end();
};

const searchProductByQuery = async (req, res) => { 
  const { q } = req.query;
  const { type, result } = await productsService.searchProductByQuery(q);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(200).json(result);
};

module.exports = {
  listAllProducts,
  listProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductByQuery,
};
