const questions = [
  {
    question: "FBG, GBF, HBI, IBH, ____? Boşluğu doldur",
    answers: [
      { text: "HBL", correct: false },
      { text: "HBK", correct: false },
      { text: "JBK", correct: true },
      { text: "JBI", correct: false },
    ],
  },
  {
    question:
      "PAZAR, PAZARTESİ, ÇARŞAMBA, CUMARTESİ, ÇARŞAMBA,……? Sonraki gün hangisi?",
    answers: [
      { text: "PAZAR", correct: false },
      { text: "PAZARTESİ", correct: true },
      { text: "ÇARŞAMBA", correct: false },
      { text: "CUMARTESİ", correct: false },
    ],
  },
  {
    question: "Bir küpte kaç köşe vardır?",
    answers: [
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "8", correct: true },
      { text: "9", correct: false },
    ],
  },
  {
    question: "'Mutlu' kelimesinin eşanlamlısını seçin.",
    answers: [
      { text: "Kasvetli", correct: false },
      { text: "Neşeli", correct: true },
      { text: "Üzgün", correct: false },
      { text: "Kızgın", correct: false },
    ],
  },
];
const question = document.querySelector("#question");
const answerBtn = document.querySelector("#answer-button");
const nextBtn = document.querySelector("#nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  ShowQuestion();
}

function ShowQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let QuestionNo = currentQuestionIndex + 1;
  question.innerHTML = QuestionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  };
};

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  question.innerHTML = `Your scored ${score} out of ${questions.length}!!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    ShowQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
