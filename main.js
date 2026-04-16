 const API_URL = 'http://localhost:5000/api';

// Map course id/title to frontend image path (frontend/image/*.png)
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
    const userNameElement = document.getElementById('userName');
    const dashboardGrid = document.getElementById('courseGrid');     
    const mainCourseGrid = document.getElementById('mainCourseGrid'); 
    const logoutBtn = document.getElementById('logoutBtn');

    // 1. Get User Data from LocalStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // 2. Display User Name in Navbar/Dashboard
    if (user && userNameElement) {
        userNameElement.textContent = user.name;
    }

    // 3. HOME PAGE: Load All Available Courses (index.html)
    if (mainCourseGrid) {
        const loadAllCourses = async () => {
            try {
                const response = await fetch(`${API_URL}/courses`);
                if (!response.ok) throw new Error("Failed to fetch courses");
                const courses = await response.json().catch(() => []);
                if (!Array.isArray(courses)) {
                    mainCourseGrid.innerHTML = '<p>Failed to load courses.</p>';
                    return;
                }
                mainCourseGrid.innerHTML = '';
                courses.forEach(course => {
                    const card = document.createElement('div');
                    card.className = 'tech-card';
                    const imgSrc = getCourseImage(course);
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
                console.error(err);
                mainCourseGrid.innerHTML = '<p>Failed to load courses. Is the server running?</p>';
            }
        };
        loadAllCourses();
    }

    // 4. DASHBOARD: Load Only ENROLLED Courses (dashboard.html)
    if (dashboardGrid) {
        // Redirect to login if trying to access dashboard while logged out
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const loadDashboard = async () => {
            try {
                const response = await fetch(`${API_URL}/courses/user/${user.id}`);
                if (!response.ok) throw new Error("Failed to fetch user courses");
                const courses = await response.json();

                dashboardGrid.innerHTML = ''; 

                if (courses.length === 0) {
                    dashboardGrid.innerHTML = `
                        <div class="no-courses">
                            <p>You haven't enrolled in any courses yet!</p>
                            <a href="index.html" class="btn-primary">Browse Courses</a>
                        </div>`;
                    return;
                }

                courses.forEach(course => {
                    const card = document.createElement('div');
                    card.className = 'course-card';
                    const imgSrc = getCourseImage(course);
                    const quizUrl = 'quiz.html?courseId=' + Number(course.id) + '&title=' + encodeURIComponent(course.title || 'Course');
                    card.innerHTML = `
                        <img src="${esc(imgSrc)}" alt="${esc(course.title)}" onerror="this.src='image/ai.png'">
                        <div class="course-details">
                            <h4>${esc(course.title)}</h4>
                            <div class="progress">
                                <div class="progress-fill" style="width:0%"></div>
                            </div>
                            <span class="progress-text">0% Completed</span>
                            <button class="btn-primary" onclick="viewCourse(${Number(course.id)})">Continue</button>
                            <a href="${quizUrl}" class="btn-quiz">Take Quiz</a>
                        </div>
                    `;
                    dashboardGrid.appendChild(card);
                });
            } catch (error) {
                console.error('Dashboard Error:', error);
                dashboardGrid.innerHTML = '<p>Error loading your enrolled courses.</p>';
            }
        };
        loadDashboard();
    }

    // 5. Logout Functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
});

/** * --- GLOBAL FUNCTIONS ---
 * These must stay outside DOMContentLoaded so the HTML onclick events can find them.
 */

// Function: Enroll User in a Course
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
            window.location.href = 'dashboard.html';
        }
    } catch (error) {
        console.error("Enrollment Error:", error);
        alert("❌ Server connection error. Please try again later.");
    }
}

// Function: Redirect to Video Player with Course ID
function viewCourse(courseId) {
    // Passes the ID as a URL parameter: course-view.html?courseId=1
    window.location.href = `course-view.html?courseId=${courseId}`;
}