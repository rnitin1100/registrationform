const express = require('express');
const router = express.Router();
const passport = require('passport')
const user = require("../controller/user")

//homepage
router.get('/',user.homepage)

//Register 
router.get('/register',user.renderregister)
router.post('/register',user.register)

//login
router.get('/login',user.renderlogin)
router.post('/login',passport.authenticate('local',{}),user.login)


module.exports=router;