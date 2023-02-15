const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const sales = req.body;
  const { type, result } = await salesService.createSales(sales);
  if (type === 'ANY_REQUIRED') {
    return res.status(400).json(result);
  }
  if (type === 'NUMBER_MIN') {
    return res.status(422).json(result);
  }
  if (type === 'PRODUCT_NOT_FOUND') {
    return res.status(404).json(result);
  }
  return res.status(201).json({ id: result, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const { type, result } = await salesService.getAllSales();
  if (type) return res.status(404).json(result);
  return res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await salesService.getSaleById(id);
  if (type === 'SALE_NOT_FOUND') return res.status(404).json(result);
  return res.status(200).json(result);
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
};
