const user=require('../models/user')
exports.noteController=async (req,res)=>{
    const payload=req.user;
    const email=payload.email;
    const userData=await user.findOne({email});
    try{
        res.status(200).json({
            success:true,
            data:userData,
            message:'Data collected successfully'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Error in data collection'
        })
    }
}