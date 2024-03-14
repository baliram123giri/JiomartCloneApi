const { loginUser } = require('../Controllers/User/userController');



const router = require('express').Router();

//login  user
router.post('/login', loginUser)


module.exports = router