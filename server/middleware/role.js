
function admin(req, res, next) {
    if(req.user.UserInfo.role != "admin") return res.status(403).send({
        message: "Access denied."
    });

    next();
}

function user(req, res, next) {
    if(req.user.UserInfo.role != "user") return res.status(403).send({
        message: "Access denied."
    });

    next();
}

module.exports = { admin, user }