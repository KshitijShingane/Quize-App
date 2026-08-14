const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const addQuestionScreen = document.getElementById("add-question-screen");

const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const addQuestionBtn = document.getElementById("add-question-btn");
const saveQuestionBtn = document.getElementById("save-question-btn");
const backHomeBtn = document.getElementById("back-home-btn");
const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const progressBar = document.getElementById("progress");
const timerText = document.getElementById("timer");

const scoreText = document.getElementById("score-text");
const percentageText = document.getElementById("percentage");
const highScoreText = document.getElementById("high-score");

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);

let timer;
let timeLeft = 15;

// ----------------------------
// Start Quiz
// ----------------------------

startBtn.addEventListener("click", () => {
    homeScreen.classList.remove("active");
    quizScreen.classList.add("active");

    loadQuestion();
});

// ----------------------------
// Load Question
// ----------------------------

function loadQuestion() {

    clearInterval(timer);
    timeLeft = 15;
    timerText.textContent = timeLeft;

    startTimer();

    const q = questions[currentQuestion];

    questionCount.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    questionText.textContent = q.question;

    progressBar.style.width =
        ((currentQuestion + 1) / questions.length) * 100 + "%";

    optionsContainer.innerHTML = "";

    q.options.forEach((option, index) => {

        const btn = document.createElement("button");

        btn.classList.add("option");

        btn.textContent = option;

        if (userAnswers[currentQuestion] === index) {
            btn.classList.add("selected");
        }

        btn.addEventListener("click", () => {

            userAnswers[currentQuestion] = index;

            loadQuestion();

        });

        optionsContainer.appendChild(btn);

    });

    prevBtn.disabled = currentQuestion === 0;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Finish";
    } else {
        nextBtn.textContent = "Next ➜";
    }

}

// ----------------------------
// Timer
// ----------------------------

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            if (currentQuestion === questions.length - 1) {

                showResult();

            } else {

                currentQuestion++;

                loadQuestion();

            }

        }

    }, 1000);

}

// ----------------------------
// Next
// ----------------------------

nextBtn.addEventListener("click", () => {

    if (currentQuestion === questions.length - 1) {

        showResult();

    } else {

        currentQuestion++;

        loadQuestion();

    }

});

// ----------------------------
// Previous
// ----------------------------

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// ----------------------------
// Result
// ----------------------------

function showResult() {

    clearInterval(timer);

    quizScreen.classList.remove("active");

    resultScreen.classList.add("active");

    let score = 0;

    for (let i = 0; i < questions.length; i++) {

        if (userAnswers[i] === questions[i].answer) {

            score++;

        }

    }

    let percentage = (score / questions.length) * 100;

    scoreText.textContent =
        `You scored ${score} / ${questions.length}`;

    percentageText.textContent =
        `Percentage : ${percentage}%`;

    let highScore =
        localStorage.getItem("highScore") || 0;

    if (score > highScore) {

        highScore = score;

        localStorage.setItem("highScore", score);

    }

    highScoreText.textContent =
        `High Score : ${highScore}`;

}

// ----------------------------
// Restart
// ----------------------------

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    userAnswers = new Array(questions.length).fill(null);

    resultScreen.classList.remove("active");

    homeScreen.classList.add("active");

});
// ----------------------------
// Add Question
// ----------------------------

addQuestionBtn.addEventListener("click", () => {
    homeScreen.classList.remove("active");
    addQuestionScreen.classList.add("active");
});

backHomeBtn.addEventListener("click", () => {
    addQuestionScreen.classList.remove("active");
    homeScreen.classList.add("active");
});

saveQuestionBtn.addEventListener("click", () => {

    const question = document.getElementById("new-question").value;
    const option1 = document.getElementById("option-1").value;
    const option2 = document.getElementById("option-2").value;
    const option3 = document.getElementById("option-3").value;
    const option4 = document.getElementById("option-4").value;
    const answer = Number(document.getElementById("correct-answer").value);

    if (
        question === "" ||
        option1 === "" ||
        option2 === "" ||
        option3 === "" ||
        option4 === ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    questions.push({
        question: question,
        options: [option1, option2, option3, option4],
        answer: answer
    });

    alert("Question added successfully!");

    document.getElementById("new-question").value = "";
    document.getElementById("option-1").value = "";
    document.getElementById("option-2").value = "";
    document.getElementById("option-3").value = "";
    document.getElementById("option-4").value = "";

    addQuestionScreen.classList.remove("active");
    homeScreen.classList.add("active");
});
