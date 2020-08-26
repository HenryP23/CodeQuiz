var opt1 = document.getElementById("option1");
var opt2 = document.getElementById("option2");
var opt3 = document.getElementById("option3");
var opt4 = document.getElementById("option4");
var qt = document.getElementById("question");
var end = document.getElementById("game-over");
var timerSet = document.getElementById("timer");
var correctIncorrect = document.getElementById("correctIncorrect");
var highScoreWindow = document.getElementById("hsContainer");
var questionAmount = 0;
var optIndex = 1;
var randomQuestion = 0;
var question1;
var question2;
var question3;
var opt1SPoint = 0;
var opt1used = false;
var startPoint;
var timer = 15;
var gameStart = false;
var gameOver = false;
var x = 1;
var interval = 0;
var opt1Clicked = false;
var opt2Clicked = false;
var opt3Clicked = false;
var opt4Clicked = false;
var temp = 0;
var score = 0;
var newScore = true;
var disableHighScores = false;

var questions = ["How Tall is Henry?", "", "", "",
    "What is 10 * 9 - 80 + 1", "", "", "",
    "What is Henrys kitten named?", "", "", "",
    "What is the title of Henrys first game?", "", "", "",];
var options = ["6'1", "6'2", "5'4", "5'9",
    "5", "11", "10", "4",
    "Dolly", "Tabasco", "Ariana", "Paws",
    "Unreal Pvp", "Minecraft", "Fortnite", "Zombie Tower Defense"];

startScreen();
document.getElementById("option2").addEventListener("click", scoresWindow);
document.getElementById("option1").addEventListener("click", startGame);



function loadQuestion() {
    if (gameStart) {
        opt3.style.display = "inline";
        opt4.style.display = "inline";
        startPoint = 0;

        if (randomQuestion == 1) {
            startPoint = 0;
        }
        else if (randomQuestion == 2) {
            startPoint = 4;
        }
        else if (randomQuestion == 3) {
            startPoint = 8;
        }
        else if (randomQuestion == 4) {
            startPoint = 12;
        }
        else if (randomQuestion == 5) {
            timerSet.style.display = "none";
            startPoint = 16;
            opt1.style.display = "none";
            opt2.style.display = "none";
            opt3.style.display = "none";
            opt4.style.display = "none";
            qt.style.display = "none";
            end.style.visibility = "visible";
            gameStart = false;
            highScoreWindow.style.visibility = "hidden";
            end.style.marginTop = "200px";
            savedScores();
            
            correctIncorrect.textContent = "";
        }

        for (var x = startPoint; x < (startPoint + 4); x++) {
            console.log(startPoint);
            if (x == startPoint) {
                qt.textContent = questions[x];
                opt1.textContent = options[x];
            }
            if (x == startPoint + 1) {
                opt2.textContent = options[x];
            }
            if (x == startPoint + 2) {
                opt3.textContent = options[x];
            }
            if (x == startPoint + 3) {
                opt4.textContent = options[x];
            }
        }


        if (timer != 0) {
            timerSet.textContent = "Time: " + timer--
        }
        else if (timer == 0) {
            randomQuestion = 5;
            timerSet.textContent = "";
        }
    

    }
}
setInterval(loadQuestion, 1000);
//question 1, starting point 0, option 2 is correct.



document.getElementById("option1").addEventListener("click", opt1Func);
document.getElementById("option2").addEventListener("click", opt2Func);
document.getElementById("option3").addEventListener("click", opt3Func);
document.getElementById("option4").addEventListener("click", opt4Func);

function myFunction() {

    if (randomQuestion >= 1) {
        checkAnswer();
        randomQuestion++;
        resetTrueFalse();
        loadQuestion();
    }
    else
        randomQuestion = 1



}

function startGame() {
    gameStart = true;
    loadQuestion();
    disableHighScores = true;
    document.getElementById("option2").removeEventListener("click", scoresWindow);
}


function startScreen() {

    opt3.style.display = "none";
    opt4.style.display = "none";
    end.style.visibility = "hidden";
}

function opt1Func() { opt1Clicked = true; myFunction(); }
function opt2Func() { opt2Clicked = true; myFunction(); }
function opt3Func() { opt3Clicked = true; myFunction(); }
function opt4Func() { opt4Clicked = true; myFunction(); }

function checkAnswer() {
    if (randomQuestion == 1) {
        if (opt2Clicked) { correctIncorrect.textContent = "Q1: Correct"; timer += 1; score += 1; }
        else { correctIncorrect.textContent = "Q1: Incorrect"; timer -= 1; }
    }
    if (randomQuestion == 2) {
        if (opt2Clicked) { correctIncorrect.textContent = "Q2: Correct"; timer += 1; score += 1; }
        else { correctIncorrect.textContent = "Q2: Incorrect"; timer -= 1; }
    }
    if (randomQuestion == 3) {
        if (opt1Clicked) { correctIncorrect.textContent = "Q3: Correct"; timer += 1; score += 1; }
        else { correctIncorrect.textContent = "Q3: Incorrect"; timer -= 1; }
    }
    if (randomQuestion == 4) {
        if (opt4Clicked) { correctIncorrect.textContent = "Q4: Correct"; timer += 1; score += 1; }
        else { correctIncorrect.textContent = "Q4: Incorrect"; timer -= 1; }
    }

}


function resetTrueFalse() {
    opt1Clicked = false;
    opt2Clicked = false;
    opt3Clicked = false;
    opt4Clicked = false;
}


var intitalsArray = [];
var scoresArray = [];

function gameOverFunc() {

    highScoreWindow.style.marginTop = "-200px";
    end.style.visibility = "hidden";
    highScoreWindow.style.visibility = "visible";
    if (newScore) {
        var value = document.getElementById("initials").value;
        intitalsArray.push(value);
        scoresArray.push(score);
        localStorage.setItem('highScoreInitials', JSON.stringify(intitalsArray));
        localStorage.setItem('highScore', JSON.stringify(scoresArray));
        var node = document.createElement("LI");                 // Create a <li> node
        var showIn = intitalsArray.length - 1;
        var showSc = scoresArray.length - 1;
        var textnode = document.createTextNode(intitalsArray[showIn] + " - " + scoresArray[showSc]);         // Create a text node
        node.appendChild(textnode);
        document.getElementById("highScores").appendChild(node);
    }
    else return;
}

function savedScores() {
   
    if (localStorage.getItem('highScoreInitials')) {
        intitalsArray = JSON.parse(localStorage.getItem('highScoreInitials'))
    } else {
        intitalsArray = [];
    }
    if (localStorage.getItem('highScore')) {
        scoresArray = JSON.parse(localStorage.getItem('highScore'))
    } else {
        scoresArray = [];
    }
    for (var i = 0; i < intitalsArray.length; i++) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(intitalsArray[i] + " - " + scoresArray[i]);
        node.appendChild(textnode);
        document.getElementById("highScores").appendChild(node);

    }
}

function clearScores() {
    var list = document.getElementById("highScores");
    localStorage.removeItem('highScore', JSON.stringify(scoresArray));
    localStorage.removeItem('highScoreInitials', JSON.stringify(intitalsArray));
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }
}

function goBack() {
    location.reload();
}


function scoresWindow() {
    newScore = false;
    randomQuestion = 5;
    startGame();
    gameOverFunc();
    timerSet.textContent = "";
    correctIncorrect.textContent = "";
}
