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

module.exports = router