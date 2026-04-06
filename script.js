let direction;
let correct = 0;
let wrong = 0;

let round = 0;
const maxRounds = 35;

let trainingRound = 0;
const maxTraining = 3;

let isTraining = true;
let gameActive = false;

let startTime;

// görseller
const sharkLeft = "shark-left.png";
const sharkRight = "shark-right.png";

// BAŞLAT
function startTraining() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    document.getElementById("continueBtn").style.display = "block";
    document.getElementById("continueBtn").innerText = "Devam Et";
}

// DEVAM ET BUTONU
function continueGame() {
    document.getElementById("continueBtn").style.display = "none";
    document.getElementById("result").innerText = "";

    if (isTraining) {
        runTraining();
    } else {
        newRound();
    }
}

// 🧪 ANTRENMAN
function runTraining() {
    if (trainingRound >= maxTraining) {
        isTraining = false;
        document.getElementById("result").innerText = "Antrenman bitti!";
        document.getElementById("continueBtn").style.display = "block";
        return;
    }

    trainingRound++;

    const sharks = getSharks();

    // random yanlar
    setRandomSides(sharks);

    // ortadaki doğru
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
        // 🔥 SADECE DOĞRUYU GÖSTER
        document.getElementById("result").innerText =
            direction === "left" ? "Doğru: SOL" : "Doğru: SAĞ";

        document.getElementById("continueBtn").style.display = "block";
    }, 1200);
}

// 🎮 ANA OYUN
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

// TAHMİN
function guess(user) {
    if (isTraining) return;

    let reaction = Date.now() - startTime;

    if (user === direction) {
        correct++;
        showResult(`✅ Doğru (${reaction} ms)`);
    } else {
        wrong++;
        showResult(`❌ Yanlış (${reaction} ms)`);
    }

    setTimeout(() => {
        document.getElementById("continueBtn").style.display = "block";
    }, 500);
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
