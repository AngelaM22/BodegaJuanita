const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Crear producto
router.post('/', verifyToken(['admin']), productController.createProduct);

// Listar todos
router.get('/', verifyToken(), productController.getProducts);

// Actualizar producto
router.put('/:id', verifyToken(['admin']), productController.updateProduct);

// Eliminar producto
router.delete('/:id', verifyToken(['admin']), productController.deleteProduct);

module.exports = router;
