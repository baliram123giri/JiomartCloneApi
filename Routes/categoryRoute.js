const { createCategory, listCategory, findCategory, deleteCategory, updateCategory } = require('../Controllers/Category/categoryController');


const router = require('express').Router();

//create a new user
router.post('/create', createCategory)
//users list
router.get('/list', listCategory)
//users list
router.get('/single/:id', findCategory)
//Delete user
router.delete('/delete/:id', deleteCategory)
//Update user
router.put('/update/:id', updateCategory)


module.exports = router