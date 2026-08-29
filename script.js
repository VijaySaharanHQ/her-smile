/**
 * PROJECT: HER SMILE 💖
 * Interactive Frontend Engine
 */

// ==========================================
// ⚙️ CONFIGURATION - CUSTOMIZE HERE
// ==========================================
const CONFIG = {
  sisterName: "Sister", // e.g., "Choti", "Priya", "Aisha"
  brotherName: "Your Annoying Brother", // e.g., "Rahul", "Your Bro"
  secretPassword: "smile", // Password for Screen 6 (Case insensitive)
  musicFile: "assets/music/song.mp3" // Ensure audio is placed in assets/music/
};

// ==========================================
// 🎲 SURPRISE QUOTES REPOSITORY (10+ Cute Messages)
// ==========================================
const SURPRISE_MESSAGES = [
  "You are officially too important to stay sad. 😤❤️",
  "Smile please... the world needs more of your nonsense! 😂❤️",
  "Congratulations! You have successfully forgiven your favorite brother. 🥳",
  "Warning: This brother may annoy you again in the next 24 hours. 😂",
  "Scientifically proven fact: Your smile makes the whole family 1000% happier. 🌸",
  "No matter how tall or old we get, you're still stuck with me forever! 🤝❤️",
  "Your smile is officially back. Mission accomplish, Madam Ji! 💖✨",
  "Emergency chocolate supply recommended to maintain this smile. 🍫😋",
  "You have 0 unread reasons to remain angry. All issues resolved! 🚀",
  "Keep smiling! It confuses the people who want to see you upset. 😉❤️",
  "I promise to give you the bigger slice of pizza next time... maybe. 🍕😂"
];

// State flags
let isMusicPlaying = false;
let typewriterExecuted = false;
let cinematicExecuted = false;

// ==========================================
// 🚀 INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  injectConfigDetails();
  initParticleSystem();
  setupAudioPlayer();
});

function injectConfigDetails() {
  // Replace template slots with configured names
  document.querySelectorAll(".sister-name-slot").forEach(el => {
    el.textContent = CONFIG.sisterName;
  });
  const broSlot = document.getElementById("brother-signoff");
  if (broSlot) broSlot.textContent = CONFIG.brotherName;
}

// ==========================================
// 🔄 SCREEN NAVIGATION SYSTEM
// ==========================================
function navigateToScreen(screenNumber) {
  const currentScreen = document.querySelector(".screen-card.active");
  const targetScreen = document.getElementById(`screen-${screenNumber}`);

  if (currentScreen) {
    currentScreen.classList.remove("active");
    currentScreen.classList.add("hidden");
  }

  if (targetScreen) {
    targetScreen.classList.remove("hidden");
    // Trigger small timeout to allow display change to register for CSS animation
    setTimeout(() => {
      targetScreen.classList.add("active");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 20);

    // Screen specific triggers
    if (screenNumber === 2 && !typewriterExecuted) {
      runScreen2Typewriter();
    } else if (screenNumber === 8 && !cinematicExecuted) {
      runScreen8Cinematic();
    } else if (screenNumber === 9) {
      triggerCelebrationConfetti();
    }
  }
}

// ==========================================
// 🎵 AUDIO CONTROL SYSTEM
// ==========================================
function setupAudioPlayer() {
  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle-btn");
  const source = audio.querySelector("source");
  
  if (source) source.src = CONFIG.musicFile;
  audio.load();

  musicBtn.addEventListener("click", () => {
    if (isMusicPlaying) {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicBtn.querySelector(".music-text").textContent = "Play Music 🎵";
      isMusicPlaying = false;
    } else {
      audio.play().then(() => {
        musicBtn.classList.add("playing");
        musicBtn.querySelector(".music-text").textContent = "Pause Music ⏸️";
        isMusicPlaying = true;
      }).catch(() => {
        // Fallback for browsers disabling autoplay or missing file
        console.warn("Audio file playback was restricted or source not found.");
      });
    }
  });
}

// ==========================================
// 🌸 FLOATING PARTICLES (OPTIMIZED)
// ==========================================
function initParticleSystem() {
  const container = document.getElementById("particle-container");
  const particleIcons = ["❤️", "💖", "🌸", "✨", "⭐", "🥺", "😊"];
  const maxParticlesOnScreen = 15;

  setInterval(() => {
    if (document.querySelectorAll(".floating-particle").length >= maxParticlesOnScreen) {
      return;
    }

    const particle = document.createElement("span");
    particle.className = "floating-particle";
    particle.textContent = particleIcons[Math.floor(Math.random() * particleIcons.length)];
    
    // Randomize initial positions & animation durations
    particle.style.left = `${Math.random() * 95}vw`;
    particle.style.fontSize = `${Math.random() * 14 + 14}px`;
    const duration = Math.random() * 6 + 6;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);

    // Clean DOM element upon animation end
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }, 900);
}

// ==========================================
// 💌 SCREEN 2: TYPEWRITER SEQUENCE
// ==========================================
function runScreen2Typewriter() {
  typewriterExecuted = true;
  const container = document.getElementById("typewriter-box");
  const lines = [
    "Wait...",
    "Before you leave...",
    "I know you are sad.",
    "I know you are angry.",
    "And maybe...",
    "You don't even want to talk right now."
  ];

  let currentLine = 0;

  function revealNextLine() {
    if (currentLine < lines.length) {
      const lineP = document.createElement("p");
      lineP.className = "typewriter-line";
      lineP.textContent = lines[currentLine];
      container.appendChild(lineP);
      currentLine++;
      setTimeout(revealNextLine, 1100);
    } else {
      setTimeout(() => {
        const footer = document.getElementById("screen2-end");
        footer.classList.remove("hidden");
      }, 700);
    }
  }

  revealNextLine();
}

