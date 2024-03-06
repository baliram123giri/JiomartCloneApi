const { createAddress, listAddress } = require('../Controllers/Address/addressController');


const router = require('express').Router();

//create a new user
router.post('/create', createAddress)
//users list
router.get('/list', listAddress)


module.exports = router