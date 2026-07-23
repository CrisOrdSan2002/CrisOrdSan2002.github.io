// ======================================================
// PERSONALIZA AQUÍ LOS DATOS DE LA INVITACIÓN
// ======================================================
const invitationConfig = {
  eventDate: "2026-08-08T14:00:00-06:00",

  venueName: "SALÓN SAMSARA",
  venueAddress:
    "Av. Cuauhtemoc 115, Tepeyac, 93250 Poza Rica de Hidalgo, Ver.",

  // Usa el enlace que Google Maps genera al pulsar “Compartir”.
  mapsLink: "https://maps.app.goo.gl/UGr6rXFFoYw5cQ7s5",

  // Enlace para mostrar el mapa incrustado.
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3736.4393653180605!2d-97.43607868834636!3d20.52919648091882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85da41d32e2fd45b%3A0x646179e226f67a39!2sSamsara%20Sal%C3%B3n%20de%20Eventos!5e0!3m2!1ses!2smx!4v1784267831553!5m2!1ses!2smx",

  // ====================================================
  // WHATSAPP DESACTIVADO
  // ====================================================

  // Número con código de país, sin +, espacios ni guiones.
  // whatsappNumber: "5210000000000",

  // whatsappMessage:
  //   "¡Hola! Confirmo mi asistencia al cumpleaños mundialista de Stefan Alberto el 8 de agosto a las 2:00 PM."
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
// BOTÓN DE WHATSAPP DESACTIVADO
// ======================================================
//
// const whatsappButton = document.getElementById("whatsappButton");
//
// whatsappButton.href =
//   `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(
//     invitationConfig.whatsappMessage
//   )}`;

// ======================================================
// CUENTA REGRESIVA
// ======================================================
const eventTime = new Date(invitationConfig.eventDate).getTime();

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

  const days = Math.floor(distance / 86400000);
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
// MÚSICA DE FONDO AUTOMÁTICA
//
// Algunos navegadores bloquean el audio automático con
// sonido hasta que el usuario toca, hace clic o presiona
// una tecla.
//
// El código intenta reproducirlo automáticamente.
// Si se bloquea, comienza en la primera interacción.
// ======================================================
const soundButton =
  document.getElementById("soundButton");

const stadiumAudio =
  document.getElementById("stadiumAudio");

stadiumAudio.volume = 0.32;

// Actualiza el estado visual y accesible del botón.
function updateSoundButton(isPlaying) {
  if (!soundButton) {
    return;
  }

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
      ? "Pausar música de fondo"
      : "Reproducir música de fondo"
  );

  soundButton.title = isPlaying
    ? "Pausar música"
    : "Reproducir música";
}

// Intenta reproducir la música.
async function playBackgroundMusic() {
  try {
    await stadiumAudio.play();
    updateSoundButton(true);
    return true;
  } catch (error) {
    updateSoundButton(false);
    return false;
  }
}

// Intento inicial de reproducción automática.
playBackgroundMusic();

// Si el navegador bloquea el autoplay, se intenta iniciar
// cuando el visitante interactúe por primera vez.
async function unlockAudio() {
  if (!stadiumAudio.paused) {
    removeUnlockListeners();
    return;
  }

  const started = await playBackgroundMusic();

  if (started) {
    removeUnlockListeners();
  }
}

// Elimina los eventos después de iniciar el audio.
function removeUnlockListeners() {
  document.removeEventListener(
    "pointerdown",
    unlockAudio
  );

  document.removeEventListener(
    "keydown",
    unlockAudio
  );

  document.removeEventListener(
    "touchstart",
    unlockAudio
  );
}

// Eventos para desbloquear el audio.
document.addEventListener(
  "pointerdown",
  unlockAudio,
  {
    once: true
  }
);

document.addEventListener(
  "keydown",
  unlockAudio,
  {
    once: true
  }
);

document.addEventListener(
  "touchstart",
  unlockAudio,
  {
    once: true,
    passive: true
  }
);

// Botón para pausar o reanudar la música.
if (soundButton) {
  soundButton.addEventListener(
    "click",
    async event => {
      event.stopPropagation();

      if (stadiumAudio.paused) {
        await playBackgroundMusic();
      } else {
        stadiumAudio.pause();
        updateSoundButton(false);
      }
    }
  );
}

// Mantiene sincronizado el botón con el estado real del audio.
stadiumAudio.addEventListener(
  "play",
  () => {
    updateSoundButton(true);
  }
);

stadiumAudio.addEventListener(
  "pause",
  () => {
    updateSoundButton(false);
  }
);

// Si la música termina por alguna razón, actualiza el botón.
stadiumAudio.addEventListener(
  "ended",
  () => {
    updateSoundButton(false);
  }
);

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
