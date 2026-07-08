// Configuración rápida
const EVENT_DATE = "2026-08-22T00:00:00-06:00";

// Cambia estos enlaces cuando tengas la información real.
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Ubicaci%C3%B3n%20pendiente";
const GOOGLE_MAPS_EMBED = "https://www.google.com/maps?q=Ubicaci%C3%B3n%20pendiente&output=embed";
const WHATSAPP_CONFIRM_URL = "https://wa.me/5217841261547?text=Hola%2C%20confirmo%20mi%20asistencia%20a%20los%20XV%20a%C3%B1os%20de%20Julia%20Aid%C3%A9.%20";

const $ = (selector) => document.querySelector(selector);

const days = $("#days");
const hours = $("#hours");
const minutes = $("#minutes");
const seconds = $("#seconds");
const countdown = $("#countdown");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date().getTime();
  const target = new Date(EVENT_DATE).getTime();
  const diff = target - now;

  if (diff <= 0) {
    countdown.innerHTML = `<div class="celebration-live"><strong>¡Hoy es el gran día!</strong><span>Gracias por acompañarme</span></div>`;
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const d = Math.floor(totalSeconds / 86400);
  const h = Math.floor((totalSeconds % 86400) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  days.textContent = pad(d);
  hours.textContent = pad(h);
  minutes.textContent = pad(m);
  seconds.textContent = pad(s);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Maps y confirmación
$("#mapsBtn").href = GOOGLE_MAPS_URL;
$("#mapFrame").src = GOOGLE_MAPS_EMBED;
$("#confirmBtn").href = WHATSAPP_CONFIRM_URL;

// Animación al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Música de fondo
const music = $("#bgMusic");
const musicToggle = $("#musicToggle");
const musicIcon = $("#musicIcon");
const musicText = $("#musicText");

function setMusicState(isPlaying) {
  musicToggle.classList.toggle("playing", isPlaying);
  musicIcon.textContent = isPlaying ? "Ⅱ" : "♪";
  musicText.textContent = isPlaying ? "Pausar" : "Música";
}

async function playMusic() {
  try {
    await music.play();
    setMusicState(true);
  } catch (error) {
    setMusicState(false);
  }
}

function pauseMusic() {
  music.pause();
  setMusicState(false);
}

// Muchos navegadores bloquean el autoplay con sonido. Se intenta al cargar y también al primer toque/clic.
window.addEventListener("load", playMusic);
document.addEventListener("pointerdown", function enableMusicOnce() {
  if (music.paused) playMusic();
  document.removeEventListener("pointerdown", enableMusicOnce);
}, { once: true });

musicToggle.addEventListener("click", () => {
  if (music.paused) {
    playMusic();
  } else {
    pauseMusic();
  }
});
