# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with React, Node.js, and Socket.IO.

## ✨ Features

- 🔐 **Authentication**: Secure signup/login with JWT
- 💬 **Real-time Messaging**: Instant message delivery with Socket.IO
- 👥 **Online Status**: See who's online in real-time
- 📸 **File Sharing**: Upload and share images
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📱 **Mobile Friendly**: Works seamlessly on all devices
- 🌙 **Theme Support**: Multiple theme options

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-time-chat-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   
   Create `.env` file in backend directory:
   ```env
   PORT=5001
   MONGO=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   NODE_ENV=development
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5001

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **DaisyUI** - UI Components
- **Socket.IO Client** - Real-time communication
- **Zustand** - State management
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Socket.IO** - WebSocket server
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Bcrypt** - Password hashing

## 📱 Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your account
3. **Chat**: Select a user from the sidebar to start chatting
4. **Share Files**: Click the image icon to upload and share images
5. **Online Status**: See green dots next to online users
6. **Themes**: Change themes in Settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.