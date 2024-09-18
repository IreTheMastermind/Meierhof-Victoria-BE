const { Router } = require("express");
const sendMail = require("../mail/config");

const mailRouter = Router();

const processData = async (req, res, next) => {
  try {
    // Extract your data here
    const to = "adeyemifaruq2@gmail.com"; // Add the email you want to send to ,
    // const to = " ireoluwaenoch@gmail.com"; // Add the email you want to send to ,
    // const to = "info@meierhof-victoria.ch"// Add the email you want to send to ,
    subject = "Table Reservation"; // add the subject you want to send,
    html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Reservation Notification</h1>
        <p>Hello,</p>
        <p>A new reservation has been made. Please find the details below:</p>
        <table border="1" cellpadding="5" cellspacing="0">
          <tr>
            <td><strong>First name:</strong></td>
            <td>John Doe</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>john.doe@example.com</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>123-456-7890</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td>July 8, 2024</td>
          </tr>
        </table>
        <p>Thank you.</p>
      </div>
    </body>
  </html>
    `; // The body of the email;

    const send = await sendMail(to, subject, html);
    if (send) return res.send("OK");
    return res.status(400).send("Error");
  } catch (error) {}
};

mailRouter.post("/send-mail", processData);

module.exports = mailRouter;
