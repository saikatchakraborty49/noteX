const user=require('../models/user');

exports.addNote=async(req,res)=>{
    const formData=req.body;
    const payload=req.user;
    const email=payload.email;
    try{
        const response=await user.findOneAndUpdate(
            {email}, 
            {$push:{ notes:formData }}, 
            {new:true}
        );
        response.password=undefined;
        res.status(200).json({
            success:true,
            data:response,
            message:'Note added successfully'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Unexpected error occured'
        })
    }
}
