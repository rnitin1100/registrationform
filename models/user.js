const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
        name:{
            type:String,
            trim:true,
            default:null
        },
        email:{
            type:String,
            trim:true,
            unique:true       
        },
        password:{
            type: String,
        },
        phoneNumber:{
            type:String,
            default:null
        },
        DOB:{
            type:String,
            trim:true,
            default:null
        },
        gender:{
            type:String,
            trim:true,
            default:null
        },
        address:{
            type:String,
            trim:true,
            default:null
        },
        country:{
            type:String,
            trim:true,
            default:null
        },
        state:{
            type:String,
            trim:true,
            default:null
        },
        district:{
            type:String,
            trim:true,
            default:null
        },
        religion:{
            type:String,
            trim:true,
            default:null
        },
        caste:{
            type:String,
            trim:true,
            default:null
        }
})

module.exports = mongoose.model('User',userSchema)
