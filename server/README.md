# Elite Auto Rentals - Server

This is the server-side application for Elite Auto Rentals, a luxury car rental service.

## Features

- RESTful API for car rental operations
- User authentication with JWT
- Car management system
- Booking system
- Admin panel functionality

## Technology Stack

- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT for authentication
- bcrypt for password hashing
- Express Validator for input validation

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
4. Create a .env file based on .env.example with your MongoDB connection string and JWT secret
5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   
The API will be available at http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Sign in a user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create a new car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

### Bookings
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking status
- `GET /api/bookings/admin` - Get all bookings (admin only)

## Deployment

The backend application is configured for deployment on Railway:

1. Connect your GitHub repository to Railway
2. Configure the environment variables
3. Deploy

## Project Structure

- `src/`
  - `controllers/` - Request handlers
  - `middleware/` - Custom middleware functions
  - `models/` - Mongoose models
  - `routes/` - API routes
  - `index.js` - Entry point

## Environment Variables

The following environment variables are required:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRATION` - JWT expiration time (e.g., '7d')
- `NODE_ENV` - Environment (development/production)