// ==========================================
// 😡 SCREEN 3: MOOD SELECTION LOGIC
// ==========================================
function selectMood(mood) {
  const feedbackBox = document.getElementById("mood-feedback-box");
  const content = document.getElementById("mood-content");
  
  // Update selected classes
  document.querySelectorAll(".mood-card").forEach(c => c.classList.remove("selected"));
  
  let html = "";

  if (mood === "angry") {
    document.querySelector(".mood-angry").classList.add("selected");
    html = `
      <p>Okay okay 😭 I understand.</p>
      <p>You have full permission to be angry.</p>
      <p><strong>Court has approved it. 👨‍⚖️😂</strong></p>
      <p class="accent-sub">But please don't stay angry forever... 🥺❤️</p>
    `;
  } else if (mood === "sad") {
    document.querySelector(".mood-sad").classList.add("selected");
    html = `
      <p>Seeing you sad makes me wish...</p>
      <p>I could take away whatever is hurting you.</p>
      <p class="accent-sub">You deserve to smile more than you know. ❤️</p>
    `;
  } else if (mood === "naraz") {
    document.querySelector(".mood-naraz").classList.add("selected");
    html = `
      <p>Ahh... So THIS is the problem 😭😂</p>
      <p>Madam is officially <strong>NARAZ</strong>.</p>
      <div class="fake-notification">
        <div class="notif-title">🚨 SYSTEM ALERT</div>
        <div>Sister Anger Level: 99%</div>
        <div>Brother Panic Level: 1000% 😭😂❤️</div>
      </div>
    `;
  }

  content.innerHTML = html;
  feedbackBox.classList.remove("hidden");
}

// ==========================================
// 🧩 SCREEN 4: 3D CARD FLIP
// ==========================================
function flipCard(cardElement) {
  cardElement.classList.toggle("flipped");
}

// ==========================================
// 🎮 SCREEN 5: MINI CHALLENGE
// ==========================================
function triggerChallengeAnswer(choice) {
  const responseBox = document.getElementById("challenge-response");
  const nextBtn = document.getElementById("challenge-next-btn");

  responseBox.classList.remove("hidden", "error", "success");

  if (choice === "angry") {
    responseBox.classList.add("error");
    responseBox.innerHTML = `⚠️ <strong>SYSTEM ERROR 😭</strong><br/>This option is permanently locked by the universe!`;
    nextBtn.classList.add("hidden");
  } else if (choice === "ignore") {
    responseBox.classList.add("error");
    responseBox.innerHTML = `⏳ <em>Please wait... Loading...</em><br/>Brother has already started crying dramatically. 😭😂`;
    nextBtn.classList.add("hidden");
  } else if (choice === "smile") {
    responseBox.classList.add("success");
    responseBox.innerHTML = `🎉 <strong>YESSSS! 🥳💖</strong><br/>Even a tiny smile counts. You made my day! 😊`;
    nextBtn.classList.remove("hidden");
    
    // Quick burst confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  }
}

// ==========================================
// 🔐 SCREEN 6: SECRET PASSWORD & ENVELOPE
// ==========================================
function verifyPassword() {
  const input = document.getElementById("sister-pass-input").value.trim().toLowerCase();
  const errorMsg = document.getElementById("pass-error");
  
  if (input === CONFIG.secretPassword.toLowerCase() || input === "sister" || input === CONFIG.sisterName.toLowerCase()) {
    openEnvelope();
  } else {
    errorMsg.classList.remove("hidden");
  }
}

function bypassPassword() {
  openEnvelope();
}

function openEnvelope() {
  document.getElementById("password-block").classList.add("hidden");
  const envelope = document.getElementById("envelope-wrapper");
  envelope.classList.remove("hidden");
}

// ==========================================
// 🌙 SCREEN 8: CINEMATIC REVEAL
// ==========================================
function runScreen8Cinematic() {
  cinematicExecuted = true;
  const container = document.getElementById("cinematic-text-stream");
  const lines = [
    "Even if today was not a good day...",
    "Even if we are angry right now...",
    "Even if we don't understand each other sometimes...",
    "Tomorrow... We will still be brother and sister. ❤️",
    "And I hope tomorrow...",
    "I get to see your smile again. 😊💖"
  ];

  let lineIdx = 0;

  function streamLine() {
    if (lineIdx < lines.length) {
      const p = document.createElement("p");
      p.className = "cinematic-line";
      p.textContent = lines[lineIdx];
      container.appendChild(p);
      lineIdx++;
      setTimeout(streamLine, 1400);
    } else {
      setTimeout(() => {
        document.getElementById("cinematic-action").classList.remove("hidden");
      }, 800);
    }
  }

  streamLine();
}

// ==========================================
// 🎆 SCREEN 9: CELEBRATION EFFECTS
// ==========================================
function triggerCelebrationConfetti() {
  if (typeof confetti !== 'function') return;

  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ff5fa2', '#ffd166', '#9b6bff', '#ffffff']
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ff5fa2', '#ffd166', '#9b6bff', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// ==========================================
// 🎁 SURPRISE MODAL LOGIC
// ==========================================
function triggerSurprisePopup() {
  const modal = document.getElementById("surprise-modal");
  const quoteText = document.getElementById("surprise-quote");
  
  const randomIndex = Math.floor(Math.random() * SURPRISE_MESSAGES.length);
  quoteText.textContent = `“${SURPRISE_MESSAGES[randomIndex]}”`;
  
  modal.classList.remove("hidden");
}

function closeSurpriseModal(event) {
  if (event.target.id === "surprise-modal") {
    document.getElementById("surprise-modal").classList.add("hidden");
  }
}

function forceCloseModal() {
  document.getElementById("surprise-modal").classList.add("hidden");
}
