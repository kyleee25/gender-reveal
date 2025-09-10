const envelopeBtn = document.getElementById("envelopeBtn");
const message = document.getElementById("message");
const revealSection = document.getElementById("revealSection");
const revealMessage = document.getElementById("revealMessage");
const countdown = document.getElementById("countdown");
const bgMusic = document.getElementById("bgMusic");

envelopeBtn.addEventListener("click", async () => {
  envelopeBtn.style.display = "none";
  message.textContent = "Get ready...";
  revealSection.classList.remove("hidden");

  // Step 1: 5-second countdown
  await runCountdown(5);

  // Step 2: Show “Is it a girl?” ❤️
  revealMessage.textContent = "Is it a girl? ❤️";
  countdown.textContent = "";
  await delay(3000);

  // Step 3: Show “OR?” 💙
  revealMessage.textContent = "OR";
  await delay(3000);

  // Step 4: Show “Is it a boy?” 💙
  revealMessage.textContent = "Is it a boy? 💙";
  await delay(3000);

  // Step 5: 10-second countdown
  revealMessage.textContent = "Revealing in...";
  await runCountdown(10);

  // Step 6: Final Reveal
  await launchReveal();
});

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runCountdown(seconds) {
  for (let i = seconds; i >= 0; i--) {
    countdown.textContent = i;
    await delay(1000);
  }
}

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
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 70,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 70,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
