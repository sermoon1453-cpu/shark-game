let direction;

let correct = 0;
let wrong = 0;
let reactionTimes = [];

let startTime;
let gameActive = true;

let round = 0;
const maxRounds = 35;

function newRound() {
    if (!gameActive) return;

    if (round >= maxRounds) {
        finishGame();
        return;
    }

    round++;
    document.getElementById("round").innerText = `Tur: ${round} / 35`;

    const random = Math.random();
    const shark = document.getElementById("shark");

    if (random < 0.5) {
        direction = "left";
        shark.style.transform = "scaleX(-1)";
    } else {
        direction = "right";
        shark.style.transform = "scaleX(1)";
    }

    shark.classList.remove("hidden");

    setTimeout(() => {
        shark.classList.add("hidden");
        startTime = Date.now();
    }, 700);
}

function guess(user) {
    if (!gameActive) return;

    let reaction = Date.now() - startTime;
    reactionTimes.push(reaction);

    if (user === direction) {
        correct++;
        showResult("✅ Doğru");
    } else {
        wrong++;
        showResult("❌ Yanlış");
    }

    setTimeout(newRound, 800);
}

function showResult(text) {
    document.getElementById("result").innerText = text;
}

function getAverageTime() {
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
            labels: ['Doğru', 'Yanlış', 'Ort. Süre (ms)'],
            datasets: [{
                data: [
                    correct,
                    wrong,
                    getAverageTime()
                ],
                backgroundColor: ['#06d6a0','#ef476f','#118ab2']
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            }
        }
    });
}

newRound();
