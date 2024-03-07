const router = require('express').Router();

// user
router.use('/user', require("./userRoute"))

// Addresses
router.use('/address', require("./addressRoute"))

// pancards
router.use('/pancard', require("./pancardRoute"))

module.exports = router