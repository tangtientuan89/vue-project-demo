const mongoose =require('../config/connectDB');
const Schema=mongoose.Schema;
const UsersSchema=new Schema({
    username:String,
    password:String,
    type:{
        type:Number,
        default:3
    },
    status:{
        type:String,
        default:false
    }
},{
    collection:'users'
})
const UsersModel=mongoose.model('users',UsersSchema)
// UsersModel.create({username:'admin',password:'1234'})

module.exports=UsersModel