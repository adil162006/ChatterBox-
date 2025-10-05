# 💬 ChatterBox

<div align="center">
  <img src="frontend/public/login.png" alt="ChatterBox Logo" width="400">
  <p><em>Connect instantly. Chat seamlessly.</em></p>
</div>

## ✨ Overview

ChatterBox is a modern real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It offers a sleek, responsive interface with instant messaging, online status tracking, and media sharing capabilities.

## 🚀 Key Features

### 👤 User Management
- **Secure Authentication** - JWT-based with HTTP-only cookies
- **Password Security** - Bcrypt hashing for protection
- **Profile Customization** - Upload profile pictures via Cloudinary
- **Welcome Emails** - Automated onboarding for new users

### 💬 Messaging
- **Real-time Communication** - Instant message delivery with Socket.IO
- **Media Sharing** - Send images in conversations
- **Online Indicators** - See who's currently active
- **Chat History** - Access your conversation history anytime
- **Sound Notifications** - Toggle-able audio alerts for new messages
- **Optimistic UI Updates** - Messages appear instantly before server confirmation

### 🎨 User Experience
- **Modern UI** - Clean interface with Tailwind CSS and DaisyUI
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode** - Easy on the eyes, perfect for night chats
- **Loading States** - Visual feedback during operations

### 🔒 Security
- **Data Protection** - Password hashing with bcrypt
- **Rate Limiting** - Arcjet protection against abuse
- **XSS & CSRF Protection** - Secure against common web vulnerabilities
- **HTTP-only Cookies** - Prevents client-side access to tokens

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **Zustand** - State management
- **React Router** - Navigation
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS & DaisyUI** - Styling
- **Vite** - Build tool
- **React Hot Toast** - Notifications

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **Socket.IO** - WebSocket implementation
- **JWT & bcrypt** - Authentication
- **Cloudinary** - Image storage
- **Resend** - Email service
- **Arcjet** - Rate limiting

## 📋 Prerequisites

- Node.js (v20.0.0+)
- MongoDB database
- Cloudinary account
- Resend account for emails
- Arcjet account (optional, for rate limiting)

## 🔧 Installation

### Clone the repository

```bash
git clone https://github.com/adil162006/ChatterBox-.git
cd ChatApp
```

### Install dependencies

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### Environment Setup

#### Backend (.env)
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
CLIENT_URL= http://localhost:5173 RESEND_API_KEY=your_resend_api_key
EMAIL_FROM= your_email@example.com EMAIL_FROM_NAME=ChatterBox
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=your_arcjet_env


#### Frontend (.env)

VITE_API_BASE_URL= http://localhost:3000/api

## 🚀 Running the Application

### Development Mode

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start server (from root directory)
npm start
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | No |
| PUT | `/api/auth/update-profile` | Update user profile | Yes |
| GET | `/api/auth/check` | Verify authentication | Yes |

### Messaging Endpoints

| Method | Endpoint | Description | Protected |
|--------|----------|-------------|-----------|
| GET | `/api/messages/contacts` | Get all contacts | Yes |
| GET | `/api/messages/chats` | Get chat partners | Yes |
| GET | `/api/messages/:id` | Get messages with specific user | Yes |
| POST | `/api/messages/send/:id` | Send message to user | Yes |

## 🔌 Socket.IO Events

| Event | Description |
|-------|-------------|
| `connection` | User connects to socket server |
| `disconnect` | User disconnects from socket server |
| `getOnlineUsers` | Emits list of online users |
| `newMessage` | Delivers new message to recipient |



## 🔍 Features In Detail

### Authentication Flow
1. User signs up or logs in
2. Server validates credentials and issues JWT token
3. Token is stored as HTTP-only cookie
4. Socket connection established after successful authentication
5. Real-time features become available

### Real-time Messaging
1. Messages are sent to server via REST API
2. Server saves message to database
3. If recipient is online, message is delivered instantly via Socket.IO
4. UI updates optimistically before server confirmation
5. Sound notifications play when new messages arrive (if enabled)

### User Status Tracking
1. Socket.IO maintains connection status
2. When users connect/disconnect, online status is broadcast
3. UI shows green indicators for online users

### Security Measures
1. Rate limiting with Arcjet prevents abuse
2. JWT tokens verify user identity for both REST and Socket connections
3. Passwords are hashed with bcrypt before storage
4. HTTP-only cookies prevent XSS attacks
5. CORS configuration limits access to approved origins

## 📝 License

ISC

## 👨‍💻 Author

[Adil](https://github.com/adil162006)

---

<div align="center">
  <p>Made with ❤️ and the MERN stack</p>
</div>