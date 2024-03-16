const { authorization } = require('../utils/auth');

const router = require('express').Router();

//auths
router.use('/auth', require("./authRoute"))

//user
router.use('/user', require("./userRoute"))

// Addresses
router.use('/address', require("./addressRoute"))

// pancards
router.use('/pancard', require("./pancardRoute"))

// Categories
router.use('/category', require("./categoryRoute"))

//Sub Categories
router.use('/sub-category', require("./subCategoryRoute"))

//Sub Child Categories
router.use('/sub-child-category', authorization, require("./subChildCategoryRoute"))

//Pproduct heading
router.use('/product/heading', authorization, require("./productsHeadingRoute"))

//Pproducts
router.use('/product', authorization, require("./productsRoute"))

module.exports = router