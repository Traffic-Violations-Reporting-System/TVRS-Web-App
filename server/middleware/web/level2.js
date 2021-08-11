function level2(req, res, next) {
    if (req.user.role === "level2") {
        next();
    } else {
        return res.status(403).send('Access denied.');
    }
}
module.exports =level2 ;