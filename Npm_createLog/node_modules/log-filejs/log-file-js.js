const chalk = require('chalk')
const fs = require('fs');
let d;
function Info(message) {
    d = new Date();
    let text = `[Info] [${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] --> ${message}
`;
    fs.appendFile('Info.log',text,()=>{
        console.log(chalk.cyan('[Info]')+chalk.green(`[${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`)+' --> '+chalk.bold(message));
    });
};
function Error(message) {
    d = new Date();
    let text = `[Error] [${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] --> ${message}
`;
    fs.appendFile('Error.log',text,()=>{
        console.log(chalk.red('[Error]')+chalk.green(`[${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`)+' --> '+chalk.bold(message));
    });
};
logFile = {
    info: Info,
    error: Error
};

module.exports = logFile;