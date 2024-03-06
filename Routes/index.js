const router = require('express').Router();

// user
router.use('/user', require("./userRoute"))

// Addresses
router.use('/address', require("./addressRoute"))

module.exports = router