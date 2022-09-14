const router = require('express').Router();
const { loginValidation, registerValidation } = require('../middleware/validation');

const AuthController = require('../controller/auth.controller');

router.post('/login', loginValidation, AuthController.userLogin);

router.post('/register', registerValidation, AuthController.userRegister);

router.post('/admin/login', loginValidation, AuthController.adminLogin);

router.post('/admin/register', registerValidation, AuthController.adminRegister);

 module.exports = router;