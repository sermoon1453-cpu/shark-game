let direction;
let correct = 0;
let wrong = 0;

let round = 0;
const maxRounds = 35;

let startTime;
let gameActive = true;

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
        document.getElementById("shark2"),
        document.getElementById("shark3")
    ];

    // yanlar random
    sharks.forEach((shark, index) => {
        if (index !== 1) {
            let dir = Math.random() < 0.5 ? -1 : 1;
            shark.style.transform = `scaleX(${dir})`;
        }
    });

    // ortadaki doğru
    if (Math.random() < 0.5) {
        direction = "left";
        sharks[1].style.transform = "scaleX(-1)";
    } else {
        direction = "right";
        sharks[1].style.transform = "scaleX(1)";
    }

    sharks.forEach(s => s.classList.remove("hidden"));

    setTimeout(() => {
        sharks.forEach(s => s.classList.add("hidden"));
        startTime = Date.now();
    }, 1400);
}

// 🔥 BUTONLARIN İŞLEVİ TERS
function guess(user) {
    if (!gameActive) return;

    let reaction = Date.now() - startTime;

    // burada tersliyoruz
    let mappedUser = (user === "left") ? "right" : "left";

    if (mappedUser === direction) {
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
