let timerTotal = 40;
let answer = true;
let counterQuestion = 0;
let counterCorrectAnsw = 0;
let state = "easy";
let bestScore = 0;

function generateNumber() {
    let num1El = document.getElementById("num1");
    let num2El = document.getElementById("num2");
    let num3El = document.getElementById("num3");

    let op1El = document.getElementById("op1");
    let op2El = document.getElementById("op2");

    let num1 = Math.floor(Math.random() * 20) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    let num3 = Math.floor(Math.random() * 20) + 1;

    let op1 = operatorChoice(num1, num2, num3);
    let op2 = operatorChoice(num1, num2, num3);

    num1El.textContent = num1;
    num2El.textContent = num2;
    num3El.textContent = num3;

    op1El.textContent = op1;
    op2El.textContent = op2;
}

function operatorChoice(num1, num2, num3) {
    let operator;
    let random = Math.random();

    if (state === "easy") {
        if (random < 0.5) {
            operator = "+";
        } 
        else {
            operator = "-";
        } 
    }
    else if (state === "medium") {
        if (random < 0.3) {
            operator = "+";
        } 
        else if (random > 0.3 && random < 0.6) {
            operator = "-";
        }
        else {
            operator = "*";
        }
    }
    else if (state === "hard") {
        if (random < 0.25) {
            operator = "+";
        } 
        else if (random < 0.5) {
            operator = "-";
        }
        else if (random < 0.75) {
            operator = "*";
        }
        else {
            if (Number.isInteger(num1 / num2 || nu2 / num3)) {
                operator = "/";  
            }
            else {
                operator = "*";
            }
        }
    }

    return operator;
}


function calculateQestion(num1, num2, num3, op1, op2) {
    let firstOperation = `${num1} ${op1} ${num2}`;
    let secondOperation = `${firstOperation} ${op2} ${num3}`;

    return eval(secondOperation);
}


function checkAnswer() {
    const button = document.getElementById("checkAnswer");
    const inputField = document.getElementById("answer");

    button.addEventListener("click", function() {
        let num1 = parseInt(document.getElementById("num1").textContent);
        let num2 = parseInt(document.getElementById("num2").textContent);
        let num3 = parseInt(document.getElementById("num3").textContent);

        let op1 = document.getElementById("op1").textContent;
        let op2 = document.getElementById("op2").textContent;

        let userAnswer = parseInt(document.getElementById("answer").value);

        let correctAnswer = calculateQestion(num1, num2, num3, op1, op2);

        if (correctAnswer === userAnswer) {
            alert("Правильно!");
            counterQuestion += 1;
            counterCorrectAnsw += 1;

            if (bestScore < counterCorrectAnsw) {
                bestScore = counterCorrectAnsw;
                saveResults(); 
            }
        }
        else {
            alert("Неправильно, відповідь: " + correctAnswer);
            counterQuestion += 1;
        }

        inputField.value = ""; 
        inputField.focus();

        generateNumber();
    });
}

function updateResults() {
    const questionCount = document.getElementById("questionCount");
    const correctCount = document.getElementById("correctCount");
    const bestScore = document.getElementById("bestScore");
    const results = document.getElementById("results");

    questionCount.textContent = `Всього питань: ${counterQuestion}`;
    correctCount.textContent = `Правильних відповідей: ${counterCorrectAnsw}`;
    bestScore.textContent = `Найкращий результат: ${bestScoreSave}`;
    results.style.visibility = "visible";
}

function startTimer() {
    let timerEl = document.getElementById("timerTxt");
    timer = setInterval(() => {
        if (timerTotal > 0) {
            timerTotal--;
            timerEl.textContent = `Час: ${timerTotal} сек`;
        } else {
            clearInterval(timer);
            alert("Час вийшов!");
            generateNumber();
            updateResults();
        }
    }, 1000);
}

function choseLevel() {
    const startPage = document.getElementById("choseLevel");

    const easyLevel = document.getElementById("easy");
    const mediumLevel = document.getElementById("medium");
    const hardLevel = document.getElementById("hard");

    easyLevel.addEventListener("click", function() {
        state = "easy";
        startPage.style.visibility = "hidden";
        startTimer();
        generateNumber();  
        checkAnswer();
    });

    mediumLevel.addEventListener("click", function() {
        state = "medium";
        startPage.style.visibility = "hidden";
        startTimer();
        generateNumber();  
        checkAnswer();
    });

    hardLevel.addEventListener("click", function() {
        state = "hard";
        startPage.style.visibility = "hidden";
        startTimer();
        generateNumber(); 
        checkAnswer();
    });
}

function saveResults() {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
}

const bestScoreSave = JSON.parse(localStorage.getItem("bestScore"))


choseLevel();



