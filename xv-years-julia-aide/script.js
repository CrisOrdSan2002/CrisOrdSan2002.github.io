// Configuración rápida
const EVENT_DATE = "2026-08-22T00:00:00-06:00";

// Ubicaciones del evento
const CHURCH_MAPS_URL = "https://maps.app.goo.gl/8YRnJg5C2GDdwYQN9";
const CHURCH_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d319.2290574350656!2d-97.44896418702812!3d20.55159708601609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da6aad55db22d5%3A0xa333c11e91f1552a!2sDivina%20Providencia!5e1!3m2!1ses!2smx!4v1784783503236!5m2!1ses!2smx";
const VENUE_MAPS_URL = "https://maps.app.goo.gl/SoKTaF3D4cuVYh368";
const VENUE_MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10216.826389541577!2d-97.43607868804817!3d20.529196480918756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da41d32e2fd45b%3A0x646179e226f67a39!2sSamsara%20Sal%C3%B3n%20de%20Eventos!5e1!3m2!1ses!2smx!4v1784668723497!5m2!1ses!2smx";
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
$("#churchMapsBtn").href = CHURCH_MAPS_URL;
$("#churchMapFrame").src = CHURCH_MAPS_EMBED;
$("#venueMapsBtn").href = VENUE_MAPS_URL;
$("#venueMapFrame").src = VENUE_MAPS_EMBED;
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

let musicUnlocked = false;

function setMusicState(isPlaying) {
  musicToggle.classList.toggle("playing", isPlaying);
  musicIcon.textContent = isPlaying ? "Ⅱ" : "♪";
  musicText.textContent = isPlaying ? "Pausar" : "Música";
}

async function playMusic() {
  try {
    await music.play();
    musicUnlocked = true;
    setMusicState(true);
    return true;
  } catch (error) {
    console.log("El navegador bloqueó la reproducción:", error);
    setMusicState(false);
    return false;
  }
}

function pauseMusic() {
  music.pause();
  setMusicState(false);
}
// Solo es un intento; en móviles normalmente será bloqueado.
window.addEventListener("load", () => {
  playMusic();
});
// Primer clic o toque válido dentro de la página.
async function unlockMusic(event) {
  // El botón de música administra su propio clic.
  if (event.target.closest("#musicToggle")) return;

  const started = await playMusic();

  // Solo retiramos los eventos cuando realmente comenzó.
  if (started) {
    document.removeEventListener("click", unlockMusic);
    document.removeEventListener("touchend", unlockMusic);
  }
}

document.addEventListener("click", unlockMusic);
document.addEventListener("touchend", unlockMusic, { passive: true });

musicToggle.addEventListener("click", async (event) => {
  event.stopPropagation();

  if (music.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
});
