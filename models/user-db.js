const mongoose=require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    }
    
})

user.plugin(passportLocalMongoose);

const User = mongoose.model('user',user);
module.exports = User;