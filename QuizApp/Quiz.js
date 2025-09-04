// DOM Elements
const statement = document.getElementById("statement");
const optionButtons = document.querySelectorAll("#options button");
const explanation = document.getElementById("explanation");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionCounter = document.getElementById("question-counter");
const scoreDisplay = document.getElementById("score-display");
const finalResults = document.getElementById("final-results");
const finalScore = document.getElementById("final-score");
const percentage = document.getElementById("percentage");

// Quiz Data
const quizQuestions = [
    {
        statement: "JavaScript is a statically typed language.",
        answer: false,
        explanation: "JavaScript is a dynamically typed language. Variables can hold different types of values and their types can change during runtime."
    },
    {
        statement: "In JavaScript, null is considered equal to undefined when using the == operator.",
        answer: true,
        explanation: "The loose equality operator (==) performs type coercion, so null == undefined evaluates to true. However, null !== undefined with strict equality."
    },
    {
        statement: "JavaScript functions are first-class objects.",
        answer: true,
        explanation: "In JavaScript, functions are first-class objects, meaning they can be assigned to variables, passed as arguments, and returned from other functions."
    },
    {
        statement: "The 'let' keyword was introduced in ES5.",
        answer: false,
        explanation: "The 'let' keyword was introduced in ES6 (ES2015), not ES5. It provides block-scoped variable declarations."
    },
    {
        statement: "JavaScript arrays can only contain elements of the same type.",
        answer: false,
        explanation: "JavaScript arrays are dynamic and can contain elements of different types (numbers, strings, objects, etc.) in the same array."
    },
    {
        statement: "The '===' operator performs type coercion.",
        answer: false,
        explanation: "The '===' operator (strict equality) does NOT perform type coercion. It compares both value and type. The '==' operator performs type coercion."
    },
    {
        statement: "JavaScript is single-threaded.",
        answer: true,
        explanation: "JavaScript is single-threaded, but it uses an event loop and asynchronous callbacks to handle concurrent operations without blocking the main thread."
    },
    {
        statement: "The 'this' keyword always refers to the global object.",
        answer: false,
        explanation: "The 'this' keyword's value depends on how a function is called. It can refer to different objects based on the execution context."
    },
    {
        statement: "JavaScript supports automatic semicolon insertion (ASI).",
        answer: true,
        explanation: "JavaScript automatically inserts semicolons at the end of statements in certain situations, though it's considered best practice to include them explicitly."
    },
    {
        statement: "All JavaScript objects inherit from Object.prototype.",
        answer: false,
        explanation: "While most objects inherit from Object.prototype, you can create objects with Object.create(null) that have no prototype chain."
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Utility Functions
const disable = (button) => {
    button.setAttribute("disabled", "");
};

const enable = (button) => {
    button.removeAttribute("disabled");
};

const isCorrect = (guessString) => {
    return guessString === quizQuestions[currentQuestionIndex].answer.toString();
};

// Quiz Functions
function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    statement.textContent = currentQuestion.statement;
    explanation.textContent = "";
    answered = false;
    
    // Reset button states
    optionButtons.forEach(button => {
        enable(button);
        button.classList.remove("correct", "incorrect");
    });
    
    // Hide next button
    nextBtn.style.display = "none";
    
    // Update question counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Update score display
    scoreDisplay.textContent = `Score: ${score}/${quizQuestions.length}`;
}

function handleAnswer(selectedButton) {
    if (answered) return;
    
    answered = true;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const guess = selectedButton.value;
    
    // Show explanation
    explanation.textContent = currentQuestion.explanation;
    
    // Disable all buttons
    optionButtons.forEach(button => disable(button));
    
    // Check if answer is correct
    if (isCorrect(guess)) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
        // Also highlight the correct answer
        const correctValue = currentQuestion.answer.toString();
        optionButtons.forEach(button => {
            if (button.value === correctValue) {
                button.classList.add("correct");
            }
        });
    }
    
    // Update score display
    scoreDisplay.textContent = `Score: ${score}/${quizQuestions.length}`;
    
    // Show next button or finish quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextBtn.style.display = "inline-block";
    } else {
        setTimeout(showFinalResults, 1500);
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    // Hide quiz elements
    document.getElementById("quiz-info").style.display = "none";
    statement.style.display = "none";
    document.getElementById("options").style.display = "none";
    explanation.style.display = "none";
    document.getElementById("controls").style.display = "none";
    
    // Show final results
    finalResults.style.display = "block";
    const percentageScore = Math.round((score / quizQuestions.length) * 100);
    
    finalScore.textContent = `Final Score: ${score} out of ${quizQuestions.length}`;
    percentage.textContent = `Percentage: ${percentageScore}%`;
    
    // Add performance message
    let performanceMessage = "";
    if (percentageScore >= 90) {
        performanceMessage = "🎉 Excellent! You're a JavaScript expert!";
    } else if (percentageScore >= 70) {
        performanceMessage = "👍 Good job! You have a solid understanding of JavaScript!";
    } else if (percentageScore >= 50) {
        performanceMessage = "📚 Not bad! Keep studying to improve your JavaScript knowledge!";
    } else {
        performanceMessage = "💪 Don't give up! Practice more to master JavaScript fundamentals!";
    }
    
    percentage.innerHTML += `<br><br>${performanceMessage}`;
    
    // Show restart button
    restartBtn.style.display = "inline-block";
}

function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    
    // Show quiz elements
    document.getElementById("quiz-info").style.display = "flex";
    statement.style.display = "block";
    document.getElementById("options").style.display = "flex";
    explanation.style.display = "block";
    document.getElementById("controls").style.display = "block";
    
    // Hide final results
    finalResults.style.display = "none";
    restartBtn.style.display = "none";
    
    // Start quiz
    displayQuestion();
}

// Event Listeners
optionButtons.forEach(button => {
    button.addEventListener("click", () => handleAnswer(button));
});

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

// Initialize Quiz
displayQuestion();
