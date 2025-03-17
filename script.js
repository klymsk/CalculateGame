let timerTotal = 30;
let answer = true;
let counterQuestion = 0;
let counterCorrectAnsw = 0;

function generateNumber() {
    let num1El = document.getElementById("num1");
    let num2El = document.getElementById("num2");
    let num3El = document.getElementById("num3");

    let op1El = document.getElementById("op1");
    let op2El = document.getElementById("op2");

    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let num3 = Math.floor(Math.random() * 10) + 1;

    let op1 = operatorChoice();
    let op2 = operatorChoice();

    num1El.textContent = num1;
    num2El.textContent = num2;
    num3El.textContent = num3;

    op1El.textContent = op1;
    op2El.textContent = op2;
}

function operatorChoice() {
    let operator;
    let random = Math.random();
    if (random < 0.5) {
        operator = "+";
    } 
    else {
        operator = "-";
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

    questionCount.textContent = `Всього питань: ${counterQuestion}`;
    correctCount.textContent = `Правильних відповідей: ${counterCorrectAnsw}`;
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

window.onload = function() {
    startTimer();
    generateNumber();
    checkAnswer();
}

