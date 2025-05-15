const AppError = require("./../../utils/appError");

// این تابع خطای CastError (مثل وقتی ID اشتباهه) رو هندل می‌کنه
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`; // یه پیام خفن برای خطای بدردنخور مونتاژ میکنیم
  return new AppError(message, 400); // خطای ۴۰۰ (درخواست نامعتبر) رو برمی‌گردونیم
};

// وقتی یه مقدار تکراری تو دیتابیس ذخیره بشه، این تابع وارد عمل میشه
function handleDuplicateFieldsDB(err) {
  const field = Object.keys(err.keyValue)[0]; // اسم فیلدی که مشکل ایجاد کرده رو پیدا کن 🔍
  const value = err.keyValue[field]; // مقدار تکراری که طرف وارد کرده رو بگیر 🧐
  // یه پیام محترمانه برای کاربر درست کن که بفهمه این مقدار قبلاً رزرو شده! 🎫
  const message = `The ${field} '${value}' is already taken. Please choose another one.`;
  // این ارور رو بنداز که طرف بفهمه باید یه مقدار جدید بزنه و دست از تکرار برداره! 😅
  return new AppError(message, 400);
}

// این یکی برای زمانی که کاربر ورودی‌های اشتباهی می‌فرسته
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // لیست تمام اشتباهات رو جمع می‌کنیم

  const message = `Invalid input data. ${errors.join(". ")}`; // خطاها رو بهم می‌چسبونیم و می‌فرستیم
  return new AppError(message, 400);
};

// اگه طرف با JWT نامعتبر بیاد، اینجا گیر می‌افته
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

// وقتی توکن منقضی شده باشه، این تابع خطا رو هندل می‌کنه
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

// این تابع خطاها رو توی محیط توسعه نمایش میده
const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack, // استک رو هم می‌فرستیم که بفهمیم مشکل از کجاست
    });
  }

  // console.error('ERROR 💥', err); // ارور رو توی لاگ می‌ندازیم
  // return res.status(err.statusCode).render('error', {
  //   title: 'Something went wrong!',
  //   msg: err.message,
  // });
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

// این یکی برای وقتی که پروژه روی محیط production باشه
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    console.error("ERROR 💥", err);
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!", // نمی‌خوایم جزئیات خطا رو به کاربر نشون بدیم 😉
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

// میدل‌وری که همه خطاها رو مدیریت می‌کنه
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // اگه استاتوس‌کد نداشته باشه، ۵۰۰ می‌ذاریم
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res); // تو محیط توسعه، خطا رو کامل نشون میدیم
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res); // توی production، خطای امن ارسال می‌کنیم
  }
};

// Damn, that was a tough one to write! 😵‍💫 But hey, now I have a super solid error handling system! 💪
// I can use this in any project and flex on other devs! 😏🔥
// 🚀 Keep pushing, keep coding, and remember: every bug you fix makes you a stronger dev! 💻🔥
