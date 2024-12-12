const express=require('express');
const app=express();
app.use(express.json());
require("dotenv").config();
const cors=require('cors');
const PORT=process.env.PORT;
const cookieParser = require('cookie-parser');
const user = require("./routes/user");

app.use(cookieParser());
app.use(cors({
    origin: 'https://note-x-pi.vercel.app/',
    credentials: true
  }));

//route import and mount
app.use("/api/v1", user);

//database connection
const db=require('./config/database');
db();

app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`);
})