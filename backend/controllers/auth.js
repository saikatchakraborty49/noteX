const user=require('../models/user');
const OTP=require('../models/otp');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;
const jwt=require("jsonwebtoken");
const otpGenerator=require("otp-generator")

exports.signUp=async(req,res)=>{
    const {firstName,lastName,email,password,otp}=req.body;

    //email already existing or not?
    const existing=await user.findOne({email});
    if(existing){
        return res.status(400).json({
            success:false,
            message:'User already exists'
        })
    }

    const otpResponse = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1)
    console.log(otpResponse)
    if (otpResponse.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      })
    } else if (otp !== otpResponse[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
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
            // existing.token=token;
            res.cookie('token',token,{
                httpOnly: true, // Helps prevent XSS attacks
                secure: false,  // Set to true for HTTPS
                token,
                // sameSite: 'None', // Allow cross-origin cookies
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000)
            }).status(200).json({
                success:true,
                existing,
                token,
                message:'User logged in successfully'
            });

          //   res.header("Authorization", `Bearer ${token}`).status(200).json({
          //     success:true,
          //     existing,
          //     token,
          //     message:'User logged in successfully'
          // });
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
        // path: '/',
        // domain:'notex-backend-k1fy.onrender.com'
    });
    // await req.user.save();
    res.status(200).json({ 
        success:true,
        message:"Logged out successfully" 
    });
}

exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body
  
      // Check if user is already present
      // Find user with provided email
      const checkUserPresent = await user.findOne({ email })
      // to be used in case of signup
  
      // If user found with provided email
      if (checkUserPresent) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is Already Registered`,
        })
      }
  
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })
      const result = await OTP.findOne({ otp: otp })
      console.log("Result is Generate OTP Func")
      console.log("OTP", otp)
      console.log("Result", result)
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        })
      }
      const otpPayload = { email, otp }
      const otpBody = await OTP.create(otpPayload)
      console.log("OTP Body", otpBody)
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }