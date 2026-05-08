# MERN Hacker News Assignment

A full-stack MERN application that scrapes the top stories from Hacker News and allows authenticated users to bookmark stories.

This project was built as part of a **Full Stack Developer (MERN)** assignment to demonstrate:

- Full-stack development
- REST API integration
- JWT authentication
- Web scraping
- Reusable frontend architecture
- Clean project structure

---

## Live Demo

| | URL |
|---|---|
| **Frontend** | https://dacby-assignment-frontend.vercel.app/ |
| **Backend** | https://dacby-assignment-phi.vercel.app/api |

## GitHub Repository

https://github.com/Dilesh333/dacby-assignment

---

## Assignment Requirements Covered

### Web Scraper

- Scrapes top 10 stories from Hacker News
- Extracts: Title, URL, Points, Author, Posted Time
- Saves stories in MongoDB
- Runs automatically on server startup
- Can also be triggered manually via API

### Backend APIs

**Authentication**
- `POST /api/auth/register`
- `POST /api/auth/login`

**Stories**
- `GET /api/stories`
- `GET /api/stories/:id`
- `POST /api/stories/:id/bookmark`

### Frontend Features

- Login & Registration
- JWT Authentication
- Protected Routes
- Persistent Login State
- Story Listing Page
- Bookmark Functionality
- Dedicated Bookmarks Page
- Responsive UI
- Reusable Components
- React Context API State Management

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Cheerio
- Axios

---

## Folder Structure

### Backend
```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── scraper/
├── config/
├── server.js
├── vercel.json
└── .env
```

### Frontend
```
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend `.env`
```
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## Local Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Dilesh333/dacby-assignment
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Stories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stories` | Get all stories |
| GET | `/api/stories/:id` | Get a single story |
| POST | `/api/stories/:id/bookmark` | Toggle bookmark |

### Scraper

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scrape` | Manually trigger scraper |

---

## UI & Architecture Highlights

- Clean reusable component architecture
- Protected routes using React Router
- Global authentication using React Context API
- Reusable `StoryCard` component
- Centralized Axios API configuration
- Responsive modern UI
- Persistent JWT authentication flow
- Minimal and recruiter-friendly frontend design

---

## Deployment

Both frontend and backend are deployed on **Vercel**.

- Frontend: Deployed as a static Vite/React app
- Backend: Deployed as a serverless Node.js/Express app

---

## Future Improvements

- Pagination support
- Search functionality
- Story filtering
- Dark mode
- User profile page
- Optimistic UI updates

---

## Author

Built by: **Dileswar Sahu**

---

## Submission Notes

This project follows the assignment requirements with:

- Multiple meaningful Git commits
- Clean scalable folder structure
- Reusable frontend components
- Backend API separation
- Production deployment setup
- Responsive frontend implementation
- Proper authentication flow
