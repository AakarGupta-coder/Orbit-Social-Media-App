# 🚀 Orbit — A Space-Themed MERN Social Media App

> Connect. Explore. Discover the Universe — Together.

**Orbit** is a full-stack social media application with a cosmic twist — built using the powerful MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to share posts, interact with others, and experience a galaxy of features, all within a sleek space-themed interface.

---

## 🌌 Key Features

### 🔐 Authentication
- User registration and login
- Password encryption with bcrypt
- Token-based authentication using JWT
- Secure access to private routes

### 📸 Post Management
- Create, read, update, and delete posts (CRUD)
- Upload and display images
- Like/unlike posts
- Comment on posts
- Real-time UI updates

### 👤 User Profiles
- View your profile with avatar, bio, and personal posts
- Visit and explore other users’ profiles
- Edit user details (name, bio, profile picture)

### 🏠 Home Feed
- Scroll through posts from users across the platform
- Display likes and comments
- Responsive design for mobile and desktop

### ⚙️ Under Development / Upcoming Features
- 🧠 AI-powered content recommendation system
- 🔍 Smart search bar for users and content
- 🗓️ Integrated calendar for scheduling posts/events
- 🌌 Discussion forum for group-based communication
- 🤖 AI assistant chatbot for personalized interaction

---

## 🌐 Tech Stack

| Layer        | Technologies Used                                  |
|--------------|----------------------------------------------------|
| Frontend     | React.js, Redux, CSS Modules, Axios                |
| Backend      | Node.js, Express.js                                |
| Database     | MongoDB, Mongoose                                  |
| Authentication | JWT, bcrypt                                     |
| Dev Tools    | Nodemon, Concurrently, dotenv                      |

---

## 🗂️ Folder Structure

```
orbit/
├── client/         # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── utils/
│
├── server/         # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
├── .env
├── README.md
└── package.json
```

---

## 🛠️ Getting Started

### 📦 Prerequisites

Make sure you have the following installed:
- Node.js (v14 or above)
- npm
- MongoDB Atlas or local instance
- Git

---

### 🚀 Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `server/` directory and add the following:
   ```
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   ```

4. Start the backend server using Nodemon:
   ```bash
   nodemon index.js
   ```

---

### 🌠 Frontend Setup

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

> The app will run on [http://localhost:3000](http://localhost:3000)

---

## 🧪 Sample Test Accounts

Once the platform reaches the **testing phase** — when both the backend and frontend are working seamlessly together — you can register using test credentials of your choice and explore the application functionality.

There’s no need for predefined accounts; simply **sign up**, log in, and start orbiting through the features.

---


## 🤝 Contributing

Contributions, ideas, and suggestions are welcome! If you find a bug or have an idea for a feature, feel free to open an issue or create a pull request.

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0**.
You are free to use, modify, and distribute this software under the terms of the [GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.html).
© 2025 Aakar Gupta. All rights reserved.

---

## 👨‍💻 Developer

**Aakar Gupta**, CS Engineering Student  
📧 Email: ak10.aakar@gmail.com  
📍 Vellore Institute of Technology, Chennai  
🌐 [LinkedIn](https://www.linkedin.com/in/aakar-gupta-coder/)
> *"You're not just posting... you're launching your thoughts into orbit."*
