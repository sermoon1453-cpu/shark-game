let direction;

let correct = 0;
let wrong = 0;
let reactionTimes = [];

let startTime;
let gameActive = true;

let round = 0;
const maxRounds = 35;

// yeni tur
function newRound() {
    if (!gameActive) return;

    if (round >= maxRounds) {
        finishGame();
        return;
    }

    round++;

    const random = Math.random();

    if (random < 0.5) {
        direction = "left";
        document.getElementById("shark").style.transform = "scaleX(-1)";
    } else {
        direction = "right";
        document.getElementById("shark").style.transform = "scaleX(1)";
    }

    // köpekbalığı göster
    document.getElementById("shark").classList.remove("hidden");

    // 0.7 sn sonra gizle
    setTimeout(() => {
        document.getElementById("shark").classList.add("hidden");
        startTime = Date.now();
    }, 700);
}

// tahmin
function guess(user) {
    if (!gameActive) return;

    let reaction = Date.now() - startTime;
    reactionTimes.push(reaction);

    if (user === direction) {
        correct++;
        showFeedback("✅ Doğru");
    } else {
        wrong++;
        showFeedback("❌ Yanlış");
    }

    setTimeout(newRound, 800);
}

// geri bildirim
function showFeedback(text) {
    const result = document.getElementById("result");
    result.innerText = text;
}

// ortalama süre
function getAverageTime() {
    if (reactionTimes.length === 0) return 0;

    let sum = reactionTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / reactionTimes.length);
}

// bitir
function finishGame() {
    gameActive = false;
    showChart();
}

// grafik
function showChart() {
    const ctx = document.getElementById('resultChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Doğru', 'Yanlış', 'Ort. Süre (ms)'],
            datasets: [{
                data: [
                    correct,
                    wrong,
                    getAverageTime()
                ],
                backgroundColor: [
                    '#06d6a0',
                    '#ef476f',
                    '#118ab2'
                ]
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// başlat
newRound();
