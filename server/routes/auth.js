const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middleware/validation');

const AuthController = require('../controller/auth.controller');


router.post('/login', loginValidation, AuthController.login);
router.post('/client/login', loginValidation, AuthController.clientLogin);
router.post('/register', registerValidation, AuthController.register);


 module.exports = router;