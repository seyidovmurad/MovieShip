const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');


exports.login = async (req, res) => {
    const cookies = req.cookies;

    //find user
    let user;
    try {
        user = await User.findOne({ username: req.body.username.trim() })
        if(!user) 
            return res.status(401).send({ message: "Wrong Username or Password" });//Unauthorized
        else if(user.role !== "admin") 
            return res.status(403).send()

    }
    catch {
        console.log("User failed Line: 18/auth.controller");
        return res.status(502).send();
    }

   
    //compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match) {
        const accessToken = jwt.sign(
            {
                UserInfo: {
                username: user.username,
                role: user.role
                },
            },
            process.env.TOKEN_KEY,
            { expiresIn: "15m" }
        );

        const newRefreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: "30d" }
        );

        let newRefreshTokenArray =
            !cookies?.jwt
                ? user.refreshToken
                : user.refreshToken.filter(rt => rt !== cookies.jwt);
        try {
            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await User.findOne({ refreshToken }).exec();

                // Detected refresh token reuse!
                if (!foundToken) {
                    // clear out ALL previous refresh tokens
                    newRefreshTokenArray = [];
                }
        

                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            }
        }
        catch {
            console.log("User failed Line: 63/auth.controller");
            return res.status(502).send();
        }
 
        // Saving refreshToken with current user
        user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        try {
            await user.save();
        }
        catch {
            console.log("User failed Line: 73/auth.controller");
            return res.status(502).send();
        }

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000 }); //30day

        // Send authorization roles and access token to user
        res.send({ accessToken, user: { username: user.username, role: user.role, email: user.email } });

    } else {
        return res.status(401).send();
    }
}


// exports.userLogin = async (req, res) => {
  
//     //find user
//     const user = await User.findOne({ username: req.body.username })
//     if(!user) 
//         return res.status(403)
//                   .send({ success: false, error: "Wrong Username or Password" });

//     //compare password
//     const passCorrect = await bcrypt.compare(req.body.password, user.password);
//     if(!passCorrect)
//         return res.status(403)
//                   .send({ success: false, error: "Wrong Uername or Password" });

    
//     const token = jwt.sign({
//         id: user._id,
//         role: user.role
//     }, process.env.TOKEN_KEY, {expiresIn: "15m"});

//     const send = {
//         token,
//         username: user.username,
//         email: user.email,
//         fName: user.fullname
//     }
//     res.send({success: true, user: send });
// }


// exports.userRegister = async (req, res) => {

//     //check user email and username exist
//     const emailExist = await User.findOne({ email: req.body.email }); 
    
//     if(emailExist) 
//         return res.status(400)
//                   .send({ success: false, error: "Email already exist"});

//     const userExist = await User.findOne({ username: req.body.username });
//     if(userExist) 
//         return res.status(400)
//                   .send({ success: false, error: "Username already exist"});

//     const hashedPass = await bcrypt.hash(req.body.password, 10);
    
//     const user = new User({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         username: req.body.username,
//         password: hashedPass
//     });

//     try {
//         const saved = await user.save()
//         const token = jwt.sign({
//             id: saved._id,
//             role: saved.role
//         }, process.env.TOKEN_KEY, { expiresIn: "15m" });

//         res.send({ success: true, token });
//     } 
//     catch(error) {
//         res.status(500).send({ success: false, error: error.message });
//     }

// }


// exports.adminRegister = async (req, res) => {
    
//     //check user email and username exist
//     const emailExist = await User.findOne({ email: req.body.email }); 
    
//     if(emailExist) 
//         return res.status(400)
//                   .send({ success: false, error: "Email already exist"});

//     const userExist = await User.findOne({ username: req.body.username });
//     if(userExist) 
//         return res.status(400)
//                   .send({ success: false, error: "Usename already exist"});

//     const hashedPass = await bcrypt.hash(req.body.password, 10);
    
//     const user = new User({
//         fullname: req.body.fullname,
//         email: req.body.email,
//         username: req.body.username,
//         password: hashedPass,
//         role: "admin"
//     });

//     try {
//         const saved = await user.save()
//         const token = jwt.sign({
//             id: saved._id,
//             role: saved.role
//         }, process.env.TOKEN_KEY, { expiresIn: "15m" });

//         res.send({ success: true, token });
//     } 
//     catch(error) {
//         res.status(500).send({ success: false, error: error.message });
//     }

// }