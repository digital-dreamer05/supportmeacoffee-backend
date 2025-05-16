# ☕ Coffee Donation Project

A modern and secure platform that allows coffee enthusiasts to share their love for coffee by donating to others. Whether you're a barista, coffee shop owner, or just a coffee lover, this platform helps you spread joy one cup at a time!

## ✨ Features

- **User Management**

  - Secure registration and authentication
  - Role-based access control
  - Profile management

- **Donation System**

  - Create and manage coffee donations
  - Track donation status
  - Real-time updates

- **Security**

  - JWT authentication
  - Rate limiting
  - XSS protection
  - Password encryption
  - Secure headers with Helmet

- **Advanced Features**
  - Email notifications
  - Error handling
  - API filtering and pagination
  - MongoDB integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/coffee-donation.git
cd coffee-donation
```

2. Install dependencies:

```bash
npm install
```

3. Environment Setup:

   - Create a `config.env` file in the root!
   - Configure the following variables:
     ```
     NODE_ENV=development
     PORT=4002
     DATABASE_LOCAL=mongodb://localhost:27017/coffee-donation
     JWT_SECRET=your-secret-key
     JWT_EXPIRES_IN=90d
     EMAIL_HOST=smtp.mailtrap.io
     EMAIL_PORT=2525
     EMAIL_USERNAME=your-email
     EMAIL_PASSWORD=your-password
     EMAIL_FROM=noreply@coffeedonation.com
     ```

4. Run the application:

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📁 Project Structure

```
coffee-project/
├── controllers/     # Application controllers
├── models/         # Database models
├── routes/         # API routes
├── middlewares/    # Custom middlewares
├── utils/          # Utility functions
├── config/         # Configuration files
├── app.js          # Express app setup
└── server.js       # Application entry point
```

## 🔌 API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user

### Donations

- `POST /api/donations` - Create new donation
- `GET /api/donations` - Get all donations (admin only)
- `GET /api/donations/my-donations` - Get user's donations
- `PATCH /api/donations/:id/status` - Update donation status (admin only)

## 🛡️ Security Features

- JWT-based authentication
- Rate limiting to prevent abuse
- XSS protection with Helmet
- Password encryption with bcrypt
- Secure HTTP headers
- Input validation and sanitization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ☕ Fun Fact

Did you know? The first webcam was invented to monitor a coffee pot at Cambridge University! Now you can monitor your coffee donations with our modern web application. Talk about full circle! 😄
