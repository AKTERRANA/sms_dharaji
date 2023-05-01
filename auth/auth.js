const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

module.exports = {
    auth:(req,res, next)=>{
        let token =  req.header("Authorization");
        console.log("token", token)
        if(!token){
           res.status(401).json({message: "You Are Not Authorized!"})
        }else{
            jwt.verify(token,jwtSecret, (err, decoded)=>{
                if(!err){
                    req.user = decoded;
                    next();
                }
            } )
        }
        
    }
    
}