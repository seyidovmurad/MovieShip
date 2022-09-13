const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { loginValidation, registerValidation } = require('../middleware/validation');

const User = require('../models/user.model');


router.post('/login', loginValidation, async (req, res) => {
  
    //find user
    const user = await User.findOne({ username: req.body.username })
    if(!user) 
        return res.status(403)
                  .send({ success: false, error: "Wrong username of password" });

    console.log(req.body);
    //compare password
    const passCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!passCorrect)
        return res.status(403)
                  .send({ success: false, error: "Wrong username of password" });

    
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.TOKEN_KEY, {expiresIn: "15m"});

    const send = {
        token,
        username: user.username,
        email: user.email,
        fName: user.fullname
    }
    res.send({success: true, user: send });
});


router.post('/register', registerValidation, async (req, res) => {

    //check user email and username exist
    const emailExist = await User.findOne({ email: req.body.email }); 
    if(!emailExist) 
        return res.status(400)
                  .send({ success: false, error: "Email already exist"});

    const userExist = await User.findOne({ username: req.body.username });
    if(!userExist) 
        return res.status(400)
                  .send({ success: false, error: "Usename already exist"});

    const hashedPass = await bcrypt.hash(req.body.password, 10);
    
    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: hashedPass
    });

    try {
        const saved = await user.save()
        const token = jwt.sign({
            id: saved._id,
            role: saved.role
        }, process.env.TOKEN_KEY, { expiresIn: "15m" });

        res.send({ success: true, token });
    } 
    catch(error) {
        res.status(500).send({ success: false, error: error.message });
    }

});

 module.exports = router;