var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toDoList', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports=mongoose;