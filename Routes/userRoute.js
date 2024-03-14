const { createUser, listUser, deleteUser, updateUser, findUser } = require('../Controllers/User/userController');

const router = require('express').Router();

//create a new user
router.post('/create', createUser)
//users list
router.get('/list', listUser)
//users list
router.get('/single/:id', findUser)
//Delete user
router.delete('/delete/:id', deleteUser)
//Update user
router.put('/update/:id', updateUser)


module.exports = router