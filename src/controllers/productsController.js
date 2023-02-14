const productsService = require('../services/productsService');

const listAllProducts = async (_req, res) => {
  const { type, result } = await productsService.getAll();
  if (type) return res.status(404).json(result);
  return res.status(200).json(result);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await productsService.findById(id);
  if (type) return res.status(404).json(result);
  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { result } = await productsService.createProduct(name);
  return res.status(201).json({ name, id: result });
};

module.exports = {
  listAllProducts,
  listProductById,
  createProduct,
};
