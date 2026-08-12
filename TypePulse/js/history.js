// TYPEPULSE - HISTORY JAVASCRIPT

// 1. SELECT HTML ELEMENTS
const sessionList = document.querySelector("#session-list");
const emptyHistory = document.querySelector("#empty-history");
const clearHistoryBtn = document.querySelector("#clear-history-btn");
const totalSessions = document.querySelector("#total-sessions");
const bestWpm = document.querySelector("#best-wpm");
const averageAccuracy = document.querySelector("#average-accuracy");
const bestScore = document.querySelector("#best-score");

// 2. LOAD HISTORY
let historyData = JSON.parse(localStorage.getItem("typepulseHistory")) || [];

// 3. DISPLAY HISTORY
function displayHistory() {
  const oldCards = sessionList.querySelectorAll(".session-card");
  oldCards.forEach((card) => card.remove());
  if (historyData.length === 0) {
    emptyHistory.style.display = "flex";
    totalSessions.textContent = "0";
    bestWpm.textContent = "0";
    averageAccuracy.textContent = "0";
    bestScore.textContent = "0";
    return;
  }
  emptyHistory.style.display = "none";
  totalSessions.textContent = historyData.length;
  updateSummary();
  historyData.forEach((session, index) => {
    const sessionCard = document.createElement("div");
    sessionCard.classList.add("session-card");
    const personality = session.personality || "UNKNOWN";
    sessionCard.innerHTML = `
            <div class="session-card-top">
                <div>
                    <div class="session-number">
                        #${String(index + 1).padStart(2, "0")}
                    </div>

                    <div class="session-title">
                        TYPING SESSION
                    </div>
                </div>

                <div class="session-date">
                    ${session.date}
                </div>
            </div>

            <div class="session-stats">
                <div class="session-metric">
                    <span>
                        SPEED
                    </span>
                    <strong>
                        ${session.wpm}
                    </strong>
                    <small>
                        WPM
                    </small>
                </div>

                <div class="session-metric">
                    <span>
                        ACCURACY
                    </span>
                    <strong>
                        ${session.accuracy}%
                    </strong>
                </div>

                <div class="session-metric">
                    <span>
                        RHYTHM
                    </span>
                    <strong>
                        ${session.rhythm}
                    </strong>
                </div>

                <div class="session-metric personality-metric">
                    <span>
                        PERSONALITY
                    </span>
                    <strong>
                        ${personality}
                    </strong>
                </div>

                <div class="session-metric score-metric">
                    <span>
                        SCORE
                    </span>
                    <strong>
                        ${session.score}
                    </strong>
                </div>
            </div>
        `;
    sessionList.appendChild(sessionCard);
  });
}

// 4. UPDATE SUMMARY
function updateSummary() {
  const wpmValues = historyData.map((session) => session.wpm);
  const accuracyValues = historyData.map((session) => session.accuracy);
  const scoreValues = historyData.map((session) => session.score);
  const highestWpm = Math.max(...wpmValues);
  const highestScore = Math.max(...scoreValues);
  const totalAccuracy = accuracyValues.reduce((total, accuracy) => {
    return total + accuracy;}, 0);
  const avgAccuracy = Math.round(totalAccuracy / accuracyValues.length);
  bestWpm.textContent = highestWpm;
  averageAccuracy.textContent = avgAccuracy;
  bestScore.textContent = highestScore;
}

// 5. CLEAR HISTORY
clearHistoryBtn.addEventListener("click", () => {
  if (historyData.length === 0) {
    return;
  }
  const confirmClear = confirm("Are you sure you want to clear your typing history?",);
  if (confirmClear) {
    localStorage.removeItem("typepulseHistory");
    historyData = [];
    displayHistory();
  }
});

// 6. INITIAL LOAD
displayHistory();