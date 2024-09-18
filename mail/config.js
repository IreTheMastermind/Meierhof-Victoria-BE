// import { createTransport } from "nodemailer";
const { createTransport } = require("nodemailer");
const EMAIL_SENDER = "Reservation",
  EMAIL_USER = "reservation@reservetion.com",
  SMTP_HOST = "smtp.gmail.com",
  SMTP_PASSWORD = "ctit hocj vjxd qutr",
  SMTP_PORT = "465",
  SMTP_USER = "kophybrown@gmail.com";

const transporter = createTransport({
  port: Number(SMTP_PORT),
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  secure: true,
  tls: { rejectUnauthorized: false },
});

async function sendMail(
  to,
  subject,
  html,
  attachment = null,
  isAttachment = false
) {
  const mailInfo = {
    from: `${EMAIL_SENDER} <${EMAIL_USER}>`,
    to: to,
    subject: subject,
    attachDataUrls: true,
    html: html,
    attachments: isAttachment ? attachment : [],
  };

  transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      console.log("error ", error);

      DEBUG(error);
    }
    return true;
  });
}

module.exports = sendMail;
