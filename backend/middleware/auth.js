const jwt=require("jsonwebtoken")

function auth(req,res,next){
    const token=req.header("x-auth-token")

    if(!token){
        return res.status(401).json({
            msg:"no token, authorization denied"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        
        req.user=decoded.user

        console.log(decoded)
        console.log(req.user)
        next()
    }catch(error){
        console.log("JWT ERROR:",error);
        res.status(401).json({
            msg:"token is not valid"
        })
    }
}

module.exports=auth