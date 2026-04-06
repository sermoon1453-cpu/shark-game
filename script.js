let direction;

let correct = 0;
let wrong = 0;

let round = 0;
const maxRounds = 35;

let trainingClicks = 0;
const maxTrainingClicks = 3;

let isTraining = true;
let gameActive = false;

let startTime;

const sharkLeft = "shark-left.png";
const sharkRight = "shark-right.png";

// BAŞLAT
function startTraining() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    nextTrainingRound();
}

// ANTRENMAN TURU
function nextTrainingRound() {
    const sharks = getSharks();
    setRandomSides(sharks);

    if (Math.random() < 0.5) {
        direction = "left";
        sharks[1].src = sharkLeft;
    } else {
        direction = "right";
        sharks[1].src = sharkRight;
    }

    showSharks();

    setTimeout(() => {
        hideSharks();
    }, 1200);
}

// ANTRENMAN TIKLAMA
function handleTrainingClick(user) {
    trainingClicks++;

    document.getElementById("result").innerText =
        user === direction ? "Doğru!" : "Yanlış!";

    if (trainingClicks >= maxTrainingClicks) {
        document.getElementById("result").innerText = "Antrenman bitti!";
        document.getElementById("continueArea").style.display = "block";
        return;
    }

    setTimeout(nextTrainingRound, 800);
}

// ANA OYUN BAŞLAT
function startGame() {
    isTraining = false;
    document.getElementById("continueArea").style.display = "none";
    document.getElementById("result").innerText = "";
    newRound();
}

// ANA OYUN TURU
function newRound() {
    if (round >= maxRounds) {
        alert(`Oyun bitti!\nDoğru: ${correct}\nYanlış: ${wrong}`);
        return;
    }

    round++;
    document.getElementById("round").innerText = `Tur: ${round} / 35`;

    const sharks = getSharks();
    setRandomSides(sharks);

    if (Math.random() < 0.5) {
        direction = "left";
        sharks[1].src = sharkLeft;
    } else {
        direction = "right";
        sharks[1].src = sharkRight;
    }

    showSharks();

    setTimeout(() => {
        hideSharks();
        startTime = Date.now();
    }, 1200);
}

// TIKLAMA
function guess(user) {
    if (isTraining) {
        handleTrainingClick(user);
        return;
    }

    let reaction = Date.now() - startTime;

    if (user === direction) {
        correct++;
        showResult(`✅ Doğru (${reaction} ms)`);
    } else {
        wrong++;
        showResult(`❌ Yanlış (${reaction} ms)`);
    }

    setTimeout(newRound, 800);
}

// yardımcılar
function getSharks() {
    return [
        document.getElementById("shark1"),
        document.getElementById("shark2"),
        document.getElementById("shark3")
    ];
}

function setRandomSides(sharks) {
    sharks.forEach((s, i) => {
        if (i !== 1) {
            s.src = Math.random() < 0.5 ? sharkLeft : sharkRight;
        }
    });
}

function showSharks() {
    getSharks().forEach(s => s.classList.remove("hidden"));
}

function hideSharks() {
    getSharks().forEach(s => s.classList.add("hidden"));
}

function showResult(text) {
    document.getElementById("result").innerText = text;
}
