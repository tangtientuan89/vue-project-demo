const mongoose =require('../config/connectDB');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    email:String,
    password:String,
    type:{
        type:Number,
        default:3
    },
    verified:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        default:null
    }

},{
    collection:'users'
})
const UserModel=mongoose.model('users',UserSchema)
// UsersModel.create({username:'admin',password:'1234'})

module.exports=UserModel