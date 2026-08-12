// TYPEPULSE - ARENA JAVASCRIPT

// 1. SELECT HTML ELEMENTS
const resultScreen = document.querySelector("#result-screen");
const typingInput = document.querySelector("#typing-input");
const resetBtn = document.querySelector("#reset-btn");
const passageText = document.querySelector("#passage-text");

// LIVE METRICS
const timerDisplay = document.querySelector("#timer");
const wpmDisplay = document.querySelector("#wpm");
const accuracyDisplay = document.querySelector("#accuracy");
const rhythmDisplay = document.querySelector("#rhythm-status");

// LIVE ANALYSIS
const currentFlowDisplay = document.querySelector("#current-flow");
const lastPauseDisplay = document.querySelector("#last-pause");
const keystrokesDisplay = document.querySelector("#keystrokes");
const rhythmScoreDisplay = document.querySelector("#rhythm-score");
const analysisState = document.querySelector("#analysis-state");

// RESULT SCREEN
const resultWpm = document.querySelector("#result-wpm");
const resultAccuracy = document.querySelector("#result-accuracy");
const resultRhythm = document.querySelector("#result-rhythm");
const resultScore = document.querySelector("#result-score");
const tryAgainBtn = document.querySelector("#try-again-btn");

// TYPING PERSONALITY
const personalityTitle = document.querySelector("#personality-title");
const personalityDescription = document.querySelector("#personality-description");
const personalityTag1 = document.querySelector("#personality-tag-1");
const personalityTag2 = document.querySelector("#personality-tag-2");
const personalityTag3 = document.querySelector("#personality-tag-3");

// ARENA UI SECTIONS
const arenaHeader = document.querySelector(".arena-header");
const metricsGrid = document.querySelector(".metrics-grid");
const typingSection = document.querySelector(".typing-section");
const analysisPanel = document.querySelector(".analysis-panel");

// PASSAGE LIBRARY
const passages = [
    `The rhythm of your typing is unique. Some people type in fast bursts, while others pause to think between every sentence. Type naturally and let your rhythm reveal itself.`,

    `Technology changes quickly, but the way people interact with it is deeply personal. Every keystroke creates a small pattern that reveals how you think, pause, and flow.`,

    `Great ideas often begin with a single thought. Sometimes the fastest way to discover your rhythm is to stop overthinking and simply let your fingers move naturally across the keyboard.`,

    `The digital world is built from millions of small actions. A single keystroke may seem simple, but together your typing creates a pattern that is completely unique to you.`,

    `Focus is not always about moving faster. Sometimes the best rhythm comes from knowing when to pause, think, and continue with a clear direction.`,

    `Every journey begins with a small step. Progress does not always happen quickly, but consistent effort creates patterns that become stronger over time.`,

    `The way you type can change with your thoughts. A quick idea may create a burst of keystrokes, while a difficult question may naturally slow your rhythm down.`,

    `Creativity often appears when the mind is free to explore. Let your thoughts move naturally and allow your fingers to follow the rhythm of your ideas.`,

    `In a world filled with constant notifications, finding a moment of focus can be powerful. Slow down, observe your rhythm, and discover how you naturally interact with the keyboard.`,

    `Small details can reveal interesting patterns. The time between your keystrokes, the pauses you take, and the flow of your typing all create a unique digital signature.`

];

// 3. SELECT RANDOM PASSAGE
let passage = "";
function getNewPassage() {
    const lastPassage = localStorage.getItem("typepulseLastPassage");
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * passages.length);
    }
    while (passages.length > 1 &&  passages[randomIndex] === lastPassage);
    passage = passages[randomIndex];
    localStorage.setItem("typepulseLastPassage",passage);
}

// 4. CREATE PASSAGE CHARACTERS
function createPassage() {
    passageText.innerHTML = "";
    for (let character of passage) {
        const span = document.createElement("span");
        span.textContent = character;
        passageText.appendChild(span);
    }
}

// 5. INITIAL PASSAGE
getNewPassage();
createPassage();


// 6. TYPING DATA
const typingData = {
    startTime: null,
    lastKeyTime: null,
    elapsedTime: 0,
    keystrokes: 0,
    keyTimes: [],
    pauses: [],
    isFinished: false
};

// 7. TIMER

let timerInterval = null;
function startTimer() {
    if (timerInterval) {
        return;
    }
    timerInterval = setInterval(() => {
        if (typingData.startTime) {
            const currentTime = Date.now();
            typingData.elapsedTime = currentTime - typingData.startTime;
            updateTimer();
            updateSpeed();
        }
    }, 1000);
}

