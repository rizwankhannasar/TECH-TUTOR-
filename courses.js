 const express = require('express');
const router = express.Router();
const db = require('../config/db');

// 1. GET ALL COURSES
// Used by index.html to show all available classes
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. GET ENROLLED COURSES FOR A SPECIFIC USER
// Used by dashboard.html to show only courses the user has joined
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = `
        SELECT courses.* FROM courses 
        JOIN enrollments ON courses.id = enrollments.course_id 
        WHERE enrollments.user_id = ?`;
    
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. GET QUIZ QUESTIONS FOR A COURSE (10 MCQs)
router.get('/:id/quiz', (req, res) => {
  const courseId = req.params.id;
  const sql = 'SELECT id, course_id, question_text, option_a, option_b, option_c, option_d, correct_option FROM quiz_questions WHERE course_id = ? ORDER BY id ASC LIMIT 10';
  db.query(sql, [courseId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 4. GET LECTURES FOR A SPECIFIC COURSE
// Used by course-view.html to load the video playlist
router.get('/:id/lectures', (req, res) => {
    const courseId = req.params.id;
    const sql = 'SELECT * FROM lectures WHERE course_id = ? ORDER BY id ASC';
    
    db.query(sql, [courseId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 5. ENROLL A USER IN A COURSE
// Used by the "Enroll Now" button on the home page
router.post('/enroll', (req, res) => {
    const { userId, courseId } = req.body || {};

    if (!userId || !courseId) {
        return res.status(400).json({ message: "User ID and Course ID are required" });
    }

    const uid = parseInt(userId, 10);
    const cid = parseInt(courseId, 10);
    if (isNaN(uid) || isNaN(cid)) {
        return res.status(400).json({ message: "Invalid user or course ID" });
    }

    const sql = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
    db.query(sql, [uid, cid], (err, result) => {
        if (err) {
            // If there is a UNIQUE constraint in DB, this prevents double enrollment
            return res.status(400).json({ message: "Already enrolled or database error" });
        }
        res.status(201).json({ message: "Enrolled successfully" });
    });
});

module.exports = router;