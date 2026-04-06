let direction;

let correct = 0;
let wrong = 0;
let skipped = 0;
let reactionTimes = [];

let startTime;
let gameActive = true;

function newRound() {
    if (!gameActive) return;

    const random = Math.random();

    if (random < 0.5) {
        direction = "left";
        document.getElementById("shark").innerText = "⬅️";
    } else {
        direction = "right";
        document.getElementById("shark").innerText = "➡️";
    }

    startTime = Date.now();
}

function guess(user) {
    if (!gameActive) return;

    let reaction = Date.now() - startTime;
    reactionTimes.push(reaction);

    if (user === direction) {
        correct++;
        document.getElementById("result").innerText = "Doğru!";
    } else {
        wrong++;
        document.getElementById("result").innerText = "Yanlış!";
    }

    setTimeout(newRound, 800);
}

function skip() {
    if (!gameActive) return;

    skipped++;
    document.getElementById("result").innerText = "Atlandı!";
    setTimeout(newRound, 500);
}

function getAverageTime() {
    if (reactionTimes.length === 0) return 0;

    let sum = reactionTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / reactionTimes.length);
}

function finishGame() {
    gameActive = false;
    showChart();
}

function showChart() {
    const ctx = document.getElementById('resultChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Doğru', 'Yanlış', 'Atlanan', 'Ort. Süre (ms)'],
            datasets: [{
                label: 'Oyuncu Verisi',
                data: [
                    correct,
                    wrong,
                    skipped,
                    getAverageTime()
                ]
            }]
        }
    });
}

newRound();
