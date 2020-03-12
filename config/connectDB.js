var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://tuanps123:anhcymet123@cluster0-c4okq.gcp.mongodb.net/toDoList?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.catch(err=>{
    console.log('connect field :',err);
})
module.exports=mongoose;







