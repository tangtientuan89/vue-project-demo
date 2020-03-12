let nodemailer = require('nodemailer');

//function sendmail
var sendMail = function (to, subject, html) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'serviceMail.contactSend@gmail.com',
            pass: 'Tranhacp123'
        }
    })

    var mailOptions = function (to, subject, html) {
        let mailOptions = {
            from: 'serviceMail.contactSend@gmail.com',
            to: to,
            subject: subject,
            html: html
        }
        return mailOptions
    }

    transporter.sendMail(mailOptions(to, subject, html), function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('sendMail success');
        }
    })
}

module.exports=sendMail