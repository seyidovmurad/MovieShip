const router = require('express').Router();

const auth = require('../middleware/auth');
const { admin, user } = require('../middleware/role');
const { registerValidation } = require('../middleware/validation');

router.get('/', [auth, user], (req, res) => {

    res.send({user: req.user })
});

router.post('/newadmin', [auth, admin, registerValidation], (req, res) => {
    
});


module.exports = router;