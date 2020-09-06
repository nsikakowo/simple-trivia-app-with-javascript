//Declare array

let questionSet = [
    {
        
        question:"Who claimed he could drive away the devil with a fart?",
        options: ["Trump", "Martin Luther", "Tupac"],
        answer: "Martin Luther"
    },
    {
        question:"Johnny Depp is famously afraid of what?",
        options: ["Clowns", "Water", "Dogs"],
        answer: "Clowns"
    },
    {
        
        question:"Coprastastaphobia is the fear of what?",
        options: ["Copper", "Cobra", "Constipation"],
        answer: "Constipation"
    },
    {
        
        question:"Where on the human body is the zygomatic bone found?",
        options: ["Facial cheek", "Hip", "Spinal Cord"],
        answer: "Facial cheek"
    },
    {
        
        question:"What is banned in public places in Florida after 6 pm on a Thursday?",
        options: ["Eating", "Farting", "Kissing"],
        answer: "Farting"
    },
    
];

let count = 0;
let answeredQuestion = 0;
let score = 0;

// Declare variables 

let quizBox = document.querySelector("#quizBox");
let question = document.querySelector(".questionBox");
let option = document.querySelector(".options");
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
let scoreBox = document.querySelector(".score span");
let finalScore = document.querySelector(".gameover span");
let finish = document.querySelector(".gameover");
let restart = document.querySelector(".restart");
let beginGame = document.querySelector("section h1");
let music = document.getElementById('main-sound');
let gameEndSound = document.getElementById("gameover");
let failSound = document.getElementById("fail");

function loadQuestion() {
    MyTimer();
    question.innerHTML = questionSet[count].question;
        option.innerHTML = questionSet[count].options
        .map((option) => {
            return `<button class="option">${option}</button>`
        }).join("");
        checkAnswer();
        scoreBox.innerHTML = score;
        
}

function checkAnswer() {
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", () => {
            if(option.innerHTML == questionSet[count].answer) {
                document.getElementById('myaudio').play();
                option.style.background = "green";
                option.style.color = "white";
                setTimeout(function() {
                    score += 100;
                    next();
                    answeredQuestion++;
                }, 500);
            }else {
                document.getElementById('myaudio').play();
                option.style.background = "red";
                option.style.color = "white";
                setTimeout(function() {
                    next();
                    answeredQuestion++;
                }, 500);
            }
            if(answeredQuestion == questionSet.length - 1) {
                setTimeout(() => (quizBox.style.display = "none"), 500)
               setTimeout(gameOver, 500);}
    });
 })
}

//Game over function
function gameOver(){
    if(answeredQuestion == questionSet.length){
        music.pause();
        gameEndSound.play();
        
        finish.style.display = "block";
        return finalScore.innerHTML = score;
        
        
    }
    // restart();
}

// Start Game
function startGame() {
    music.play();
    document.querySelector(".wrapper").style.display = "flex";
    document.querySelector("section").style.display = "none";
}

//Restart Game
function reset(){
    location.reload();
}

// previous button
function prev() {
    if(count == 0) {
        count = questionSet.length - 1;
    }else {
        count--;
    }
    loadQuestion();
}

//next button
function next() {
    if(count == questionSet.length - 1) {
        count = 0
    }else {
        count++;
    }
    loadQuestion();
}

//Timer function
function MyTimer(callback, val) {
    val = val || 60; 
    var timer=setInterval(function() { 
        callback(val);
        if(val-- <= 0) { 
            clearInterval(timer); 
            failSound.play();
            next();
            val = 60;
        } 
    }, 1000);
}
    
    new MyTimer(function(val) {
        var timerMsg = "00:" + (val >= 10 ? val : "0" + val);
        document.getElementById("timer").textContent = timerMsg; 
    });
    
//load game
loadQuestion();



prevBtn.addEventListener("mouseover", () => document.getElementById('myaudio').play());
nextBtn.addEventListener("mouseover", () => document.getElementById('myaudio').play());
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
restart.addEventListener('click', reset);
beginGame.addEventListener('click', startGame);

