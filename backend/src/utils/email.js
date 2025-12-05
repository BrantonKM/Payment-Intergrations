const nodemailer = require('nodemailer');
const config = require('../config');


const transporter = nodemailer.createTransport({
host: config.email.host,
port: config.email.port,
secure: false,
auth: { user: config.email.user, pass: config.email.pass }
});


module.exports = async function sendEmail({ to, subject, html, attachments = [] }) {
return transporter.sendMail({ from: config.email.from, to, subject, html, attachments });
};