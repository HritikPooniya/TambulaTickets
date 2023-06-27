const express=require('express');
const router = express.Router();
const User = require('../models/user-db');
const passport = require('passport');



router.get('/register',(req,res)=>{
    res.render('register');
});
router.post('/register',async (req,res)=>{
    const newUser = new User({
        username:req.body.username
    });
    const Registered = await User.register(newUser,req.body.password);
    req.logIn(Registered,(err)=>{
        if(err){
            console.log("error, please enter valid mail id or you are already registered with this mailid");
        }
        console.log("Successfully register");
        res.redirect('/');
    })
    
})
router.get('/login', (req,res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local',{failureRedirect:"/login"}),(req,res)=>{
    res.render('logout');
});

router.get('/logout',(req,res)=>{
    req.logOut(function(err){
        if(err){
            console.log('error while logout');
        }
    
    res.redirect('/login');
});
});




module.exports = router;