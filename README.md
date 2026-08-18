# EDU_HUB — E-Learning Platform

**EDU_HUB** is a modern, responsive, and full-featured Learning Management System (LMS) web application. It features dark/light mode switching, an interactive testing & skill assessment engine, structured video course playlists, instructor profiles, dynamic search & category filtering, and student progress tracking.

---

## 🚀 Key Features

1. **Established LMS Identity & Navigation**:
   - **Left Sidebar**: Student avatar, student name, role badge, quick profile link, and navigation items with active page indicators.
   - **Top Header**: Brand logo, global course search bar, mobile sidebar toggle, user profile dropdown, and theme toggle.
   - **Theme Engine**: Complete **Light Mode** and **Dark Mode** parity with seamless switching and `localStorage` persistence.

2. **Student Dashboard (`index.html` & `pages/home.html`)**:
   - **YOUR GRADES**: Live assessment score and grade badge synchronized with the quiz engine via `localStorage`.
   - **Top Categories**: Quick filter pills (Development, Business, Design, Marketing, Music, Photography, Software, Science).
   - **Popular Topics**: Clickable tech badges (HTML, CSS, JavaScript, React, PHP, Bootstrap).
   - **Become a Tutor**: Educator outreach card.
   - **Our Courses**: Featured technical course tracks with direct playlist links.

3. **Course Catalog & Live Filter (`pages/courses.html`)**:
   - 9 full technical courses (HTML5, CSS3, JavaScript, Bootstrap, jQuery, SASS, PHP, MySQL, React).
   - Real-time client-side search and category filtering buttons (`All`, `Frontend Web`, `CSS & Styling`, `Backend & Database`).

4. **Interactive Quiz & Skill Assessment (`pages/exam.html`)**:
   - Skill assessment workflow: Guidelines Modal -> Question Progression -> Instant Feedback -> Result Breakdown.
   - Computes score, percentage, grade (`A+`, `A`, `B`, `C`), correct/incorrect count, and persists results to the dashboard.

5. **Video Playlist & Lecture Room (`pages/playlist.html` & `pages/watch-video.html`)**:
   - Modular lesson playlists with duration metadata.
   - Integrated HTML5 video lecture player with interactive **"Mark as Completed"** toggle, previous/next navigation, and discussion notes.

6. **Student & Instructor Directories**:
   - Student profile with enrolled tracks, saved playlists, liked videos, and test score (`pages/profile.html`, `pages/update.html`).
   - Instructor directory with total playlists, videos, and student review counts (`pages/teachers.html`, `pages/teacher_profile.html`).

7. **Support & Information**:
   - Verified About Us page with platform highlights and student testimonials (`pages/about.html`).
   - Contact form with validation and support details (`pages/contactpage.html`).
   - Clean authentication views (`pages/login.html`, `pages/register.html`).

---

## 📁 Project Architecture

```
EDU_HUB - E Learning platform/
├── index.html                    # Main EDU_HUB Student Dashboard Entry Point
├── README.md                     # Project Documentation
├── assets/
│   ├── css/
│   │   ├── style.css             # Unified LMS Design System (Light/Dark Mode, Sidebar, Grid)
│   │   └── exam.css              # Assessment Portal Stylesheet
│   ├── js/
│   │   ├── script.js             # Theme Engine, Dropdowns, Drawer, Grade & Filter Logic
│   │   ├── exam.js               # Interactive Quiz Execution Engine
│   │   └── questions.js          # Assessment Question Bank
│   └── images/                   # Media Assets (Avatars, Thumbnails, Postings, Video)
└── pages/
    ├── home.html                 # Student Dashboard
    ├── courses.html              # Course Catalog with Category Filter & Live Search
    ├── exam.html                 # Interactive Skill Assessment Portal
    ├── playlist.html             # Course Playlist & Lesson Hierarchy
    ├── watch-video.html          # Video Lecture Player with Completion Toggle
    ├── teachers.html             # Instructors Directory
    ├── teacher_profile.html      # Instructor Details & Authored Courses
    ├── profile.html              # Student Profile & Performance Records
    ├── update.html               # Profile Settings & Credentials Update
    ├── about.html                # About Us & Student Reviews
    ├── contactpage.html          # Contact Form & Support Details
    ├── login.html                # Student Login
    ├── register.html             # Student Registration
    └── signuppage.html           # Sign Up Page
```

---

## 💻 How to Run

1. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Alternatively, serve using any static web server:
   ```bash
   npx serve .
   ```
