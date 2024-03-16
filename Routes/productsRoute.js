
const { listProduct, findProduct, deleteProduct, updateProduct, createProduct } = require('../Controllers/Products/ProductController');

const router = require('express').Router();

//create a new Product
router.post('/create', createProduct)
//Products list
router.get('/list', listProduct)
//Products list
router.get('/single/:id', findProduct)
//Delete Product
router.delete('/delete/:id', deleteProduct)
//Update Product
router.put('/update/:id', updateProduct)


module.exports = router