const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    try{
        let token = req.header('Authorization');
        if(!token){
            return res.status(400).send(`Token Not Found`);
        }

        const tokenWithoutBearer = token.replace("Bearer ", "");
        let decoded = jwt.verify(tokenWithoutBearer, 'jwtpassword');
        req.user =  decoded.user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).send(`Authentication Error`);
    }
}