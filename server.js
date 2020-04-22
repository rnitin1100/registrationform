if (process.env.NODE_ENV !=='production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const passport = require('passport')
const session = require('express-session');
const flash = require('express-flash');
const mongoose = require('mongoose')
const initializePassport = require('./config/passport')
const User = require('./models/user');
const user = require('./routes/user')
const ejs = require('ejs');
const path = require('path')

//passport verification
initializePassport(
    passport,
    email=> User.findOne({email:email
    }))

//connection to mongodb 
mongoose.connect('mongodb://localhost/registration'
        ,{useNewUrlParser:true
        ,useUnifiedTopology:true})

// Setting view engine
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')        

//middlewares
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:process.env.SESSION_SESSION,
    resave:false,
    saveUninitialized:false,
}))

app.use('/',user)


const port = process.env.Port || 3000;

app.listen(port,()=>console.log(`server is running at port ${port}.....`))
