const user=require('../models/user');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;
const jwt=require("jsonwebtoken");

exports.signUp=async(req,res)=>{
    const {firstName,lastName,email,password}=req.body;

    //email already existing or not?
    const existing=await user.findOne({email});
    if(existing){
        return res.status(400).json({
            success:false,
            message:'User already exists'
        })
    }
    
    //first hash the password
    let hashedPassword;
    try {
        hashedPassword=await bcrypt.hashSync(password, saltRounds);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error in hashing password'
        })
    }
    //if not exists then create a db entry
    const response=await user.create({firstName,lastName,email,password:hashedPassword});
    response.password=undefined;
    return res.status(200).json({
        success:true,
        data:response,
        message:'Signed Up successfully'
    })
}

exports.logIn=async (req,res)=>{
    const {email,password}=req.body;
    //check if user exists
    const existing=await user.findOne({email});
    if(!existing){
        return res.status(400).json({
            success:false,
            message:'User doesnot exist'
        })
    }
    //load hashed password
    const hashedPassword=existing.password;
    existing.password=undefined;
    //if user exists then verify the password
    try {
        const verify=await bcrypt.compare(password, hashedPassword); 
        const payload={
            // firstName:existing.firstName,
            // lastName:existing.lastName,
            email:existing.email,
            // notes:existing.notes
        }
        if(verify){
            let token=jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2h' });
            res.cookie('token',token,{
                httpOnly: true, // Helps prevent XSS attacks
                secure: true,  // Set to true for HTTPS
                sameSite: 'None', // Allow cross-origin cookies
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000)
            }).status(200).json({
                success:true,
                data:existing,
                message:'User logged in successfully'
            });
        }
        else{
            return res.status(403).json({
                success:false,
                message:'Incorrect password'
            })
        }  
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Error in verifying the password'
        })
    }
}

exports.logOut=async (req,res) => {
    res.clearCookie('token',{
        httpOnly: true, // Helps prevent XSS attacks
        secure: true,  // Set to true for HTTPS
        sameSite: 'None', // Allow cross-origin cookies
        path: '/',
        expires: new Date(0)
    });
    // await req.user.save();
    res.status(200).json({ 
        success:true,
        message:"Logged out successfully" 
    });
}