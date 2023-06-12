const questions = [
  {
    question: 'Which is the largest animal in the world?',
    answers: [
      { text: 'Shark', correct: false },
      { text: 'Blue whale', correct: true },
      { text: 'Elephant', correct: false },
      { text: 'Giraffe', correct: false },
    ],
  },

  {
    question: 'Which is the smallest country in the world?',
    answers: [
      { text: 'Vatican City', correct: true },
      { text: 'Bhutan', correct: false },
      { text: 'Nepal', correct: false },
      { text: 'Shri Lanka', correct: false },
    ],
  },

  {
    question: 'Which is the largest desert in the world?',
    answers: [
      { text: 'Kalahari', correct: false },
      { text: 'Gobi', correct: false },
      { text: 'Sahara', correct: false },
      { text: 'Antarctica', correct: true },
    ],
  },

  {
    question: 'Which is the smallest continent in the world?',
    answers: [
      { text: 'Asia', correct: false },
      { text: 'Australia', correct: true },
      { text: 'Arctic', correct: false },
      { text: 'Africa', correct: false },
    ],
  },
];

const questionEl = document.getElementById('question');
const answerBtn = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIdx = 0;
let score = 0;

function startQuiz() {
  currentQuestionIdx = 0;
  score = 0;
  nextBtn.innerHTML = 'NEXT';
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIdx];
  let questionNum = currentQuestionIdx + 1;
  questionEl.innerHTML = questionNum + '.' + currentQuestion.question;
  currentQuestion.answers.forEach(ans => {
    const button = document.createElement('button');
    button.innerHTML = ans.text;
    button.classList.add('btn');
    answerBtn.appendChild(button);
    if (ans.correct) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }
  Array.from(answerBtn.children).forEach(button => {
    if (button.dataset.correct === 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nextBtn.style.display = 'block';
}

function showScore() {
  resetState();
  questionEl.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = 'PLAY AGAIN';
  nextBtn.style.display = 'block';
}

function handleNextBtn() {
  currentQuestionIdx++;
  if (currentQuestionIdx < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextBtn.addEventListener('click', () => {
  if (currentQuestionIdx < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});

startQuiz();
