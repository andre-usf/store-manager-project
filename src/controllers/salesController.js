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
  return res.status(201).json({ id: result, itemsSold: req.body });
};

module.exports = {
  createSales,
};
