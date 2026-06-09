# Minimalist Store

A full-stack MERN ecommerce web application.

## Tech Stack
- **Frontend:** React (Vite), React Router, Zustand, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Auth:** JWT + bcrypt

## Features
- User registration and login
- Product listing
- Add to cart
- Checkout with shipping address
- Order management
- Admin product management

## Getting Started

### Backend
```bash
cd minimalist-store
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the root with:
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```