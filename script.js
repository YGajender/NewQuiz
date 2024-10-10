const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const scoreLink = document.getElementById('score');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
    {
        question: 'What is the capital of India?',
        answers: [
            { text: 'Mumbai', correct: false },
            { text: 'New Delhi', correct: true },
            { text: 'Kolkata', correct: false },
            { text: 'Bangalore', correct: false }
        ]
    },
    {
        question: 'Which river is considered the holiest river in India?',
        answers: [
            { text: 'Yamuna', correct: false },
            { text: 'Ganges', correct: true },
            { text: 'Brahmaputra', correct: false },
            { text: 'Godavari', correct: false }
        ]
    },
    {
        question: 'Who is known as the "Father of the Nation" in India?',
        answers: [
            { text: 'Jawaharlal Nehru', correct: false },
            { text: 'Sardar Vallabhbhai Patel', correct: false },
            { text: 'Mahatma Gandhi', correct: true },
            { text: 'B.R. Ambedkar', correct: false }
        ]
    },
    {
        question: 'Which festival is known as the "Festival of Lights"?',
        answers: [
            { text: 'Holi', correct: false },
            { text: 'Diwali', correct: true },
            { text: 'Eid', correct: false },
            { text: 'Christmas', correct: false }
        ]
    },
    {
        question: 'Which is the national animal of India?',
        answers: [
            { text: 'Lion', correct: false },
            { text: 'Tiger', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Peacock', correct: false }
        ]
    },
    {
        question: 'Which state is known as the "Land of Five Rivers"?',
        answers: [
            { text: 'Punjab', correct: true },
            { text: 'Haryana', correct: false },
            { text: 'Uttar Pradesh', correct: false },
            { text: 'Rajasthan', correct: false }
        ]
    },
    {
        question: 'What is the national flower of India?',
        answers: [
            { text: 'Lotus', correct: true },
            { text: 'Rose', correct: false },
            { text: 'Sunflower', correct: false },
            { text: 'Marigold', correct: false }
        ]
    },
    {
        question: 'Which is the longest river in India?',
        answers: [
            { text: 'Ganges', correct: false },
            { text: 'Yamuna', correct: false },
            { text: 'Brahmaputra', correct: true },
            { text: 'Godavari', correct: false }
        ]
    },
    {
        question: 'Which is the largest state in India by area?',
        answers: [
            { text: 'Maharashtra', correct: false },
            { text: 'Rajasthan', correct: true },
            { text: 'Uttar Pradesh', correct: false },
            { text: 'Gujarat', correct: false }
        ]
    },
    {
        question: 'Who is the author of the Indian national anthem?',
        answers: [
            { text: 'Rabindranath Tagore', correct: true },
            { text: 'Allama Iqbal', correct: false },
            { text: 'Sarojini Naidu', correct: false },
            { text: 'Lata Mangeshkar', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
scoreLink.addEventListener('click', showScore);
restartButton.addEventListener('click', restartQuiz);

function startGame() {
    startButton.classList.add('hidden');
    scoreContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    startTimer();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    timerElement.innerText = '5';
    clearInterval(timer);
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    clearInterval(timer);
    if (answer.correct) {
        score++;
    } else {
        alert('Wrong answer. Try again!');
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    if (isLastQuestion) {
        nextButton.innerText = 'Finish';
    } else {
        nextButton.classList.remove('hidden');
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        questionContainer.classList.add('hidden');
        scoreContainer.classList.remove('hidden');
        finalScoreElement.innerText = `${score} out of ${questions.length}`;
    }
});

function showScore() {
    alert(`Your current score: ${score} out of ${questions.length}`);
}

function restartQuiz() {
    scoreContainer.classList.add('hidden');
    startButton.classList.remove('hidden');
}

function startTimer() {
    let timeLeft = 5;
    timerElement.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Time is up!');
            selectAnswer({ correct: false });
        }
    }, 1000);
}
