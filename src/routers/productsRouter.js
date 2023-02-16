const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.listProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
