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
    from: '"Support Me A Coffee ☕" <support@yourapp.com>',
    to: email,
    subject: "☕ !کدت رو بگیر و بیا قهوه‌تو بخور",
    html: `
      <div style="font-family: 'Comic Sans MS', Arial, sans-serif; background-color: #fffaf3; padding: 30px; border-radius: 12px; border: 1px solid #f0e6da; max-width: 600px; margin: auto;">
        <div style="text-align: center;">
          <img src="https://cdn-icons-png.flaticon.com/512/924/924514.png" alt="Coffee" width="80" style="margin-bottom: 20px;" />
          <h2 style="color: #6f4e37;">☕یه قدم مونده تا قهوه‌ت </h2>
        </div>

        <p style="font-size: 16px; color: #444;">،سلام دوست خوش‌ذوق</p>
        <p style="font-size: 15px; color: #444;">:کدت آماده‌ست! فقط کافیه کپی‌ش کنی و بزنی تو سایت</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #fff3cd; padding: 15px 25px; font-size: 24px; border-radius: 10px; font-weight: bold; color: #856404; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            ${code}
          </span>
        </div>

        <p style="font-size: 15px; color: #666;"> 🕒 ! لطفاً این کد رو توی ۱۰ دقیقه وارد کن که قهوه‌مون هنوز گرمه</p>
        <p style="font-size: 14px; color: #888;">😅اگه این ایمیل اشتباهی برات اومده، بی‌خیالش شو </p>

        <div style="text-align: center; margin-top: 40px;">
          <p style="font-size: 14px; color: #aaa;">☕با عشق ❤️ و قهوه <br>Support Me A Coffee تیم </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  Email,
  sendVerificationEmail,
};
