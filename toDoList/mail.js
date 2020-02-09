let nodemailer=require('nodemailer');
let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'voicoiloichoi@gmail.com',
        pass:'0979581350'
    }
})

let mailOptions={
    from:'voicoiloichoi@gmail.com',
    to:'tuan.ps4u@gmail.com',
    subject:'thu xac thuc',
    html:`<p>Link nay ton tai trong 1 ngay, click <a href="/authEmail">Tai day</a></p>`
}

transporter.sendMail(mailOptions,function(err,data){
    if(err){
        res.json(err)
    }else{
        console.log('thanh cong');
    }
})