const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendResetEmail(toEmail, resetUrl) {
  const msg = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
  };

  await transporter.sendMail(msg);
}

module.exports = { sendResetEmail };
