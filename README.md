
### 📸 MEMORIES – A MERN Stack Social Media Application

**MEMORIES** is a full-stack social media web application built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. The app allows users to create, edit, delete, and like posts — representing their favorite memories. It also features user authentication (JWT & Google OAuth), pagination, and a responsive UI.

---

### 🔧 Tech Stack

* **Frontend:** React.js, Redux, Material-UI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), Google OAuth
* **Deployment:** Render / Vercel / Netlify (Frontend), Render / Cyclic / Railway (Backend)

---

### You can also go in the Blueprit folder, if you want  step by step detailed explanation of the project features and code used.

---

### 💡 Features

* User Sign-up/Login with JWT & Google OAuth
* Create, edit, and delete memory posts
* Like posts and add tags
* Search memories by title or tags
* Paginated feed for better performance
* Responsive design for mobile and desktop

---

### 📁 Folder Structure Overview

```
client/         # React frontend
 └── src/
     └── components/   # PostCard, Form, Auth, Navbar, etc.
     └── actions/      # Redux action creators
     └── reducers/     # Redux reducers
     └── api/          # Axios calls to backend
     └── App.js        # Main component and routing

server/         # Express backend
 └── controllers/   # Logic for each route (posts, auth)
 └── models/        # Mongoose schemas
 └── routes/        # API routes
 └── middleware/    # Auth middleware
 └── index.js       # Entry point for backend
```
---

### 🚀 Getting Started

1. Clone the repository
2. Install dependencies in both `client` and `server` directories
3. Set up `.env` for API keys and MongoDB URI
4. Run both frontend and backend using `npm start` and `npm run dev`

---

Made with ❤️ by Akshunna Dhakad
📫 Reach me at: akshunna.dhakad07@gmail.com
