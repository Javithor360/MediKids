import nodemailer from 'nodemailer';
import { config_env } from './dotenv_conf.js';

const SendEmail = (options) => {
    const transporter = nodemailer.createTransport({
        host: config_env.EMAIL_HOST,
        port: config_env.EMAIL_PORT,
        secure: true,
        auth: {
          user: config_env.EMAIL_USERNAME,
          pass: config_env.EMAIL_PASSWORD
        }
      });
    
      const mailOptions = {
        from: config_env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
      }
    
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      })
} 

export { SendEmail };