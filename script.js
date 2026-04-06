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
        document.getElementById("shark2"), // ORTA
        document.getElementById("shark3")
    ];

    // 🔀 yanlardakiler random
    sharks.forEach((shark, index) => {
        if (index !== 1) {
            let dir = Math.random() < 0.5 ? -1 : 1;
            shark.style.transform = `scaleX(${dir})`;
        }
    });

    // 🎯 ORTADAKİ = doğru cevap
    if (Math.random() < 0.5) {
        direction = "left";
        sharks[1].style.transform = "scaleX(-1)";
    } else {
        direction = "right";
        sharks[1].style.transform = "scaleX(1)";
    }

    // göster
    sharks.forEach(s => s.classList.remove("hidden"));

    // ⏱️ 1400ms (senin isteğin)
    setTimeout(() => {
        sharks.forEach(s => s.classList.add("hidden"));
        startTime = Date.now();
    }, 1400);
}

// ✅ NORMAL DOĞRU KONTROL
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
