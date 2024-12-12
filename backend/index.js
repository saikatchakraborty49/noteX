const express=require('express');
const app=express();
app.use(express.json());
require("dotenv").config();
const cors=require('cors');
const PORT=process.env.PORT||3000;
const cookieParser = require('cookie-parser');
const user = require("./routes/user");

app.use(cookieParser());
// app.use(cors({
//     origin: 'https://note-x-pi.vercel.app/',
//     credentials: true
//   }));
// const allowedOrigins = ["https://note-x-pi.vercel.app"]; // Add more origins if needed

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


//route import and mount
app.use("/api/v1", user);

//database connection
const db=require('./config/database');
db();

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})