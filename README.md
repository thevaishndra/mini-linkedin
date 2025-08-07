# 🚀 Mini LinkedIn - Full Stack Web App

A mini version of LinkedIn built using the MERN stack, allowing users to register, log in, create posts, view other users' posts, and manage their profile.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT
- **Deployment:** Frontend (Vercel), Backend (Render)

---

## 📸 Features

### 🔐 Authentication
- Sign up & login functionality
- JWT-based token authentication
- Protected routes for authenticated users only

### 👤 User Profile
- View and edit profile info (full name, bio, profile picture)
- Upload profile picture (with default fallback)

### 📝 Post Management
- Create, read, update, delete posts
- Public feed displaying all users' posts
- View posts by a specific user

### 🌐 Frontend
- Responsive design using Tailwind CSS
- Clean and modern UI with React components
- Routing handled via React Router

### 🔧 Backend
- RESTful API endpoints built with Express.js
- MongoDB + Mongoose for data storage
- Middleware for error handling and authentication

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mini-linkedin.git
```

### 2. Navigate to folders and install dependencies
```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3. Create Environment Variables

#### 📁 backend/.env
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run the Development Servers

#### Start Backend
```bash
cd backend
npm run dev
```

#### Start Frontend
```bash
cd frontend
npm run dev
```

---

## 🔐 Admin / Demo Logins

| Role  | Email               | Password     |
|-------|---------------------|--------------|
| Admin | admin@example.com   | admin123     |
| User  | demo@example.com    | demo123      |

---

## 📦 Deployment

- **Frontend:** [https://mini-linkedin-frontend.vercel.app/](https://mini-linkedin-1-4t41.onrender.com)
- **Backend:** [https://mini-linkedin-backend.onrender.com/](https://mini-linkedin-143i.onrender.com)

---

## 💡 Extra Features (Optional)

- Toast notifications for actions like login, logout, post creation, etc.
- Dark mode toggle (if added)
- User bio word limit and validation
- Responsive design for mobile, tablet, and desktop

---

## 🧑‍💻 Author

Made with ❤️ by [thevaishndra](https://github.com/thevaishndra)

---

