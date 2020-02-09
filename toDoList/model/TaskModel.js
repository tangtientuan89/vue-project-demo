const mongoose=require('../config/connectDB');
const Schema=mongoose.Schema
const TaskSchema=new Schema({
title:String,
content:String
},{
collection:'data'
})




const TaskModel=mongoose.model('data',TaskSchema)
// MyModel.create({title:'do 3',content:'xin chao'})
// MyModel.updateOne({_id:'5e0f02702daa2d23e84a2a82'},{content:'lam ngay k t giet'}).then(function(value){
//     console.log(value);
// })
module.exports=TaskModel