function updateTimer() {
    const totalSeconds = Math.floor(typingData.elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

typingInput.addEventListener("input", () => {
    if (typingData.isFinished) {
        return;
    }
    const currentTime = Date.now();
    if (!typingData.startTime) {
        typingData.startTime = currentTime;
        startTimer();
        analysisState.textContent = "ANALYZING";
    }
    if (typingData.lastKeyTime) {
        const timeBetweenKeys = currentTime - typingData.lastKeyTime;
        typingData.keyTimes.push(timeBetweenKeys);
        if (timeBetweenKeys > 1000) {
            typingData.pauses.push(timeBetweenKeys);
        }
    }

    typingData.lastKeyTime = currentTime;
    typingData.keystrokes++;
    updatePassage();
    updateAllData();
});


// 9. UPDATE PASSAGE
function updatePassage() {
    const typedText = typingInput.value;
    const characters = passageText.querySelectorAll("span");
    characters.forEach((character, index) => {
        character.classList.remove("correct","incorrect");

        if (index < typedText.length) {
            if (typedText[index] === passage[index]) {
                character.classList.add("correct");
            }
            else {
                character.classList.add("incorrect");
            }
        }
    });
}


// 10. UPDATE ALL DATA
function updateAllData() {
    updateSpeed();
    updateAccuracy();
    updateKeystrokes();
    updateRhythm();
    updateFlow();
    updateLastPause();
    updateRhythmScore();
    checkSessionComplete();
}

// 11. SPEED / WPM
function updateSpeed() {
    if (typingData.elapsedTime === 0) {
        return;
    }
    const minutes = typingData.elapsedTime / 60000;
    const typedCharacters = typingInput.value.length;
    const words = typedCharacters / 5;
    const wpm = Math.round(words / minutes);
    wpmDisplay.textContent =  wpm || 0;
}

// 12. ACCURACY
function updateAccuracy() {
    const typedText = typingInput.value;
    if (typedText.length === 0) {
        accuracyDisplay.textContent = "100";
        return;
    }
    let correctCharacters = 0;
    for (let i = 0;i < typedText.length;i++) {
        if (typedText[i] === passage[i]) {
            correctCharacters++;
        }
    }
    const accuracy =   Math.round((correctCharacters / typedText.length) * 100);
    accuracyDisplay.textContent = accuracy;
}

// 13. KEYSTROKES
function updateKeystrokes() {
    keystrokesDisplay.textContent = typingData.keystrokes;
}

// 14. RHYTHM
function updateRhythm() {
    if (typingData.keyTimes.length === 0) {
        rhythmDisplay.textContent = "WAITING";
        return;
    }
    const lastTime =  typingData.keyTimes[typingData.keyTimes.length - 1];

    if (lastTime < 150) {
        rhythmDisplay.textContent = "BURST";
    }
    else if (lastTime > 1000) {
        rhythmDisplay.textContent = "PAUSED";
    }
    else {
        rhythmDisplay.textContent = "ACTIVE";
    }
}


// 15. CURRENT FLOW
function updateFlow() {
    if (typingData.keyTimes.length === 0) {
        currentFlowDisplay.textContent = "—";
        return;
    }
    const recentTimes = typingData.keyTimes.slice(-5);
    const averageTime = recentTimes.reduce(
            (total, time) => {
                return total + time;

            },0)/ recentTimes.length;

    if (averageTime < 150) {
        currentFlowDisplay.textContent = "BURSTING";
    }
    else if (averageTime > 1000) {
        currentFlowDisplay.textContent = "PAUSED";
    }
    else if (averageTime < 300) {
        currentFlowDisplay.textContent = "FLOWING";
    }
    else {
        currentFlowDisplay.textContent = "STEADY";
    }
}


// 16. LAST PAUSE
function updateLastPause() {
    if (typingData.pauses.length === 0) {
        lastPauseDisplay.textContent = "—";
        return;
    }
    const lastPause = typingData.pauses[typingData.pauses.length - 1];

    const pauseSeconds =(lastPause / 1000).toFixed(1);
    lastPauseDisplay.textContent =`${pauseSeconds}s`;
}


// 17. RHYTHM SCORE
function updateRhythmScore() {
    if (typingData.keyTimes.length < 2) {
        rhythmScoreDisplay.textContent =  "—";
        return;
    }
    const keyTimes = typingData.keyTimes;
    const averageTime = keyTimes.reduce(
            (total, time) => {
                return total + time;
            },0) / keyTimes.length;
    let score = 100;
    score -= typingData.pauses.length * 3;
    if (averageTime > 500) {
        score -= 10;
    }
    score = Math.max(0, score);
    rhythmScoreDisplay.textContent = Math.round(score);
}

// TYPING PERSONALITY ANALYSIS
function analyzeTypingPersonality() {
    const averageTime = typingData.keyTimes.length > 0 ? typingData.keyTimes.reduce(
                (total, time) => total + time,0 ) / typingData.keyTimes.length: 0;

    const pauseCount =typingData.pauses.length;

    const accuracy =Number(accuracyDisplay.textContent);

    const wpm = Number(wpmDisplay.textContent);


    if (accuracy < 50) {

        personalityTitle.textContent = "The Wild Typer";

        personalityDescription.textContent =
            "You type with strong speed and instinct, but accuracy is currently taking a back seat. Your next challenge is to slow down slightly and turn your speed into control.";

        personalityTag1.textContent = "HIGH SPEED";
        personalityTag2.textContent = "LOW ACCURACY";
        personalityTag3.textContent = "INSTINCTIVE";
        return "The Wild Typer";
    }

    if (accuracy >= 95 && averageTime > 400) {
        personalityTitle.textContent ="The Precision Mind";

        personalityDescription.textContent =
            "Accuracy is your strongest instinct. You carefully process each keystroke and prefer getting things right over simply moving faster.";

        personalityTag1.textContent = "PRECISE";
        personalityTag2.textContent = "CAREFUL";
        personalityTag3.textContent = "ACCURACY FIRST";
        return "The Precision Mind";
    }

    if (averageTime < 180 && pauseCount <= 2) {

        personalityTitle.textContent = "The Burst Typer";

        personalityDescription.textContent =
            "You type in powerful bursts and trust your first instinct. Your rhythm is fast, energetic, and naturally momentum-driven.";

        personalityTag1.textContent = "FAST FLOW";
        personalityTag2.textContent = "HIGH MOMENTUM";
        personalityTag3.textContent = "INSTINCTIVE";
        return "The Burst Typer";
    }

    if (averageTime >= 180 && averageTime <= 400 && pauseCount <= 5) {
        personalityTitle.textContent = "The Steady Flow";

        personalityDescription.textContent =
            "You maintain a balanced typing rhythm. Your typing shows consistency, control, and a strong sense of flow.";

        personalityTag1.textContent = "CONSISTENT";
        personalityTag2.textContent = "BALANCED";
        personalityTag3.textContent = "CONTROLLED";
        return "The Steady Flow";
    }

    if (pauseCount >= 6 || averageTime > 700 ) {
        personalityTitle.textContent = "The Deep Thinker";

        personalityDescription.textContent =
            "You take your time before moving forward. Your pauses suggest that you carefully process ideas while typing.";

        personalityTag1.textContent = "THOUGHTFUL";
        personalityTag2.textContent = "REFLECTIVE";
        personalityTag3.textContent ="DELIBERATE";
        return "The Deep Thinker";
    }

    personalityTitle.textContent = "The Adaptive Typer";

    personalityDescription.textContent =
        "Your typing rhythm changes naturally depending on the moment. You adapt your speed and flow instead of following one fixed pattern.";

    personalityTag1.textContent = "ADAPTIVE";
    personalityTag2.textContent = "FLEXIBLE";
    personalityTag3.textContent = "NATURAL";
    return "The Adaptive Typer";
}


// 18. SAVE SESSION TO HISTORY
function saveSession(personality) {
    const existingHistory =JSON.parse(localStorage.getItem("typepulseHistory")) || [];
    const session = {
        date: new Date().toLocaleString(),
        wpm: Number(wpmDisplay.textContent),
        accuracy: Number(accuracyDisplay.textContent),
        rhythm: "ANALYZED",
        score: Number(rhythmScoreDisplay.textContent),
        personality: personality
    };

    existingHistory.unshift(session);
    localStorage.setItem("typepulseHistory",JSON.stringify(existingHistory));
}


// 19. SHOW RESULT SCREEN
function showResult() {
    const personality = analyzeTypingPersonality();

    resultWpm.textContent = wpmDisplay.textContent;
    resultAccuracy.textContent = accuracyDisplay.textContent;
    resultRhythm.textContent = "ANALYZED";
    resultScore.textContent = rhythmScoreDisplay.textContent;
    saveSession(personality);

    arenaHeader.style.display ="none";
    metricsGrid.style.display ="none";
    typingSection.style.display ="none";
    analysisPanel.style.display = "none";
    resultScreen.classList.add("show");
}

// 20. SESSION COMPLETE
function checkSessionComplete() {
    const typedText = typingInput.value;
    if (typedText.length >= passage.length) {
        typingData.isFinished = true;
        clearInterval(timerInterval);
        typingInput.disabled = true;
        rhythmDisplay.textContent =  "COMPLETE";
        currentFlowDisplay.textContent = "ANALYZED";
        analysisState.textContent = "ANALYSIS COMPLETE";
        updateRhythmScore();
        showResult();
    }
}


// RESET SESSION
function resetSession() {
    clearInterval(timerInterval);
    timerInterval = null;
    getNewPassage();
    createPassage();

    typingData.startTime =null;
    typingData.lastKeyTime =null;
    typingData.elapsedTime = 0;
    typingData.keystrokes =0;
    typingData.keyTimes = [];
    typingData.pauses =[];
    typingData.isFinished = false;
    typingInput.value = "";
    typingInput.disabled = false;
    arenaHeader.style.display = "";
    metricsGrid.style.display = "";
    typingSection.style.display = "";
    analysisPanel.style.display = "";
    resultScreen.classList.remove("show");
    timerDisplay.textContent = "00:00";
    wpmDisplay.textContent = "0";
    accuracyDisplay.textContent = "100";
    rhythmDisplay.textContent = "WAITING";
    currentFlowDisplay.textContent = "—";
    lastPauseDisplay.textContent = "—";
    keystrokesDisplay.textContent = "0";
    rhythmScoreDisplay.textContent = "—";
    analysisState.textContent = "WAITING FOR INPUT";

    updatePassage();
}

// BUTTON EVENTS
resetBtn.addEventListener("click", resetSession);
tryAgainBtn.addEventListener("click",resetSession);