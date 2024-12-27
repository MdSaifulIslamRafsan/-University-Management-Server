
import nodemailer from 'nodemailer'
import config from '../config';

const sendEmail = async(to : string , html : string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === "production", 
        auth: {
          user: config.node_mailer_gmail,
          pass: config.node_mailer_pass,
        },
      });

      await transporter.sendMail({
        from: config.node_mailer_gmail, 
        to: to, 
        subject: "reset your password with in 5 minutes", 
        html: html, 
      });
    

}

export default sendEmail;