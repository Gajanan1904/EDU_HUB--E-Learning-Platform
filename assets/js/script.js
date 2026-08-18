/**
 * EDU_HUB — Unified LMS Platform Logic
 * Handles dark/light theme, navigation drawer, profile menu,
 * live test grade persistence, course filtering, and video completion.
 */

document.addEventListener('DOMContentLoaded', () => {
   // 1. Dark & Light Theme Controller
   const toggleBtn = document.getElementById('toggle-btn');
   const body = document.body;
   const darkMode = localStorage.getItem('dark-mode');

   const enableDarkMode = () => {
      if (toggleBtn) toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
   };

   const disableDarkMode = () => {
      if (toggleBtn) toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
   };

   if (darkMode === 'enabled') {
      enableDarkMode();
   } else {
      disableDarkMode();
   }

   if (toggleBtn) {
      toggleBtn.onclick = () => {
         const currentTheme = localStorage.getItem('dark-mode');
         if (currentTheme === 'disabled' || !currentTheme) {
            enableDarkMode();
         } else {
            disableDarkMode();
         }
      };
   }

   // 2. User Profile Dropdown & Search Form Toggles
   const profileDropdown = document.querySelector('.header .flex .profile');
   const userBtn = document.querySelector('#user-btn');
   const searchForm = document.querySelector('.header .flex .search-form');
   const searchBtn = document.querySelector('#search-btn');

   if (userBtn && profileDropdown) {
      userBtn.onclick = (e) => {
         e.stopPropagation();
         profileDropdown.classList.toggle('active');
         if (searchForm) searchForm.classList.remove('active');
      };
   }

   if (searchBtn && searchForm) {
      searchBtn.onclick = (e) => {
         e.stopPropagation();
         searchForm.classList.toggle('active');
         if (profileDropdown) profileDropdown.classList.remove('active');
      };
   }

   // 3. Left Sidebar Drawer Controller
   const sideBar = document.querySelector('.side-bar');
   const menuBtn = document.querySelector('#menu-btn');
   const closeBtn = document.querySelector('#close-btn');

   if (menuBtn && sideBar) {
      menuBtn.onclick = (e) => {
         e.stopPropagation();
         sideBar.classList.toggle('active');
         body.classList.toggle('active');
      };
   }

   if (closeBtn && sideBar) {
      closeBtn.onclick = () => {
         sideBar.classList.remove('active');
         body.classList.remove('active');
      };
   }

   // Close active popups when clicking outside or scrolling
   document.addEventListener('click', (e) => {
      if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== userBtn) {
         profileDropdown.classList.remove('active');
      }
      if (searchForm && !searchForm.contains(e.target) && e.target !== searchBtn) {
         if (window.innerWidth <= 768) {
            searchForm.classList.remove('active');
         }
      }
      if (window.innerWidth < 1200 && sideBar && !sideBar.contains(e.target) && e.target !== menuBtn) {
         sideBar.classList.remove('active');
         body.classList.remove('active');
      }
   });

   window.addEventListener('scroll', () => {
      if (profileDropdown) profileDropdown.classList.remove('active');
      if (searchForm && window.innerWidth <= 768) searchForm.classList.remove('active');
   }, { passive: true });

   // 4. Dynamic Grade & Assessment State Management
   const savedGrade = localStorage.getItem('eduhub_test_grade') || 'A+';
   const savedScore = localStorage.getItem('eduhub_test_score') || '5/5';
   const savedAttempt = localStorage.getItem('eduhub_test_attempt') || '01';

   document.querySelectorAll('.dynamic-grade').forEach(el => {
      el.textContent = `Grade: ${savedGrade}`;
   });
   document.querySelectorAll('.dynamic-score').forEach(el => {
      el.textContent = `Score: ${savedScore}`;
   });
   document.querySelectorAll('.dynamic-attempt').forEach(el => {
      el.textContent = `Test attempt: ${savedAttempt}`;
   });

   // 5. Course Catalog Filtering & Live Search
   const filterButtons = document.querySelectorAll('.filter-btn');
   const courseCards = document.querySelectorAll('.courses .box-container .box');
   const courseSearchInput = document.querySelector('#course-search-input') || document.querySelector('.header .search-form input');

   if (filterButtons.length > 0 && courseCards.length > 0) {
      filterButtons.forEach(btn => {
         btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');

            courseCards.forEach(card => {
               const cardCategory = card.getAttribute('data-category') || 'all';
               if (category === 'all' || cardCategory === category) {
                  card.style.display = 'flex';
               } else {
                  card.style.display = 'none';
               }
            });
         });
      });
   }

   if (courseSearchInput && courseCards.length > 0) {
      courseSearchInput.addEventListener('input', (e) => {
         const term = e.target.value.toLowerCase().trim();
         courseCards.forEach(card => {
            const title = (card.querySelector('.title') ? card.querySelector('.title').textContent : '').toLowerCase();
            if (title.includes(term)) {
               card.style.display = 'flex';
            } else {
               card.style.display = 'none';
            }
         });
      });
   }

   // 6. Interactive Video Lesson Completion Toggle
   const completeBtn = document.getElementById('mark-completed-btn');
   const completeBadge = document.getElementById('lesson-completed-badge');
   if (completeBtn) {
      const isCompleted = localStorage.getItem('eduhub_lesson_html_p1') === 'true';
      if (isCompleted && completeBadge) {
         completeBadge.style.display = 'inline-flex';
         completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
         completeBtn.style.backgroundColor = 'var(--green)';
      }

      completeBtn.addEventListener('click', () => {
         const currentlyDone = localStorage.getItem('eduhub_lesson_html_p1') === 'true';
         if (currentlyDone) {
            localStorage.setItem('eduhub_lesson_html_p1', 'false');
            if (completeBadge) completeBadge.style.display = 'none';
            completeBtn.innerHTML = '<i class="fas fa-check"></i> Mark as Completed';
            completeBtn.style.backgroundColor = 'var(--main-color)';
         } else {
            localStorage.setItem('eduhub_lesson_html_p1', 'true');
            if (completeBadge) completeBadge.style.display = 'inline-flex';
            completeBtn.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
            completeBtn.style.backgroundColor = 'var(--green)';
         }
      });
   }
});