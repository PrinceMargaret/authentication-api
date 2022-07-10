const mongoose=require('mongoose');
const UserSchema=mongoose.Schema({
    firstname : {
        type : String ,
        required : false
    },
    
    lastname :{
        type : String,
        required : false
    },

    city:{
        type : String,
        required : false
    },
    email:{
        type : String,
        required : false
    },
    password:{
        type : String,

        required : false

    }


});


module.exports=mongoose.model('UserModel',UserSchema,'users');