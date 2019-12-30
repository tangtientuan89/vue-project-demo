var fs = require('fs');
var path='./textLog.txt'
//  var service = createLog(path)
 var date = Date(Date.now())
function createLog(path) {
    return fs.writeFile(path,"",function(){})
}
 function info(message) {
    return fs.appendFile(path,'[Info] ' + date + message,function(){})
 }
function error(message) {
    return fs.appendFile(path,', [Error] ' + date + message,function(){})
}
var logger = {
    createLog: createLog,
    info: info,
    error: error
}
module.exports=logger