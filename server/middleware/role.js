
function admin(req, res, next) {
    if(req.user.role != "admin") return res.status(403).send({
        success: false,
        error: "Access denied."
    });

    next();
}

function user(req, res, next) {
    if(req.user.role != "user") return res.status(403).send({
        success: false,
        error: "Access denied."
    });

    next();
}

module.exports = { admin, user }