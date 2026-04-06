let direction;
let correct = 0;
let wrong = 0;

let round = 0;
const maxRounds = 35;

let startTime;
let gameActive = true;

// 🦈 GÖRSELLER
const sharkLeft = "shark-left.png";
const sharkRight = "shark-right.png";

function newRound() {
    if (!gameActive) return;

    if (round >= maxRounds) {
        alert("Oyun bitti!\nDoğru: " + correct + "\nYanlış: " + wrong);
        return;
    }

    round++;
    document.getElementById("round").innerText = `Tur: ${round} / 35`;

    const sharks = [
        document.getElementById("shark1"),
        document.getElementById("shark2"), // ORTA
        document.getElementById("shark3")
    ];

    // 🔀 YANLAR RANDOM
    sharks.forEach((shark, index) => {
        if (index !== 1) {
            if (Math.random() < 0.5) {
                shark.src = sharkLeft;
            } else {
                shark.src = sharkRight;
            }
        }
    });

    // 🎯 ORTADAKİ DOĞRU
    if (Math.random() < 0.5) {
        direction = "left";
        sharks[1].src = sharkLeft;
    } else {
        direction = "right";
        sharks[1].src = sharkRight;
    }

    // göster
    sharks.forEach(s => s.classList.remove("hidden"));

    // ⏱️ süre (1400 ms)
    setTimeout(() => {
        sharks.forEach(s => s.classList.add("hidden"));
        startTime = Date.now();
    }, 1400);
}

function guess(user) {
    if (!gameActive) return;

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

function showResult(text) {
    document.getElementById("result").innerText = text;
}

newRound();
