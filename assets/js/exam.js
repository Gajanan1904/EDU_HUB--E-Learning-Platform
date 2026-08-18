/**
 * EDU_HUB — Interactive Exam & Quiz Engine
 * Manages question flow, instant feedback, scoring, result breakdown,
 * and persistence to the student dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
   const startBtn = document.querySelector('.start-btn');
   const popupInfo = document.querySelector('.popup-info');
   const exitBtn = document.querySelector('.exit-btn');
   const main = document.querySelector('.main');
   const continueBtn = document.querySelector('.continue-btn');
   const homeSection = document.querySelector('.home');
   const quizSection = document.querySelector('.quiz-section');
   const quizBox = document.querySelector('.quiz-box');
   const resultBox = document.querySelector('.result-box');
   const nextBtn = document.querySelector('.next-btn');
   const optionList = document.querySelector('.option-list');
   const headerScore = document.querySelector('.header-score');
   const questionTotal = document.querySelector('.question-total');
   const questionText = document.querySelector('.question-text');

   let questionCount = 0;
   let questionNumb = 1;
   let userScore = 0;

   // 1. Popup Guide Handlers
   if (startBtn) {
      startBtn.onclick = () => {
         if (popupInfo) popupInfo.classList.add('active');
         if (main) main.classList.add('active');
      };
   }

   if (exitBtn) {
      exitBtn.onclick = () => {
         if (popupInfo) popupInfo.classList.remove('active');
         if (main) main.classList.remove('active');
      };
   }

   if (continueBtn) {
      continueBtn.onclick = (e) => {
         e.preventDefault();
         // Hide the intro welcome card completely when assessment begins
         if (homeSection) homeSection.style.display = 'none';
         if (quizSection) quizSection.classList.add('active');
         if (popupInfo) popupInfo.classList.remove('active');
         if (main) main.classList.remove('active');
         if (quizBox) quizBox.classList.add('active');
         if (resultBox) resultBox.classList.remove('active');

         questionCount = 0;
         questionNumb = 1;
         userScore = 0;
         if (nextBtn) {
            nextBtn.textContent = 'Next';
            nextBtn.classList.remove('active');
         }
         showQuestions(0);
         questionCounter(1);
         updateHeaderScore();
      };
   }

   // 2. Question Progression
   if (nextBtn) {
      nextBtn.onclick = () => {
         if (questionCount < questions.length - 1) {
            questionCount++;
            questionNumb++;
            showQuestions(questionCount);
            questionCounter(questionNumb);
            nextBtn.classList.remove('active');
            if (questionCount === questions.length - 1) {
               nextBtn.textContent = 'Submit Test';
            }
         } else {
            showResultBox();
         }
      };
   }

   // 3. Render Question & Options
   function showQuestions(index) {
      if (!questionText || !optionList) return;
      questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

      let optionTag = '';
      for (let i = 0; i < questions[index].options.length; i++) {
         optionTag += `<div class="option" data-option="${questions[index].options[i]}"><span>${questions[index].options[i]}</span></div>`;
      }
      optionList.innerHTML = optionTag;

      const options = optionList.querySelectorAll('.option');
      options.forEach(opt => {
         opt.addEventListener('click', function () {
            optionSelected(this);
         });
      });
   }

   // 4. Option Selection Handler
   function optionSelected(selectedOption) {
      const userAnswer = selectedOption.getAttribute('data-option');
      const correctAnswer = questions[questionCount].answer;
      const allOptions = optionList.children.length;

      if (userAnswer === correctAnswer) {
         selectedOption.classList.add('correct');
         selectedOption.insertAdjacentHTML('beforeend', '<i class="fas fa-check" style="float: right; margin-top: 2px;"></i>');
         userScore += 1;
         updateHeaderScore();
      } else {
         selectedOption.classList.add('incorrect');
         selectedOption.insertAdjacentHTML('beforeend', '<i class="fas fa-times" style="float: right; margin-top: 2px;"></i>');

         // Automatically highlight correct answer
         for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].getAttribute('data-option') === correctAnswer) {
               optionList.children[i].classList.add('correct');
               optionList.children[i].insertAdjacentHTML('beforeend', '<i class="fas fa-check" style="float: right; margin-top: 2px;"></i>');
            }
         }
      }

      // Disable all other options
      for (let i = 0; i < allOptions; i++) {
         optionList.children[i].classList.add('disabled');
      }

      if (nextBtn) nextBtn.classList.add('active');
   }

   function questionCounter(index) {
      if (questionTotal) {
         questionTotal.textContent = `${index} of ${questions.length} Questions`;
      }
   }

   function updateHeaderScore() {
      if (headerScore) {
         headerScore.textContent = `Score: ${userScore} / ${questions.length}`;
      }
   }

   // 5. Result Summary Display & Persistence
   function showResultBox() {
      if (quizBox) quizBox.classList.remove('active');
      if (resultBox) resultBox.classList.add('active');

      const percentage = Math.round((userScore / questions.length) * 100);
      let grade = 'A+';
      if (percentage < 60) grade = 'C';
      else if (percentage < 80) grade = 'B';
      else if (percentage < 90) grade = 'A';

      // Save to localStorage for dashboard synchronization
      const currentAttempts = parseInt(localStorage.getItem('eduhub_test_attempt') || '0', 10) + 1;
      const attemptStr = currentAttempts < 10 ? `0${currentAttempts}` : `${currentAttempts}`;
      localStorage.setItem('eduhub_test_grade', grade);
      localStorage.setItem('eduhub_test_score', `${userScore}/${questions.length}`);
      localStorage.setItem('eduhub_test_attempt', attemptStr);

      const scoreText = document.querySelector('.score-text');
      const gradeBadge = document.querySelector('.result-grade-badge');
      const correctCount = document.querySelector('.stat-correct');
      const incorrectCount = document.querySelector('.stat-incorrect');

      if (scoreText) scoreText.textContent = `You scored ${userScore} out of ${questions.length} (${percentage}%)`;
      if (gradeBadge) gradeBadge.textContent = `Grade: ${grade}`;
      if (correctCount) correctCount.textContent = `${userScore}`;
      if (incorrectCount) incorrectCount.textContent = `${questions.length - userScore}`;
   }

   // Restart Quiz
   const restartBtn = document.querySelector('.restart-btn');
   if (restartBtn) {
      restartBtn.onclick = () => {
         if (resultBox) resultBox.classList.remove('active');
         if (quizBox) quizBox.classList.add('active');
         if (homeSection) homeSection.style.display = 'none';
         questionCount = 0;
         questionNumb = 1;
         userScore = 0;
         if (nextBtn) {
            nextBtn.textContent = 'Next';
            nextBtn.classList.remove('active');
         }
         showQuestions(0);
         questionCounter(1);
         updateHeaderScore();
      };
   }
});