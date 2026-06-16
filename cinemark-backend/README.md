# Cinemark Backend

Express.js backend for the Cinemark Movie App with MongoDB, JWT authentication, and favorites management.

## Setup

1. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Favorites
- `POST /api/favorites/toggle` - Add/remove favorite (requires Bearer token)
- `GET /api/favorites` - Get user's favorites (requires Bearer token)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
