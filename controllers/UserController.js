const UserModel=require('../models/UserModel');
const bcrypt = require('bcryptjs');
const {GenerateToken,VerifyToken}=require('../auth/UserAuth');
function RegisterUser(req,res){
    UserModel.findOne({email:req.body.email},(err,user)=>{
        if(user){
            res.send({status:409,message: "this email already exits"});
        }else if(!user){
            let user=new UserModel({
                firstname :req.body.firstname,
                lastname : req.body.lastname,
                city : req.body.city,
                email: req.body.email,
                password : bcrypt.hashSync(req.body.password,10)
            
            
               });
            
               user.save((err)=>{
                if(!err){
                    res.send({status:200,message: "user registered successfully"});
                }else{
                    throw err;
                }
            
               });

        }else {
            res.send(err);
        }
    });
}


function LoginUser(req,res){
    res.send({status:200,message: "login successfully" ,token:GenerateToken(req.session.user)});
}

function isAuthenticated(req,res){
    res.send({isAuthenticated:VerifyToken(req.headers.authorization)});
}

function GetUsers(req,res){
    UserModel.findOne({},(err,user)=>{
        if(!err){
            res.send({data :user});
        }else{
            throw err;
        }
    });
}


function VarifyTokenMiddleware(req,res,next){
    if(VerifyToken(req.headers.authorization)==true){
        next();
    }else{
        res.send({status:401,message: "unauthorized user"});
    }
}
module.exports={RegisterUser,LoginUser,isAuthenticated,GetUsers,VarifyTokenMiddleware};