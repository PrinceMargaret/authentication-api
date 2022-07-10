const express=require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose=require("mongoose");
const bodyParser=require('body-parser');
const UserRouter=require('./routes/UserRoute');
const UserModel=require('./models/UserModel');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);

const passport=require('passport');
const {PassportAuth}=require('./auth/UserAuth');






const app=express();
const DB_URI="mongodb+srv://PrinceMargaret:whZqC2szDBhh5hGu@prince-cluster.pocnu.mongodb.net/AuthDB";


//---------------------mongoDB connection--------------------------

mongoose.connect(DB_URI);
mongoose.connection.once('open',(err)=>{
  if(!err){
    console.log("Connected to mongoDB");
  }
});
//------------------------------------------------------------------


//---------------------mongoDB Store--------------------------
const store=new MongoDBStore({
    uri: DB_URI,
    collection: 'app_session'
});

//------------------------------------------------------------------

//---------------------MiddleWare----------------------------------
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());  //data comming from form
app.use(session({
    secret :"my Secret",
    saveUninitialized: false,
    cookie:{
        maxAge:60000*60*24
    },
    store:store,
    resave:false
}));

app.use(passport.initialize());
app.use(passport.session());


//------------------------------------------------------------------


//---------------------Passport Store and Read session data----------
passport.serializeUser(function(user,done){ // store the information in the session
    done(null, user._id); // store user id in the session
});

passport.deserializeUser(function(id,done){     // retrive the information from the session
    UserModel.findById(id,function(err,user){   // fetch user id in the session 
        done(err,user);
    });
});
//------------------------------------------------------------------















passport.use(PassportAuth());
app.use("/api",UserRouter);


let port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});