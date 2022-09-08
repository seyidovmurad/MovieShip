const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = req.header('msh-auth-token');

    if(!token) 
        return res.status(403).send({
            success: false,
            error: "Access denied"
        });

    try {
        const decode = jwt.decode(token, process.env.TOKEN_KEY);
        req.user = decode;
    } catch (error) {
        res.status(401).send({
            success: false,
            error: error
        });
    }

    next();
}
