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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://notex-backend-0j9r.onrender.com/");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  console.log("Request received:", req.method, req.url);

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