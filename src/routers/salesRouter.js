const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.createSales);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', salesController.updateSale);

module.exports = router;
