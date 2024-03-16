const { createSubChildCategory, listsubChildCategory, findsubChildCategory, deleteSubChildCategory, updateSubChildCategory } = require('../Controllers/SubChildCategory/subChildCategoryController');




const router = require('express').Router();

//create a new user
router.post('/create/:subcategory_id', createSubChildCategory)
//users list
router.get('/list', listsubChildCategory)
//users list
router.get('/single/:id', findsubChildCategory)
//Delete user
router.delete('/delete/:id', deleteSubChildCategory)
//Update user
router.put('/update/:id', updateSubChildCategory)


module.exports = router