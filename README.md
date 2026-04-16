# TechTutor - Online Learning Platform

## 📚 Project Overview

**TechTutor** is a comprehensive online learning management system (LMS) developed as a software engineering project at **MUST (Mirpur University of Science and Technology)**. The platform enables students to explore technical courses, enroll in them, watch video lectures, and test their knowledge through quizzes.

---

## 🏗️ Project Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs |
| **File Storage** | Local file system (uploads folder) |

---

## 📁 Project Structure

```
Tech-Tuter-main/
├── frontend/                    # Frontend files (HTML, CSS, JS)
│   ├── index.html              # Home page - course listing
│   ├── login.html              # User login page
│   ├── register.html           # User registration page
│   ├── dashboard.html          # User dashboard - enrolled courses
│   ├── course-view.html        # Course details & video lectures
│   ├── quiz.html               # Quiz interface
│   ├── about.html              # About page
│   ├── contact.html            # Contact page
│   ├── css/                    # Stylesheets
│   │   ├── style.css           # Main styles
│   │   ├── dashboard.css       # Dashboard styles
│   │   ├── quiz.css            # Quiz styles
│   │   └── contact.css         # Contact page styles
│   ├── js/                     # JavaScript files
│   │   ├── main.js             # Main frontend logic
│   │   └── api.js              # API integration
│   └── image/                  # Course images
│
├── backend/                     # Backend files (Node.js)
│   ├── server.js               # Express server entry point
│   ├── package.json            # Backend dependencies
│   ├── config/
│   │   └── db.js               # MySQL database connection
│   ├── routes/
│   │   ├── auth.js             # Authentication routes (login/register)
│   │   └── courses.js          # Course management routes
│   ├── sql/
│   │   └── quiz_questions.sql  # Quiz database schema & questions
│   └── uploads/                # Uploaded video lectures
│       ├── Ai/                 # Artificial Intelligence course videos
│       ├── css/                # CSS Development course videos
│       ├── cyber security/    # Cyber Security course videos
│       └── Javascrip/          # JavaScript course videos
│
├── package.json                # Root package.json
└── README.md                   # This file
```

---

## ✨ Features

### 1. User Authentication
- **Registration**: Users can create an account with name, email, and password
- **Login**: Secure login with password verification using bcryptjs
- **Session Management**: User data stored in localStorage after login

### 2. Course Management
- **Browse Courses**: View all available courses on the home page
- **Course Details**: View detailed course information
- **Enroll in Courses**: One-click enrollment system

### 3. Learning Features
- **Video Lectures**: Watch course videos organized by topic
- **Lecture Playlist**: Sequential video navigation
- **Progress Tracking**: Track enrolled courses in dashboard

### 4. Quiz System
- **Multiple Choice Questions**: 10 MCQs per course
- **Instant Feedback**: View results after quiz completion
- **Course-specific Quizzes**: Different quiz questions for each course

### 5. User Dashboard
- **Enrolled Courses**: View all courses user has joined
- **Quick Access**: Direct links to continue learning
- **Personalized Greeting**: Welcome message with user name

---

## 📋 Available Courses

| Course ID | Course Name | Description |
|-----------|-------------|-------------|
| 1 | Artificial Intelligence | Introduction to AI, ML, Neural Networks |
| 2 | CSS Development | Modern CSS, Flexbox, Responsive Design |
| 3 | Cyber Security | Security fundamentals, Encryption, Ethics |
| 4 | JavaScript Programming | JS basics, DOM, Functions, Arrays |

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Step 1: Database Setup

1. Open MySQL Workbench or MySQL CLI
2. Create a new database:
```
sql
CREATE DATABASE webproject;
USE webproject;
```

3. Create required tables:
```
sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(255)
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
);

-- Lectures table
CREATE TABLE IF NOT EXISTS lectures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    video_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    question_text VARCHAR(500) NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option ENUM('A','B','C','D') NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

4. Insert sample courses:
```
sql
INSERT INTO courses (name, description, image) VALUES
('Artificial Intelligence', 'Learn AI, Machine Learning & Deep Learning fundamentals', 'ai.png'),
('CSS Development', 'Master modern CSS, Flexbox, Grid & Responsive Design', 'css.png'),
('Cyber Security', 'Learn security fundamentals, encryption & ethical hacking', 'cyber security.png'),
('JavaScript Programming', 'Master JavaScript from basics to advanced concepts', 'js.png');
```

5. Run the quiz questions SQL file:
```
sql
SOURCE path/to/quiz_questions.sql;
```

### Step 2: Backend Configuration

1. Navigate to the backend folder:
```
bash
cd Tech-Tuter-main/backend
```

2. Install dependencies:
```
bash
npm install
```

3. Create a `.env` file in the backend directory:
```
env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=webproject
```

4. Start the server:
```
bash
npm start
```

The backend will run on `http://localhost:3000`

### Step 3: Frontend Setup

1. Simply open the `frontend/index.html` file in your browser, or use a local server:

Using Python:
```
bash
cd Tech-Tuter-main/frontend
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Course Routes (`/api/courses`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/user/:userId` | Get user's enrolled courses |
| GET | `/api/courses/:id/quiz` | Get quiz questions for a course |
| GET | `/api/courses/:id/lectures` | Get lectures for a course |
| POST | `/api/courses/enroll` | Enroll user in a course |

---

## 📱 Pages Overview

| Page | Description |
|------|-------------|
| `index.html` | Landing page with course listings |
| `login.html` | User login form |
| `register.html` | New user registration form |
| `dashboard.html` | User's enrolled courses |
| `course-view.html` | Course details with video lectures |
| `quiz.html` | Interactive quiz interface |
| `about.html` | About TechTutor |
| `contact.html` | Contact information |

---

## 🔐 Security Features

- Password hashing with bcryptjs
- Prepared statements to prevent SQL injection
- CORS enabled for API access
- Input validation on all forms

---

## 📦 Dependencies

### Backend
```
json
{
  "bcryptjs": "^3.0.3",
  "cors": "^2.8.6",
  "dotenv": "^17.2.3",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mysql2": "^3.16.2"
}
```

### Root
```
json
{
  "bcryptjs": "^3.0.3",
  "dotenv": "^17.2.3",
  "mysql2": "^3.16.2"
}
```

---

## 👨‍🎓 Project Information

- **Project Name**: TechTutor
- **Developed At**: MUST (Mirpur University of Science and Technology)
- **Department**: Software Engineering
- **Purpose**: Educational learning management system
- **Year**: 2026

---

## 📷 Screenshots

The project includes:
- Modern responsive UI design
- Course cards with images
- Video lecture player
- Interactive quiz interface
- User dashboard

---

## 🤝 Contributing

This is a student project for educational purposes. Feel free to fork and modify it for learning.

---

## 📄 License

This project is created for educational purposes at MUST University.

---

## 👨‍💻 Author

**TechTutor Team**
- Software Engineering Students
- Mirpur University of Science and Technology (MUST)

---

*Last Updated: 2026*
