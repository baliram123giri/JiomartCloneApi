const { createUser, listUser, deleteUser } = require('../Controllers/User/userController');

const router = require('express').Router();

//create a new user
router.post('/create', createUser)
//users list
router.get('/list', listUser)
//Delete user
router.delete('/delete/:id', deleteUser)


module.exports = router