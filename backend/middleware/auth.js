const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req, res, next)=>{
			
            const token=req.cookies.token
            //  || req.body.token || req.header("Authorization").replace("Bearer ", "");
    if (!token){
        return res.status(400).json({
            success:false,
            message:'Please log in.'
        })
    }
    else{

        try{
            const payload=jwt.verify(token, process.env.TOKEN_SECRET);
            req.user=payload;
            next();
        }catch(error){
            return res.status(400).json({
                success:false,
                message:'Invalid or expired log in. Please log in again.'
            })
        }
    }
}