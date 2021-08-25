const jwt = require("jsonwebtoken");

function authentication(req, res,next){
     const token = req.header('x-auth-token');
     if(!token) res.status(401).send('Access denided.No token provided.');
     try{
        const decoded = jwt.verify(token,'jwtPrivateKey');
         req.user=decoded;
         next();
     }catch (e) {
         return res.status(400).send('Invalid token.');
     }
}
module.exports =authentication ;