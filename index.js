const express = require('express'),
    app=express(),
    mongoose=require('mongoose'),
    session = require('express-session'),
    passport =require('passport'),
    localStrategy = require('passport-local'),
    User = require('./models/user-db'),
    PORT = 3000 || process.env.PORT;

mongoose.connect("mongodb+srv://backapi:backapi@cluster0.0hpaxoo.mongodb.net/").then(()=>{
    console.log("data base is connected");
}).catch((error)=>{
    console.log("error while connecting",error);
});


//create session

app.use(session({
    secret:'SuperSecretPasswordForLogIn',
    resave:false,
    saveUninitialized:true,
    cookie:{
       
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24
      
    }
}))

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//view engine used in ejs
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));

const user = require('./route/auth');
const createticket = require('./route/createticket');

app.use(user);
app.use(createticket);

app.get('/',(req,res)=>{
    res.render('home');
})

app.listen(PORT,()=>{
    console.log(`server is running in the port ${PORT}`);
})
