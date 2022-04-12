const credentials=require('./credentials.js')
const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: credentials.email_id,
        pass: credentials.password
    }
});

const sendMail = function (toAddress, subject, content, next) {
    const mailOptions = {
        to: toAddress,
        subject: subject,
        html: content
    };
    smtpTransport.sendMail(mailOptions, next);
};

module.exports={sendMail}
