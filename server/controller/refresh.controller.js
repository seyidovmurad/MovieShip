const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.handleRefreshToken = async(req, res) => {
    const cookies = req.cookies;

    if(!cookies.jwt) 
        return res.status(401).send(); // Unauthorised
    
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    let foundUser;
    try {
        foundUser = await User.findOne({refreshToken});
    }catch (error){
        console.log("line 17", error);
       return res.status(502).send();
    }
    //reused refresh token
    if(!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_KEY,
            async (err, decoded) => {
                if(err) 
                    return res.status(403).send();//Forbidden
                
                try {
                    const hackedUser = await User.findOne({ username: decoded.username }).exec();
                    hackedUser.refresh = []
                    await hackedUser.save();
                }
                catch {
                    console.log("line 35");
                    return res.status(502).send();
                }
            }
        );
        return res.status(403).send();; //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        async(err, decoded) => {

            if(err) {
                //expired refresh token
                try {
                    foundUser.refreshToken = [...newRefreshTokenArray];
                    await foundUser.save();
                }
                catch {
                    console.log("line 57");
                    return res.status(502).send();
                }
            }

            if(err || foundUser.username !== decoded.username)
                return res.status(403).send();;//Forbidden

            const accessToken = jwt.sign(
                {
                   UserInfo: {
                        username: decoded.username,
                        role: decoded.role
                   }
                },
                process.env.TOKEN_KEY,
                { expiresIn: '15m'}
            );

            const newRefreshToken = jwt.sign(
                { username: foundUser.username },
                process.env.REFRESH_TOKEN_KEY,
                { expiresIn: '30d' }
            );
            try {
                foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken]
                await foundUser.save();
            }
            catch {
                console.log("line 86");
                return res.status(502).send();
            }

            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000 });

            res.send({ accessToken, user: { username: foundUser.username, role: foundUser.role, foundUser: foundUser.email } });
        }
    )
}
