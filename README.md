# 🚀 HackerNews Backend — Production-Ready Express + MongoDB

A clean, scalable, production-level MERN stack backend using **Node.js**, **Express**, and **MongoDB (Mongoose)**.

---

## 📁 Project Structure

```
backend/
├── config/              # Configuration files
│   └── db.js           # MongoDB connection logic
├── controllers/         # Business logic for routes
│   ├── authController.js
│   └── storyController.js
├── middleware/          # Express middleware
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   └── notFound.js
├── models/              # Mongoose schemas
│   ├── User.js
│   └── Story.js
├── routes/              # API route definitions
│   ├── authRoutes.js
│   └── storyRoutes.js
├── scraper/             # Web scraping logic
│   └── hnScraper.js
├── utils/               # Helper functions
│   ├── asyncHandler.js
│   └── generateToken.js
├── server.js            # Application entry point
├── .env                 # Environment variables (NEVER commit)
├── .gitignore           # Files Git should ignore
├── package.json         # Dependencies and scripts
└── README.md            # This file
```

---

## 🧠 Architecture Explained

### **Why Each Folder Exists**

| Folder | Purpose |
|--------|---------|
| **config/** | Centralized configuration (DB, external services). Keeps setup logic out of the main app. |
| **controllers/** | Business logic for each route. Routes stay thin; controllers do the work. |
| **middleware/** | Functions that intercept requests/responses (auth, error handling, logging). |
| **models/** | Mongoose schemas — each model maps to a MongoDB collection. |
| **routes/** | API endpoint definitions. Each resource (auth, stories) gets its own router. |
| **scraper/** | Web scraping logic, completely decoupled from the API layer. |
| **utils/** | Small, reusable helper functions that don't belong to any single layer. |

### **Why Middleware?**

Middleware functions intercept the request/response cycle. They let you:
- **Authenticate users** before they access protected routes
- **Handle errors** in one place instead of repeating try/catch everywhere
- **Parse JSON** bodies automatically
- **Enable CORS** for frontend communication

### **Why Separate DB Connection?**

Keeping `connectDB()` in `config/db.js` makes it:
- **Reusable** — import it anywhere (tests, scripts, etc.)
- **Testable** — mock it easily in unit tests
- **Maintainable** — swap databases without touching `server.js`

### **Why dotenv?**

`dotenv` loads environment variables from `.env` into `process.env`. This lets you:
- **Keep secrets out of code** (API keys, DB URIs, JWT secrets)
- **Use different configs per environment** (dev, staging, production)
- **Never commit sensitive data** to version control

### **Why .gitignore?**

`.gitignore` tells Git which files to never track:
- **node_modules/** — huge, reinstalled via `npm install`
- **.env** — contains secrets that must never be public
- **logs/** — temporary files that clutter the repo

---

## 🛠️ Installation & Setup

### **1. Install Dependencies**

```bash
npm install
```

### **2. Configure Environment Variables**

Edit `.env` and set your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/hackernews
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
```

### **3. Start MongoDB**

Make sure MongoDB is running locally:

```bash
# If using MongoDB Community Edition
mongod

# Or if using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### **4. Start the Server**

**Development mode (auto-restart on file changes):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

---

## ✅ Testing Steps

### **1. Health Check**

Open your browser or use `curl`:

```bash
curl http://localhost:5000/api/health
```

**Expected Output:**

```json
{
  "success": true,
  "message": "Server is up and running 🚀",
  "environment": "development",
  "timestamp": "2026-05-07T12:34:56.789Z"
}
```

### **2. Register a User**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**Expected Output:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "testuser",
    "email": "test@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### **3. Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### **4. Access Protected Route**

Use the token from login:

```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### **5. Get Stories**

```bash
curl http://localhost:5000/api/stories
```

---

## 📡 API Endpoints

### **Auth Routes** (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login and get JWT token | ❌ |
| GET | `/me` | Get current user profile | ✅ |

### **Story Routes** (`/api/stories`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all stories (paginated) | ❌ |
| GET | `/:id` | Get a single story by ID | ❌ |

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the server in production mode |
| `npm run dev` | Start the server with nodemon (auto-restart) |

---

## 🧪 Expected Terminal Output

When you run `npm run dev`, you should see:

```
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,json
[nodemon] starting `node server.js`
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
📡 Health check: http://localhost:5000/api/health
```

---

## 🔐 Security Best Practices

1. **Never commit `.env`** — it's in `.gitignore` for a reason
2. **Use strong JWT secrets** — generate with `openssl rand -base64 32`
3. **Hash passwords** — done automatically via bcrypt in the User model
4. **Validate input** — add validation middleware (e.g., express-validator)
5. **Rate limiting** — add `express-rate-limit` in production
6. **Helmet.js** — add security headers in production

---

## 🚀 Next Steps

- Add input validation (express-validator)
- Add rate limiting (express-rate-limit)
- Add logging (winston or morgan)
- Add tests (Jest + Supertest)
- Add API documentation (Swagger/OpenAPI)
- Deploy to production (Heroku, Railway, AWS, etc.)

---

## 📚 Technologies Used

- **Node.js** — JavaScript runtime
- **Express** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **JWT** — Authentication tokens
- **bcryptjs** — Password hashing
- **dotenv** — Environment variables
- **CORS** — Cross-origin resource sharing
- **Axios + Cheerio** — Web scraping

---

## 📝 License

MIT — feel free to use this for your own projects!
