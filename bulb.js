const FLICKER_MS = 800;

const room = document.getElementById("room");
const switchBtn = document.getElementById("switch");
const hint = document.getElementById("hint");
const confetti = document.getElementById("confetti");

const switchSound = new Audio("../audio%26video/light%20switch%20audo.mp3");
const surpriseSound = new Audio("../audio%26video/surprise%20audio.mp3");
const hbdSound = new Audio("../audio%26video/hbd%20audio.mp3");

let isOn = false;
let flickerTimer = null;

function playSwitchSound() {
  switchSound.currentTime = 0;
  switchSound.play().catch(() => {});
}

function playSurpriseSound() {
  surpriseSound.currentTime = 0;
  surpriseSound.play().catch(() => {});
}

function stopSurpriseSound() {
  surpriseSound.pause();
  surpriseSound.currentTime = 0;
}

function playHbdSound() {
  hbdSound.currentTime = 0;
  hbdSound.play().catch(() => {});
}

function stopHbdSound() {
  hbdSound.pause();
  hbdSound.currentTime = 0;
}

surpriseSound.addEventListener("ended", () => {
  if (isOn) {
    playHbdSound();
  }
});

function setState(state) {
  room.dataset.state = state;
}

function turnOn() {
  isOn = true;
  switchBtn.setAttribute("aria-checked", "true");
  hint.textContent = "";
  playSwitchSound();
  setState("flicker");

  flickerTimer = setTimeout(() => {
    setState("on");
    hint.textContent = "Surprise!";
    playSurpriseSound();
    launchConfetti();
  }, FLICKER_MS);
}

function turnOff() {
  isOn = false;
  clearTimeout(flickerTimer);
  stopSurpriseSound();
  stopHbdSound();
  switchBtn.setAttribute("aria-checked", "false");
  playSwitchSound();
  setState("off");
  hint.textContent = "Flip the switch";
}

switchBtn.addEventListener("click", () => {
  if (isOn) {
    turnOff();
  } else {
    turnOn();
  }
});

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#ff5d8f", "#ffb703", "#3a86ff", "#06d6a0", "#9b5de5"];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("span");
    piece.className = "piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = 2 + Math.random() * 2 + "s";
    piece.style.animationDelay = Math.random() * 0.6 + "s";
    confetti.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

setState("off");
hint.textContent = "Flip the switch";
