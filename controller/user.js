const bcrypt = require('bcrypt');
const joi = require('joi')
const User = require('../models/user');
const mongoose = require('mongoose')

//register
exports.renderregister=(req,res)=>{
    res.render('register')
}

exports.register =  (checkNotAuthenticate,async (req,res)=>{
    User.findOne({email:req.body.email},async(err,user)=>{
        if(user){
            return res.send("User already have account")       
        }else {
            // validation schema 
            const validateData = (user)=>{
                const schema = {
                    name:joi.string().min(3),
                    email:joi.string().email().trim(),
                    password:joi.string().regex(/^[a-zA-Z0-9!@#$%&*]{3,25}$/).min(6),
                    phoneNumber:joi.number(),
                    gender:joi.string(),
                    DOB:joi.string(),
                    caste:joi.string(),
                    religion:joi.string(),
                    address:joi.string(),
                    state:joi.string(),
                    district:joi.string(),
                    country:joi.string()
            
                }
                return joi.validate(user,schema)
            }
            let {error} = validateData(req.body) // equals to result.error or object destructuring
            if(error ) return res.status(404).send(error.details[0].message);

            try{
                const hashPassword =await bcrypt.hash(req.body.password,10);
                const user= new User({
                    _id:new mongoose.Types.ObjectId,
                    name: req.body.name,
                    email:req.body.email,
                    password:hashPassword,
                    gender:req.body.gender,
                    DOB:req.body.DOB,
                    phoneNumber:req.body.phoneNumber,
                    caste:req.body.caste,
                    religion:req.body.religion,
                    address:req.body.address,
                    district:req.body.district,
                    state:req.body.state,
                    country:req.body.country
                    
                })
                user.save()
                        .then(result=>console.log(result))
                        .catch(err=>console.log(err))

            res.redirect('/login')
                
            }
            catch (err) {
                console.log('====Error',err);
                
                res.send(err)

            }
        }
    })
})


//login
exports.renderlogin=(req,res)=>{
    res.render('login')
}

exports.login= (checkNotAuthenticate,(req,res)=>{
    res.render('index',{name: req.user.name,
                        email:req.user.email,
                        gender:req.user.gender,
                        DOB:req.user.DOB,
                        phoneNumber:req.user.phoneNumber,
                        caste:req.user.caste,
                        religion:req.user.religion,
                        address:req.user.address,
                        district:req.user.district,
                        state:req.user.state,
                        country:req.user.country
    })
    
    
 })





//checking authentication
function checkAuthenticate(req,res,next) {
    if(req.isAuthenticated()){
        return next()
    }else{
        return res.redirect('/login')
    }
}

function checkNotAuthenticate(req,res,next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }else{
        return next()
    }
}