const express=require('express');
const passport=require('passport');
const { RegisterUser,LoginUser,isAuthenticated,VarifyTokenMiddleware,GetUsers } = require('../controllers/UserController');
const router=express.Router();


router.post('/register',RegisterUser);
router.post('/login', passport.authenticate('local'),LoginUser);
router.post('/isAuthenticated',isAuthenticated);
router.get('/getUsers',VarifyTokenMiddleware,GetUsers);

module.exports=router;