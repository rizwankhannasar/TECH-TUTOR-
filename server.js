const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// --- 1. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- 2. API ROUTES (before static so /api/* is handled first) ---
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

app.get('/api/status', (req, res) => {
  res.json({ message: 'Server is online and API is reachable' });
});

// --- 3. UPLOADS (video files) ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- 4. FRONTEND (so opening http://localhost:5000 shows your site) ---
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:' + PORT);
  console.log('📂 Open in browser: http://localhost:' + PORT);
  console.log('📂 Videos: ' + path.join(__dirname, 'uploads'));
});
