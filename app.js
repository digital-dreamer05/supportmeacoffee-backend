const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
require('./config/passport');
const swaggerConfig = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const globalErrorHandler = require('./controllers/v1/errorController');
const feedbackRoutes = require('./routes/feedbackRouter');

const app = express();

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 MIN
  max: 100,
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

const session = require('express-session');
app.use(
  session({
    secret: 'your_secret_here',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/uploads', express.static('uploads'));

// Swagger Documentation
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);

app.get('/', (req, res) => {
  res.render('home');
});

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Global error handler (must be last)
app.use(globalErrorHandler);

module.exports = app;
