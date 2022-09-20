const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middleware/validation');

const AuthController = require('../controller/auth.controller');


router.post('/login', loginValidation, AuthController.login);


 module.exports = router;