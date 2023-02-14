const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.listProductById);

module.exports = router;
