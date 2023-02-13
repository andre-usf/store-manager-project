const productsService = require('../services/productsService');

const listAllProducts = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.findById(id);
  return res.status(200).json(product);
};

module.exports = {
  listAllProducts,
  listProductById,
};
