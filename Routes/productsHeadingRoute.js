const { createProductDetailsHeading, listProductDetailsHeading, findProductDetailsHeading, deleteProductDetailsHeading, updateProductDetailsHeading } = require('../Controllers/Products/ProductDetailsHeading/ProductHeadingController');

const router = require('express').Router();

//create a new ProductDetailsHeading
router.post('/create', createProductDetailsHeading)
//ProductDetailsHeadings list
router.get('/list', listProductDetailsHeading)
//ProductDetailsHeadings list
router.get('/single/:id', findProductDetailsHeading)
//Delete ProductDetailsHeading
router.delete('/delete/:id', deleteProductDetailsHeading)
//Update ProductDetailsHeading
router.put('/update/:id', updateProductDetailsHeading)


module.exports = router