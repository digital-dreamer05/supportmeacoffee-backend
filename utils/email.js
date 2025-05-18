const nodemailer = require("nodemailer");

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Coffee Donation <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send(
      "به سیستم اهدای قهوه خوش آمدید!",
      `سلام ${this.firstName} عزیز،\n\nبه سیستم اهدای قهوه خوش آمدید. امیدواریم تجربه خوبی داشته باشید.\n\nبا احترام،\nتیم اهدای قهوه`
    );
  }

  async sendDonationConfirmation(donation) {
    await this.send(
      "تایید اهدای قهوه",
      `سلام ${this.firstName} عزیز،\n\nاهدای قهوه شما با موفقیت ثبت شد.\n\nجزئیات اهدا:\nنوع قهوه: ${donation.coffeeType}\nتعداد: ${donation.quantity}\nپیام: ${donation.message}\n\nبا تشکر از شما،\nتیم اهدای قهوه`
    );
  }
}

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"support me a coffee" <yourapp@example.com>',
    to: email,
    subject: "Verify your email",
    html: `<p>Your verification code is: <b>${code}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  Email,
  sendVerificationEmail,
};
