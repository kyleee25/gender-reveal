const envelopeBtn = document.getElementById("envelopeBtn");
const message = document.getElementById("message");
const revealSection = document.getElementById("revealSection");
const revealMessage = document.getElementById("revealMessage");
const countdown = document.getElementById("countdown");
const bgMusic = document.getElementById("bgMusic");
const revealPhoto = document.getElementById("revealPhoto");

let tiltInterval = null;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runCountdown(seconds) {
  for (let i = seconds; i >= 0; i--) {
    countdown.textContent = i;
    await delay(1000);
  }
}

function showRevealPhoto(imageUrl) {
  revealPhoto.classList.add("hidden");
  stopTilt();

  revealPhoto.style.backgroundImage = `url(${imageUrl})`;
  revealPhoto.style.transform = "rotate(-20deg)";
  void revealPhoto.offsetWidth;

  revealPhoto.classList.remove("hidden");
  startTilt();
}

function startTilt() {
  let tilted = false;
  tiltInterval = setInterval(() => {
    revealPhoto.style.transform = tilted ? "rotate(-20deg)" : "rotate(20deg)";
    tilted = !tilted;
  }, 500);
}

function stopTilt() {
  clearInterval(tiltInterval);
  tiltInterval = null;
  revealPhoto.style.transform = "none";
}

envelopeBtn.addEventListener("click", async () => {
  envelopeBtn.style.display = "none";
  message.textContent = "Get ready...";
  revealSection.classList.remove("hidden");

  await runCountdown(5);

  revealMessage.textContent = "Is it a girl? ❤️";
  showRevealPhoto("assets/lewi.png");
  countdown.textContent = "";
  await delay(3000);

  revealMessage.textContent = "OR";
  revealPhoto.classList.add("hidden");
  stopTilt();
  await delay(3000);

  revealMessage.textContent = "Is it a boy? 💙";
  showRevealPhoto("assets/zaldad.png");
  await delay(3000);

  revealMessage.textContent = "Revealing in...";
  revealPhoto.classList.add("hidden");
  stopTilt();
  await runCountdown(10);

  await launchReveal();
});

async function launchReveal() {
  revealMessage.innerHTML = "🎉 Congratulations Leri and Zaldad!<br>It's a girl! ❤️";
  countdown.textContent = "";

  try {
    await bgMusic.play();
  } catch (e) {
    console.warn("Music autoplay blocked:", e);
  }

  document.body.classList.add("revealed-bg");
  fireConfetti();
}

function fireConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 70, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 70, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
