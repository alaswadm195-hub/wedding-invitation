// Wedding invitation: محمد وهاجر
// Saturday, 24 October 2026, 9:00 PM (Egypt)

if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1500, once: true, offset: 250 });
}

// The red curtain opens only after the guest presses the welcome button.
// A click is also the user gesture browsers need to start music with sound.
const curtainLoader = document.getElementById("curtain-loader");
const openInvitationBtn = document.getElementById("open-invitation-btn");
const musicBtn = document.getElementById("music-btn");
const song = document.getElementById("song");
let invitationOpened = false;

song.volume = 0.5;
song.loop = true;

function updateMusicButton() {
    const playing = !song.paused;
    musicBtn.textContent = playing ? "⏸" : "🎵";
    musicBtn.classList.toggle("rotate", playing);
    musicBtn.setAttribute("aria-label", playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى");
}

// Trigger song.play() directly inside the real click event, BEFORE
// timers, awaiting promises or opening the curtain.
function openInvitation() {
    if (invitationOpened) return;
    invitationOpened = true;
    openInvitationBtn.disabled = true;
    openInvitationBtn.setAttribute("aria-busy", "true");

    // Browser-authorized attempt to play sound on the guest's tap.
    const playback = song.play();
    if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
            console.info("Music could not start; guest can use the music button.");
            updateMusicButton();
        });
    }

    curtainLoader.classList.add("is-opening");

    window.setTimeout(() => {
        curtainLoader.remove();
        document.body.classList.remove("curtain-active");
        musicBtn.disabled = false;
        if (typeof AOS !== "undefined") AOS.refresh();

        if (typeof confetti === "function") {
            confetti({ particleCount: 150, spread: 120, origin: { y: 0.6 } });
        }
    }, 2300);
}

openInvitationBtn.addEventListener("click", openInvitation);
song.addEventListener("play", updateMusicButton);
song.addEventListener("pause", updateMusicButton);
song.addEventListener("ended", updateMusicButton);

// Music can be paused/restarted without reopening the invitation.
musicBtn.disabled = true;
musicBtn.addEventListener("click", () => {
    if (song.paused) {
        const playback = song.play();
        if (playback && typeof playback.catch === "function") {
            playback.catch(() => updateMusicButton());
        }
    } else {
        song.pause();
    }
});
updateMusicButton();

// Give keyboard visitors access to the main invitation button.
openInvitationBtn.focus({ preventScroll: true });

// Countdown uses an explicit time zone, independent of guests' locations.
const weddingDate = new Date("2026-10-24T21:00:00+03:00").getTime();

function updateCountdown() {
    const distance = Math.max(0, weddingDate - Date.now());
    const values = {
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance % 86400000) / 3600000),
        minutes: Math.floor((distance % 3600000) / 60000),
        seconds: Math.floor((distance % 60000) / 1000)
    };
    for (const [id, value] of Object.entries(values)) {
        const el = document.getElementById(id);
        if (el) el.textContent = id === "days" ? String(value) : String(value).padStart(2, "0");
    }
    if (distance === 0) clearInterval(countdownInterval);
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Floating flowers
const flowers = document.querySelector(".flowers");
function createFlower() {
    if (!flowers) return;
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = "🌸";
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = (Math.random() * 4 + 6) + "s";
    flower.style.opacity = Math.random();
    flowers.appendChild(flower);
    setTimeout(() => flower.remove(), 10000);
}
setInterval(createFlower, 250);

// Floating hearts
const hearts = document.querySelector(".hearts");
function createHeart() {
    if (!hearts) return;
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (Math.random() * 20 + 15) + "px";
    heart.style.animationDuration = (Math.random() * 3 + 5) + "s";
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}
setInterval(createHeart, 600);

// Twinkling stars
const stars = document.querySelector(".stars");
if (stars) {
    for (let i = 0; i < 200; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        const size = Math.random() * 3;
        star.style.width = size + "px";
        star.style.height = size + "px";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDuration = (Math.random() * 2 + 1) + "s";
        stars.appendChild(star);
    }
}

// Subtle couple parallax
window.addEventListener("scroll", () => {
    const couple = document.querySelector(".couple img");
    if (couple) couple.style.transform = "translateY(" + (window.scrollY * 0.05) + "px)";
}, { passive: true });
