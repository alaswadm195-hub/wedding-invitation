
// ================= AOS =================

AOS.init({
    duration: 1500,
    once: true,
    offset: 250
});


// ================= Loader =================

window.addEventListener("load", () => {

    setTimeout(() => {

        document.querySelector(".loader").style.display = "none";

    }, 3000);

});


// ================= Countdown =================

const weddingDate = new Date("July 1, 2026 21:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    document.getElementById("days").innerHTML =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerHTML =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    document.getElementById("minutes").innerHTML =
        Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    document.getElementById("seconds").innerHTML =
        Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );

}, 1000);


// ================= Music =================

const musicBtn = document.getElementById("music-btn");

const song = document.getElementById("song");

song.volume = 0.5;

window.addEventListener("load", () => {

    song.play().catch(() => {

        console.log("Autoplay blocked");

    });

});



let playing = false;

musicBtn.addEventListener("click", () => {

    if (!playing) {

        song.play();

        musicBtn.innerHTML = "⏸";

        musicBtn.classList.add("rotate");

        playing = true;

    }

    else {

        song.pause();

        musicBtn.innerHTML = "🎵";

        musicBtn.classList.remove("rotate");

        playing = false;

    }

});


// ================= Flowers =================

const flowers = document.querySelector(".flowers");

function createFlower() {

    const flower = document.createElement("div");

    flower.classList.add("flower");

    flower.innerHTML = "🌸";

    flower.style.left = Math.random() * 100 + "vw";

    flower.style.animationDuration =
        Math.random() * 4 + 6 + "s";

    flower.style.opacity = Math.random();

    flowers.appendChild(flower);

    setTimeout(() => {

        flower.remove();

    }, 10000);

}

setInterval(createFlower, 250);


// ================= Hearts =================

const hearts = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        Math.random() * 20 + 15 + "px";

    heart.style.animationDuration =
        Math.random() * 3 + 5 + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 9000);

}

setInterval(createHeart, 600);


// ================= Stars =================

const stars = document.querySelector(".stars");

for (let i = 0; i < 200; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    const size = Math.random() * 3;

    star.style.width = size + "px";

    star.style.height = size + "px";

    star.style.left = Math.random() * 100 + "vw";

    star.style.top = Math.random() * 100 + "vh";

    star.style.animationDuration =
        Math.random() * 2 + 1 + "s";

    stars.appendChild(star);

}


// ================= Couple Parallax =================

window.addEventListener("scroll", () => {

    const couple = document.querySelector(".couple img");

    let value = window.scrollY;

    couple.style.transform =
        `translateY(${value * 0.05}px)`;

});


// ================= Confetti =================

setTimeout(() => {

    if (typeof confetti === "function") {

        confetti({

            particleCount: 150,

            spread: 120,

            origin: { y: 0.6 }

        });

    }

}, 4000);
