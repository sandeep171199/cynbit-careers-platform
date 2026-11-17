# Cynbit Careers – Full Stack Job Portal

A responsive full-stack job portal prototype built to demonstrate modern web development practices. The platform allows users to explore job listings, search and filter opportunities, view job details, and submit applications.

## Live Demo

- **Frontend:** https://cynbit-careers-platform.vercel.app
- **Backend API:** https://cynbit-careers-platform.onrender.com
- **GitHub Repository:** https://github.com/sandeep171199/cynbit-careers-platform

## Technologies Used

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- REST API
- Zod validation
- CORS

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel – Frontend
- Render – Backend
- MongoDB Atlas – Database hosting

## Features

- Responsive job portal interface.
- Display of job listings.
- Search jobs by keywords.
- Filter jobs by department and employment type.
- View detailed job descriptions.
- Bookmark job listings.
- Submit job applications.
- Server-side application validation.
- Duplicate application prevention.
- Persistent application storage using MongoDB.
- REST API integration between frontend and backend.

## Project Structure

```text
cynbit-careers-platform/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── data/
│   │   └── jobs.js
│   ├── database.js
│   ├── models/
│   │   └── Application.js
│   ├── routes/
│   │   ├── jobRoutes.js
│   │   └── applicationRoutes.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

### Jobs API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | Retrieve all job listings |
| GET | `/api/jobs?search=Python` | Search jobs |
| GET | `/api/jobs?department=Engineering` | Filter by department |
| GET | `/api/jobs/:id` | Retrieve a job by ID |

### Applications API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/applications` | Submit a job application |

The application endpoint validates submitted information, checks the job ID, prevents duplicate applications and stores valid applications in MongoDB.

### Health Check

`GET /api/health`

Checks whether the backend service is running.

## Local Setup Instructions

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or MongoDB connection string
- Git

### 1. Clone the repository

```bash
git clone https://github.com/sandeep171199/cynbit-careers-platform.git
cd cynbit-careers-platform
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 3. Start the backend

```bash
npm run dev
```

The backend runs at:

`http://localhost:5000`

### 4. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 5. Configure frontend API

Create a `.env` file inside the frontend folder:

```env
VITE_API_URL=http://localhost:5000
```

### 6. Start the frontend

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## Testing

The following functionality has been tested:

- Backend health check.
- Retrieval of all six demo job listings.
- Job search and department filtering.
- Retrieval of individual job details.
- Application form submission.
- Application validation and duplicate prevention.
- MongoDB application persistence.
- Live frontend and backend integration.

## Important Note

The current job listings are sample demonstration data created for this prototype. They should not be interpreted as verified active vacancies at Cynbit.

## Future Enhancements

- User registration and authentication.
- Recruiter dashboard.
- Admin job management.
- Application status tracking.
- Resume upload functionality.
- Pagination and advanced job filtering.
- Automated testing.
- Enhanced security and rate limiting.

## Author

**Sandeep S V**

- GitHub: https://github.com/sandeep171199
- LinkedIn: https://www.linkedin.com/in/sandeep-sv-128b30296
