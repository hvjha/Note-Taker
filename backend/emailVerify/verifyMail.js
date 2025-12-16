import nodemailer from "nodemailer";
import fs from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const verifyMail = async (token, email) => {
    const emailTemplateResource = fs.readFileSync(
        path.join(__dirname,"template.hbs"),
        "utf-8"
    )
    const template = Handlebars.compile(emailTemplateResource)
    const htmlToSend = template({token:encodeURIComponent(token)})
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Verify your email",
      html:htmlToSend,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(error.message);
  }
};
