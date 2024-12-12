const express=require('express');
const router=express.Router();

const {signUp,logIn,logOut}=require('../controllers/auth');
const {addNote}=require('../controllers/addNote');
const {deleteNote}=require('../controllers/deleteNote');
const {auth}=require('../middleware/auth');
const { noteController } = require('../controllers/noteController');

router.post('/sign-up',signUp);
router.post('/log-in',logIn);
router.post('/log-out',logOut);

router.post('/add-note',auth,addNote);
router.post('/delete-note',auth,deleteNote);

router.get('/fetch-note',auth,noteController);
router.get('/auth',auth,(req,res)=>{
    res.status(200).json({
        success:true,
        message:'loggedin'
    })
});

router.delete('/delete-note/:id',auth,deleteNote)

module.exports=router;