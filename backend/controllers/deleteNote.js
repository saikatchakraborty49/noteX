const user=require('../models/user');

exports.deleteNote=async(req,res)=>{
    // const formData=req.body;
    const payload=req.user;
    const email=payload.email;
    const {id}=req.params;
    try{
        const userData=await user.findOne({email});
        const response=await user.findOneAndUpdate(
            {email}, 
            {$pull:{ notes:{_id:id} }}, 
            {new:true}
        );
        response.password=undefined;
        res.status(200).json({
            success:true,
            data:response,
            message:'Note deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'Unexpected error occured'
        })
    }
}
