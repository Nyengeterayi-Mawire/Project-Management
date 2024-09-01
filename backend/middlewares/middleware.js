const jwt = require('jsonwebtoken');

const middleware = (req,res,next) => {
    console.log(`path : ${req.path} --- method : ${req.method}`); 
    next();
}


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');    
    if (token) {
        // const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        // console.log(token);
        jwt.verify(token, 'afagwegowehgoewa', (err, user) => {
            if (err) {
                // Handle specific JWT errors
                if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ expired : true });
                }
                if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
                }
                return res.status(403).json({ error: 'Token is not valid' });            
            } 
            req.userId = user;
            next();   
        })
    } else {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }   

        
}
    // console.log(req.header('Authorization'));
    // if (!token) return res.status(401).json({ error: 'Access denied' });
    // try {
    //     const valid = jwt.verify(token, 'afagwegowehgoewa');
    //     console.log(valid);
    //     req.userId = valid.userId;
    //     next();
    // } catch (error) {
    //     res.status(401).json({ error: 'Invalid token' });
    // }
 ;



module.exports = {middleware,verifyToken};