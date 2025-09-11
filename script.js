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
  countdown.textContent = "";

  // Show congratulations message
  revealMessage.innerHTML = "🎉 Congratulations Mommy Yhanie and Zaldad! <br><br>";

  try {
    await bgMusic.play();
  } catch (e) {
    console.warn("Music autoplay blocked:", e);
  }

  // Wait before typing starts
  await delay(2000);

  // Typing effect for "It's a ....."
  const typingText = "It's a .....";
  let currentText = "";
  for (let i = 0; i < typingText.length; i++) {
    currentText += typingText[i];
    revealMessage.innerHTML = "🎉 Congratulations Mommy Yhanie and Zaldad! <br><br>" + currentText;
    await delay(300); // typing speed
  }

  // Wait before showing "GIRL!"
  await delay(1000);

  // Display "GIRL!", confetti, and changing of background color to pink
  document.body.classList.add("revealed-bg");
  revealMessage.innerHTML += `<br><br><strong style="color:#e63946; font-size: 36px;">GIRL! ❤️</strong>`;
  fireConfetti();
}



function fireConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 10, angle: 60, spread: 90, origin: { x: 0 } });
    confetti({ particleCount: 10, angle: 120, spread: 90, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
