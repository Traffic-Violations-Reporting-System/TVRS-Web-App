function level1(req, res, next) {

    if(req.user.role === "level1"){
        next();
    }else{
        return res.status(403).send('Access denied.');
    }
}
module.exports =level1 ;