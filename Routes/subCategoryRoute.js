const { createSubCategory, listSubCategory, findSubCategory, deleteSubCategory, updateSubCategory } = require('../Controllers/SubCategory/subCategoryController');



const router = require('express').Router();

//create a new user
router.post('/create', createSubCategory)
//users list
router.get('/list', listSubCategory)
//users list
router.get('/single/:id', findSubCategory)
//Delete user
router.delete('/delete/:id', deleteSubCategory)
//Update user
router.put('/update/:id', updateSubCategory)


module.exports = router