// ======================================================
// PERSONALIZA AQUÍ LOS DATOS DE LA INVITACIÓN
// ======================================================
const invitationConfig = {
  eventDate: "2026-08-08T14:00:00-06:00",

  venueName: "SALÓN SAMSARA",
  venueAddress:
    "Av. Cuauhtemoc 115, Tepeyac, 93250 Poza Rica de Hidalgo, Ver.",

  mapsLink: "https://maps.app.goo.gl/UGr6rXFFoYw5cQ7s5",

  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.4393653180605!2d-97.43607868834636!3d20.52919648091882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da41d32e2fd45b%3A0x646179e226f67a39!2sSamsara%20Sal%C3%B3n%20de%20Eventos!5e0!3m2!1ses!2smx!4v1784267831553!5m2!1ses!2smx"
};

// ======================================================
// APLICAR DATOS EDITABLES
// ======================================================
document.getElementById("venueName").textContent =
  invitationConfig.venueName;

document.getElementById("venueAddress").textContent =
  invitationConfig.venueAddress;

document.getElementById("locationTitle").textContent =
  invitationConfig.venueName;

document.getElementById("locationText").textContent =
  invitationConfig.venueAddress;

document.getElementById("mapsButton").href =
  invitationConfig.mapsLink;

document.getElementById("mapFrame").src =
  invitationConfig.mapsEmbed;

// ======================================================
// CUENTA REGRESIVA
// ======================================================
const eventTime = new Date(
  invitationConfig.eventDate
).getTime();

const countdownEls = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const distance = eventTime - Date.now();

  if (distance <= 0) {
    countdownEls.days.textContent = "00";
    countdownEls.hours.textContent = "00";
    countdownEls.minutes.textContent = "00";
    countdownEls.seconds.textContent = "00";
    return;
  }

  const days = Math.floor(
    distance / 86400000
  );

  const hours = Math.floor(
    (distance % 86400000) / 3600000
  );

  const minutes = Math.floor(
    (distance % 3600000) / 60000
  );

  const seconds = Math.floor(
    (distance % 60000) / 1000
  );

  countdownEls.days.textContent =
    String(days).padStart(2, "0");

  countdownEls.hours.textContent =
    String(hours).padStart(2, "0");

  countdownEls.minutes.textContent =
    String(minutes).padStart(2, "0");

  countdownEls.seconds.textContent =
    String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ======================================================
// ANIMACIONES AL HACER SCROLL
// ======================================================
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

document
  .querySelectorAll(".reveal")
  .forEach(element => {
    observer.observe(element);
  });

// ======================================================
// MÚSICA DE FONDO
// ======================================================
const soundButton =
  document.getElementById("soundButton");

const stadiumAudio =
  document.getElementById("stadiumAudio");

const NORMAL_VOLUME = 0.32;

let userPausedAudio = false;

if (stadiumAudio) {
  stadiumAudio.volume = NORMAL_VOLUME;
}

function updateSoundButton() {
  if (!soundButton || !stadiumAudio) {
    return;
  }

  const isPlaying = !stadiumAudio.paused;

  soundButton.classList.toggle(
    "is-playing",
    isPlaying
  );

  soundButton.setAttribute(
    "aria-pressed",
    String(isPlaying)
  );

  soundButton.setAttribute(
    "aria-label",
    isPlaying
      ? "Pausar música"
      : "Reproducir música"
  );
}

async function playBackgroundMusic() {
  if (!stadiumAudio) {
    return false;
  }

  try {
    stadiumAudio.muted = false;
    stadiumAudio.volume = NORMAL_VOLUME;

    await stadiumAudio.play();

    userPausedAudio = false;
    updateSoundButton();

    return true;
  } catch (error) {
    updateSoundButton();
    return false;
  }
}

function pauseBackgroundMusic() {
  if (!stadiumAudio) {
    return;
  }

  userPausedAudio = true;
  stadiumAudio.pause();
  updateSoundButton();
}

function removeUnlockListeners() {
  document.removeEventListener(
    "pointerdown",
    unlockAudio
  );

  document.removeEventListener(
    "keydown",
    unlockAudio
  );
}

async function unlockAudio(event) {
  if (
    !stadiumAudio ||
    !stadiumAudio.paused ||
    userPausedAudio
  ) {
    return;
  }

  // Evita que el desbloqueo y el botón se ejecuten
  // al mismo tiempo.
  if (
    soundButton &&
    event.target instanceof Node &&
    soundButton.contains(event.target)
  ) {
    return;
  }

  const started =
    await playBackgroundMusic();

  if (started) {
    removeUnlockListeners();
  }
}

// Intenta iniciar automáticamente.
window.addEventListener("load", () => {
  playBackgroundMusic();
});

// Si el navegador bloquea el autoplay,
// comienza con la primera interacción.
document.addEventListener(
  "pointerdown",
  unlockAudio
);

document.addEventListener(
  "keydown",
  unlockAudio
);

// Botón único de reproducción y pausa.
if (soundButton && stadiumAudio) {
  soundButton.addEventListener(
    "click",
    async event => {
      event.preventDefault();
      event.stopPropagation();

      if (stadiumAudio.paused) {
        await playBackgroundMusic();
        removeUnlockListeners();
      } else {
        pauseBackgroundMusic();
      }
    }
  );

  stadiumAudio.addEventListener(
    "play",
    updateSoundButton
  );

  stadiumAudio.addEventListener(
    "pause",
    updateSoundButton
  );

  stadiumAudio.addEventListener(
    "ended",
    updateSoundButton
  );
}

updateSoundButton();

// ======================================================
// PARALLAX SUAVE EN ESCRITORIO
// ======================================================
const visual =
  document.querySelector(".hero-visual");

window.addEventListener(
  "pointermove",
  event => {
    if (
      window.innerWidth < 980 ||
      !visual
    ) {
      return;
    }

    const x =
      (
        event.clientX /
        window.innerWidth -
        0.5
      ) * 10;

    const y =
      (
        event.clientY /
        window.innerHeight -
        0.5
      ) * 10;

    visual.style.transform =
      `translate3d(${x}px, ${y}px, 0)`;
  }
);
