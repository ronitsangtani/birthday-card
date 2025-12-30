/* ---------------- NAME (ALWAYS WORKS) ---------------- */
let name = new URLSearchParams(window.location.search).get("name");

if (!name || name.trim() === "") {
    name = prompt("Enter your friend's name:");
}

document.getElementById("name").innerText = name || "Dear Friend";

/* ---------------- RANDOM MESSAGES ---------------- */
const messages = [
    "May your birthday be filled with laughter, love, and cake 🎂",
    "Wishing you a year full of happiness and success 🌟",
    "Another year older, another year more amazing 💖",
    "Hope your day sparkles as much as you do ✨",
    "Sending you hugs, smiles, and sweet memories 🎁",
    "May all your dreams come true this year 🌈"
];

document.getElementById("message").innerText =
    messages[Math.floor(Math.random() * messages.length)];

/* ---------------- AUDIO (Browser Safe) ---------------- */
const audio = document.getElementById("song");

document.body.addEventListener("click", () => {
    audio.volume = 0.6;
    audio.play().catch(() => {});
}, { once: true });

/* ---------------- CANVAS SETUP ---------------- */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ---------------- HEARTS ---------------- */
let hearts = [];

function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.6 + 0.4
    };
}

function drawHeart(h) {
    ctx.fillStyle = `rgba(255,105,180,${h.opacity})`;
    ctx.beginPath();
    ctx.moveTo(h.x, h.y);
    ctx.bezierCurveTo(
        h.x - h.size / 2, h.y - h.size / 2,
        h.x - h.size, h.y + h.size / 3,
        h.x, h.y + h.size
    );
    ctx.bezierCurveTo(
        h.x + h.size, h.y + h.size / 3,
        h.x + h.size / 2, h.y - h.size / 2,
        h.x, h.y
    );
    ctx.fill();
}

/* ---------------- FIREWORKS ---------------- */
let fireworks = [];

function createFirework() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        particles: Array.from({ length: 30 }, () => ({
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 3 + 2,
            radius: Math.random() * 2 + 1,
            life: 60
        }))
    };
}

function drawFirework(fw) {
    fw.particles.forEach(p => {
        const px = fw.x + Math.cos(p.angle) * p.speed * (60 - p.life);
        const py = fw.y + Math.sin(p.angle) * p.speed * (60 - p.life);
        ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},255,${p.life/60})`;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.life--;
    });
}

/* ---------------- ANIMATION LOOP ---------------- */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.07) hearts.push(createHeart());
    if (Math.random() < 0.03) fireworks.push(createFirework());

    hearts.forEach((h, i) => {
        h.y -= h.speed;
        drawHeart(h);
        if (h.y < -20) hearts.splice(i, 1);
    });

    fireworks.forEach((fw, i) => {
        drawFirework(fw);
        fw.particles = fw.particles.filter(p => p.life > 0);
        if (fw.particles.length === 0) fireworks.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();

/* ---------------- RESIZE ---------------- */
window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
