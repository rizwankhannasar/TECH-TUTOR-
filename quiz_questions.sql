-- Run this in MySQL Workbench (USE webproject; first)
-- Creates quiz_questions table and adds 10 MCQs per course

USE webproject;

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

-- Course 1: Artificial Intelligence (10 MCQs)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(1, 'What does AI stand for?', 'Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', 'Applied Inference', 'B'),
(1, 'Which is a type of Machine Learning?', 'Supervised Learning', 'Random Learning', 'Fixed Learning', 'Static Learning', 'A'),
(1, 'What is a neural network inspired by?', 'Human brain', 'Computer chips', 'Database tables', 'Networks', 'A'),
(1, 'What is "deep learning"?', 'Learning for a long time', 'Neural networks with many layers', 'Reading deep books', 'Advanced search', 'B'),
(1, 'Which programming language is commonly used in AI?', 'HTML', 'Python', 'CSS', 'SQL', 'B'),
(1, 'What is supervised learning?', 'Learning without labels', 'Learning with labeled data', 'Learning by reward', 'Learning from clusters', 'B'),
(1, 'What does NLP stand for?', 'Natural Language Processing', 'Network Layer Protocol', 'New Learning Program', 'Number Logic Process', 'A'),
(1, 'What is reinforcement learning?', 'Learning from labels', 'Learning from rewards/punishments', 'Learning from clusters', 'Learning from books', 'B'),
(1, 'Which is an application of AI?', 'Video player', 'Chatbots', 'Calculator', 'Text editor', 'B'),
(1, 'What is computer vision?', 'Eyes for computers', 'Teaching computers to understand images', 'Screen display', 'Camera hardware', 'B');

-- Course 2: CSS Development (10 MCQs)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(2, 'What does CSS stand for?', 'Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Color Style Sheets', 'B'),
(2, 'Which property changes text color?', 'font-color', 'text-color', 'color', 'text-style', 'C'),
(2, 'How do you center an element with flexbox?', 'align: center', 'justify-content: center', 'center: true', 'flex: center', 'B'),
(2, 'What is the box model?', 'Content, padding, border, margin', 'Width and height only', 'Div only', 'Layout only', 'A'),
(2, 'Which unit is relative to root font size?', 'px', 'em', 'rem', 'pt', 'C'),
(2, 'What does "responsive design" mean?', 'Fast loading', 'Layout adapts to screen size', 'Many colors', 'Animated', 'B'),
(2, 'Which selects an element by id?', '.myId', '#myId', 'id(myId)', 'element(myId)', 'B'),
(2, 'What is a media query used for?', 'Playing media', 'Applying styles based on screen size', 'Loading images', 'Audio only', 'B'),
(2, 'Which property creates space between items?', 'space', 'gap', 'margin-between', 'padding-between', 'B'),
(2, 'What does z-index control?', 'Horizontal position', 'Vertical position', 'Stacking order', 'Size', 'C');

-- Course 3: Cyber Security (10 MCQs)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(3, 'What is phishing?', 'Fishing in the sea', 'Fake emails/sites to steal data', 'A type of virus', 'Encryption', 'B'),
(3, 'What does HTTPS provide?', 'Faster speed', 'Encrypted connection', 'More storage', 'Better design', 'B'),
(3, 'What is a strong password?', '123456', 'Long, mixed characters', 'Your name', 'Password', 'B'),
(3, 'What is two-factor authentication?', 'Two passwords', 'Second step to verify identity', 'Two accounts', 'Double login', 'B'),
(3, 'What is malware?', 'Good software', 'Malicious software', 'Hardware', 'Browser', 'B'),
(3, 'What is a firewall?', 'Physical wall', 'Security that blocks unauthorized access', 'A type of virus', 'Backup', 'B'),
(3, 'What does VPN do?', 'Speeds up internet', 'Encrypts and hides your traffic', 'Stores files', 'Sends email', 'B'),
(3, 'What is encryption?', 'Deleting data', 'Scrambling data so only authorized can read', 'Copying data', 'Moving data', 'B'),
(3, 'What is a vulnerability?', 'A feature', 'A weakness that can be exploited', 'A backup', 'A password', 'B'),
(3, 'What is ethical hacking?', 'Illegal hacking', 'Authorized testing to find weaknesses', 'Stealing data', 'Breaking systems', 'B');

-- Course 4: JavaScript Programming (10 MCQs)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES
(4, 'Which keyword declares a variable?', 'variable', 'var, let, or const', 'set', 'new', 'B'),
(4, 'What is an array?', 'A single value', 'Ordered list of values', 'A function', 'A loop', 'B'),
(4, 'Which is a loop in JavaScript?', 'if', 'for', 'switch', 'try', 'B'),
(4, 'What does DOM stand for?', 'Data Object Model', 'Document Object Model', 'Digital Output Mode', 'Display Order Model', 'B'),
(4, 'Which is used to run code after a delay?', 'wait()', 'setTimeout()', 'delay()', 'after()', 'B'),
(4, 'What is a function?', 'A variable', 'Reusable block of code', 'A string', 'A number', 'B'),
(4, 'Which gets an element by ID?', 'getElementById()', 'findId()', 'element()', 'selectId()', 'A'),
(4, 'What does === mean?', 'Approximate', 'Strict equality (value and type)', 'Assign', 'Compare strings only', 'B'),
(4, 'What is JSON?', 'A programming language', 'JavaScript Object Notation - data format', 'A library', 'A framework', 'B'),
(4, 'Which method adds to end of array?', 'push()', 'add()', 'append()', 'insert()', 'A');
