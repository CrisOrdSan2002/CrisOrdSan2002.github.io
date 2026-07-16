// ======================================================
// PERSONALIZA AQUÍ LOS DATOS DE LA INVITACIÓN
// ======================================================
const invitationConfig = {
  eventDate: "2026-08-08T14:00:00-06:00",

  venueName: "NOMBRE DEL LUGAR",
  venueAddress: "CALLE, NÚMERO, COLONIA, CIUDAD",

  // Usa el enlace que Google Maps genera al pulsar “Compartir”.
  mapsLink: "https://maps.google.com/?q=Ciudad+de+Mexico",

  // Para el mapa incrustado también puedes usar una búsqueda.
  // Sustituye los espacios por +.
  mapsEmbed: "https://www.google.com/maps?q=Ciudad+de+Mexico&output=embed",

  // Número con código de país, sin +, espacios ni guiones. Ejemplo México: 5215512345678
  whatsappNumber: "5210000000000",

  whatsappMessage:
    "¡Hola! Confirmo mi asistencia al cumpleaños mundialista de Stefan Alberto el 8 de agosto a las 2:00 PM. ⚽🎉"
};

// Aplicar datos editables
document.getElementById("venueName").textContent = invitationConfig.venueName;
document.getElementById("venueAddress").textContent = invitationConfig.venueAddress;
document.getElementById("locationTitle").textContent = invitationConfig.venueName;
document.getElementById("locationText").textContent = invitationConfig.venueAddress;
document.getElementById("mapsButton").href = invitationConfig.mapsLink;
document.getElementById("mapFrame").src = invitationConfig.mapsEmbed;

const whatsappButton = document.getElementById("whatsappButton");
whatsappButton.href =
  `https://wa.me/${invitationConfig.whatsappNumber}?text=${encodeURIComponent(invitationConfig.whatsappMessage)}`;

// Cuenta regresiva
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
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  countdownEls.days.textContent = String(days).padStart(2, "0");
  countdownEls.hours.textContent = String(hours).padStart(2, "0");
  countdownEls.minutes.textContent = String(minutes).padStart(2, "0");
  countdownEls.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Animaciones al hacer scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Audio opcional: agrega assets/ambiente-estadio.mp3
const soundButton = document.getElementById("soundButton");
const stadiumAudio = document.getElementById("stadiumAudio");
let soundActive = false;

soundButton.addEventListener("click", async () => {
  try {
    if (!soundActive) {
      stadiumAudio.volume = 0.32;
      await stadiumAudio.play();
      soundActive = true;
      soundButton.setAttribute("aria-pressed", "true");
      soundButton.innerHTML = '<span class="sound-icon">🔇</span> Pausar ambiente';
    } else {
      stadiumAudio.pause();
      soundActive = false;
      soundButton.setAttribute("aria-pressed", "false");
      soundButton.innerHTML = '<span class="sound-icon">🔊</span> Activar ambiente';
    }
  } catch {
    alert("Agrega el archivo assets/ambiente-estadio.mp3 para activar el sonido.");
  }
});

// Parallax suave en escritorio
const visual = document.querySelector(".hero-visual");
window.addEventListener("pointermove", event => {
  if (window.innerWidth < 980 || !visual) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});
