 const API_URL = 'http://localhost:5000/api';

// Map course id to frontend image path (frontend/image/*.png)
const COURSE_IMAGES = {
  1: 'image/ai.png',
  2: 'image/css.png',
  3: 'image/cyber security.png',
  4: 'image/js.png',
  5: 'image/ml and ai.png',
  6: 'image/my sql.png',
  7: 'image/embeded.png',
  8: 'image/hardware.png',
  9: 'image/html.png',
  10: 'image/networking.png',
  11: 'image/python.png',
  12: 'image/robotics.png'
};

function getCourseImage(course) {
  return COURSE_IMAGES[course.id] || course.image_path || 'image/ai.png';
}

function esc(s) {
  if (s == null) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', () => {
    // Elements for Auth
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const userNameElement = document.getElementById('userName');

    // Elements for Courses
    const mainCourseGrid = document.getElementById('mainCourseGrid'); // Home page
    const dashboardGrid = document.getElementById('courseGrid');     // Dashboard page

    // Get User Data from LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // 1. Set User Profile Name
    if (user && userNameElement) {
        userNameElement.textContent = user.name;
    }

    // --- 2. REGISTRATION LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            try {
                const response = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await response.json().catch(() => ({}));

                if (response.ok) {
                    alert('✅ Account created! You can now login.');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || 'Registration failed.');
                }
            } catch (error) {
                alert('❌ Connection error. Is the server running?');
            }
        });
    }

    // --- 3. LOGIN LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch(`${API_URL}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json().catch(() => ({}));

                if (response.ok) {
                    alert('✅ Login Successful!');
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message || 'Invalid email or password.');
                }
            } catch (error) {
                alert('❌ Server error during login.');
            }
        });
    }

    // --- 4. HOME PAGE: LOAD ALL COURSES ---
    if (mainCourseGrid) {
        const loadAllCourses = async () => {
            try {
                const response = await fetch(`${API_URL}/courses`);
                const courses = await response.json().catch(() => []);
                if (!Array.isArray(courses)) {
                    mainCourseGrid.innerHTML = '<p>Error loading courses.</p>';
                    return;
                }
                mainCourseGrid.innerHTML = '';
                courses.forEach(course => {
                    const imgSrc = getCourseImage(course);
                    const card = document.createElement('div');
                    card.className = 'tech-card';
                    card.innerHTML = `
                        <div class="img-container">
                            <img src="${esc(imgSrc)}" alt="${esc(course.title)}" onerror="this.src='image/ai.png'">
                        </div>
                        <div class="tech-info">
                            <h3>${esc(course.title)}</h3>
                            <span>${esc(course.description)}</span>
                            <button class="enroll-btn" onclick="enrollUser(${Number(course.id)})">Enroll Now</button>
                        </div>
                    `;
                    mainCourseGrid.appendChild(card);
                });
            } catch (err) {
                mainCourseGrid.innerHTML = '<p>Error loading available courses.</p>';
            }
        };
        loadAllCourses();
    }

    // --- 5. DASHBOARD: LOAD ENROLLED COURSES ---
    if (dashboardGrid) {
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const loadDashboard = async () => {
            try {
                const response = await fetch(`${API_URL}/courses/user/${user.id}`);
                const courses = await response.json().catch(() => []);

                dashboardGrid.innerHTML = '';
                if (!Array.isArray(courses) || courses.length === 0) {
                    dashboardGrid.innerHTML = '<p>You haven\'t enrolled in any courses yet!</p>';
                    return;
                }

                courses.forEach(course => {
                    const imgSrc = getCourseImage(course);
                    const quizUrl = 'quiz.html?courseId=' + Number(course.id) + '&title=' + encodeURIComponent(course.title || 'Course');
                    const card = document.createElement('div');
                    card.className = 'course-card';
                    card.innerHTML = `
                        <img src="${esc(imgSrc)}" alt="${esc(course.title)}" onerror="this.src='image/ai.png'">
                        <div class="course-details">
                            <h4>${esc(course.title)}</h4>
                            <div class="progress"><div class="progress-fill" style="width:0%"></div></div>
                            <span class="progress-text">In Progress</span>
                            <button class="btn-primary" onclick="viewCourse(${Number(course.id)})">Continue</button>
                            <a href="${quizUrl}" class="btn-quiz">Take Quiz</a>
                        </div>
                    `;
                    dashboardGrid.appendChild(card);
                });
            } catch (error) {
                dashboardGrid.innerHTML = '<p>Error loading your dashboard.</p>';
            }
        };
        loadDashboard();
    }

    // --- 6. LOGOUT ---
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
});

// --- 7. GLOBAL FUNCTIONS (Outside DOMContentLoaded) ---

async function enrollUser(courseId) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert("Please login first to enroll!");
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/courses/enroll`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, courseId: courseId })
        });

        if (response.ok) {
            alert("✅ Enrollment Successful!");
            window.location.href = 'dashboard.html';
        } else {
            const data = await response.json().catch(() => ({}));
            alert(data.message || "You are already enrolled in this course.");
        }
    } catch (error) {
        alert("Server connection error.");
    }
}

function viewCourse(courseId) {
    window.location.href = `course-view.html?courseId=${courseId}`;
}