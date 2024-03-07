const { createPancard, listPancard, deletePancard } = require('../Controllers/Pancard/pancardController');


const router = require('express').Router();

//create a new user
router.post('/create', createPancard)
//users list
router.get('/list', listPancard)
//Delete user
router.delete('/delete/:id', deletePancard)


module.exports = router