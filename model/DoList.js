const mongoose = require('../config/connectDB');
const Schema = mongoose.Schema
const DoListSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    collection: 'doList'
})




const DoListModel = mongoose.model('doList', DoListSchema)
// MyModel.create({title:'do 3',content:'xin chao'})
// MyModel.updateOne({_id:'5e0f02702daa2d23e84a2a82'},{content:'lam ngay k t giet'}).then(function(value){
//     console.log(value);
// })
module.exports = DoListModel