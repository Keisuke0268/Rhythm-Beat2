const lanes = document.querySelectorAll(".lane");
const startButton = document.getElementById("startButton");
const scoreText = document.getElementById("score");
const comboText = document.getElementById("combo");
const judgeText = document.getElementById("judge");

let chart = null;
let score = 0;
let combo = 0;
let gameRunning = false;
let noteTimer = null;

function updateHUD() {
    scoreText.textContent = score;
    comboText.textContent = combo;
}

function startGame() {
    if (gameRunning) return;

    gameRunning = true;
    score = 0;
    combo = 0;
    updateHUD();
    judgeText.textContent = "READY";

    noteTimer = setInterval(spawnNote, 800);
}

startButton.addEventListener("click", startGame);
function spawnNote() {

    if (!gameRunning) return;

    const laneIndex = Math.floor(Math.random() * lanes.length);
    const lane = lanes[laneIndex];

    const note = document.createElement("div");

const noteType = Math.random();

if (noteType < 0.20) {
    note.className = "hold";
} else if (noteType < 0.40) {
    note.className = "flick";
} else if (noteType < 0.60) {
    note.className = "slide";
} else {
    note.className = "note";
}

note.style.top = "0px";

lane.appendChild(note);

    let y = 0;

    const fall = setInterval(() => {

        if (!gameRunning) {
            clearInterval(fall);
            return;
        }

        y += 4;
        note.style.top = y + "px";

        if (y >= 540) {

            clearInterval(fall);

            if (note.parentNode) {
                note.remove();
                combo = 0;
                judgeText.textContent = "MISS";
                updateHUD();
            }

        }

    },16);
if (note.classList.contains("hold")) {

    note.addEventListener("touchstart", () => {

        judgeText.textContent = "HOLD";

        setTimeout(() => {

            if (!note.parentNode) return;

            score += 1500;
            combo++;

            judgeText.textContent = "PERFECT";

            updateHUD();

            note.remove();

        }, 1000);

    });

}
  if (note.classList.contains("flick")) {

    note.addEventListener("touchmove", () => {

        if (!note.parentNode) return;

        score += 1200;
        combo++;

        judgeText.textContent = "FLICK";

        updateHUD();

        note.remove();

    });

  }
  
    if (note.classList.contains("slide")) {

    note.addEventListener("touchmove", () => {

        if (!note.parentNode) return;

        score += 1300;
        combo++;

        judgeText.textContent = "SLIDE";

        updateHUD();

        note.remove();

    });

}
  note.addEventListener("click", () => {

    if (!note.parentNode) return;

    clearInterval(fall);

    let judge = "";

    if (y >= 500 && y <= 540) {
        judge = "PERFECT";
        score += 1000;
    } else if (y >= 460 && y < 500) {
        judge = "GREAT";
        score += 700;
    } else if (y >= 420 && y < 460) {
        judge = "GOOD";
        score += 400;
    } else {
        judge = "BAD";
        score += 100;
    }

    combo++;

    judgeText.textContent = judge;

    updateHUD();

    note.remove();

});
}

async function loadChart() {
    const response = await fetch("charts/tutorial.json");
    chart = await response.json();

    console.log(chart);
}
