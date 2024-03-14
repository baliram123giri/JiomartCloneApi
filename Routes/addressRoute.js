const { createAddress, listAddress, deleteAddress, findAddress, updateAddress } = require('../Controllers/Address/addressController');


const router = require('express').Router();

//create a new user
router.post('/create', createAddress)
//address list
router.get('/list', listAddress)
//address find
router.get('/single/:id', findAddress)
//address delete
router.delete('/delete/:id', deleteAddress)
//Update user
router.put('/update/:id', updateAddress)

module.exports = router