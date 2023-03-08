const salesService = require('../services/salesService');
const errorMap = require('../utils/errorMap');

const createSales = async (req, res) => {
  const sale = req.body;
  const { type, result } = await salesService.createSales(sale);
 
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(201).json({ id: result, itemsSold: req.body });
};

const getAllSales = async (_req, res) => {
  const { result } = await salesService.getAllSales();
  
  return res.status(200).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await salesService.getSaleById(id);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(200).json(result);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, result } = await salesService.deleteSale(id);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(204).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  
  const { type, result } = await salesService.updateSale(id, sale);
  
  if (type) return res.status(errorMap.mapError(type)).json(result);
  
  return res.status(200).json({ saleId: result, itemsUpdated: req.body });
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById,
  deleteSale,
  updateSale,
};
