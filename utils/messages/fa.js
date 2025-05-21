const messages = {
  auth: {
    username_required: "وارد کردن نام کاربری الزامی است",
    username_invalid: "نام کاربری فقط می‌تواند شامل حروف، اعداد و نقطه باشد",
    username_length: "نام کاربری باید بین ۳ تا ۲۰ کاراکتر باشد",
    username_taken: "این نام کاربری قبلاً ثبت شده است",
    username_available: "نام کاربری در دسترس است",

    email_required: "ایمیل الزامی است",
    password_required: "رمز عبور الزامی است",
    user_exists: "این ایمیل قبلاً ثبت شده است",
    register_success: "ثبت‌نام انجام شد؛ کد تأیید به ایمیل ارسال شد",

    user_not_found: "کاربر یافت نشد",
    already_verified: "ایمیل قبلاً تأیید شده است",
    invalid_code: "کد تأیید اشتباه است",
    code_expired: "کد تأیید منقضی شده است",
    email_verified: "ایمیل با موفقیت تأیید شد",

    login_success: "ورود با موفقیت انجام شد",
    login_failed: "ایمیل یا رمز عبور اشتباه است",
    email_not_verified: "ایمیل هنوز تأیید نشده است",
  },

  feedback: {
    submit_success: "فیدبک با موفقیت ثبت شد",
    submit_error: "خطا در ثبت فیدبک",
    fetch_error: "خطا در دریافت فیدبک‌ها",
  },
  user: {
    not_found: "کاربر پیدا نشد",
    profile_updated: "پروفایل با موفقیت به‌روزرسانی شد",
  },
  common: {
    server_error: "خطای سرور رخ داده است",
    unauthorized: "شما مجاز به انجام این عملیات نیستید",
    bad_request: "درخواست نامعتبر است",
  },
};

module.exports = messages;
