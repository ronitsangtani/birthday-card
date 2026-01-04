/* ---------------- NAME (ALWAYS WORKS) ---------------- */
let name = new URLSearchParams(window.location.search).get("name");

if (!name || name.trim() === "") {
    name = prompt("Enter your name:");
}

name = name ? name.trim().toUpperCase() : "DEAR FRIEND";
document.getElementById("name").innerText = name;

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

/* ---------------- AUDIO (MOBILE SAFE) ---------------- */
const audio = document.getElementById("song");

function startAudio() {
    audio.volume = 0.6;
    audio.play().catch(() => {});
    document.removeEventListener("touchstart", startAudio);
    document.removeEventListener("click", startAudio);
}

document.addEventListener("touchstart", startAudio, { once: true });
document.addEventListener("click", startAudio, { once: true });

/* ---------------- CANVAS SETUP (HD MOBILE) ---------------- */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

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

function createFirework(x = Math.random() * canvas.width, y = Math.random() * canvas.height / 2) {
    return {
        x,
        y,
        particles: Array.from({ length: 30 }, () => ({
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 4 + 2,
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

/* ---------------- CONFETTI ---------------- */
let confetti = [];

function createConfetti(x = Math.random() * canvas.width, y = -10) {
    return {
        x,
        y,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 5 - 2.5,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
    };
}

function drawConfetti(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rotation * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    ctx.restore();
}

/* ---------------- TOUCH EFFECTS ---------------- */
canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];

    fireworks.push(createFirework(t.clientX, t.clientY));

    for (let i = 0; i < 20; i++) {
        confetti.push(createConfetti(t.clientX, t.clientY));
    }
});

/* ---------------- ANIMATION LOOP ---------------- */
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.04) hearts.push(createHeart());
    if (Math.random() < 0.015) fireworks.push(createFirework());
    if (Math.random() < 0.08) confetti.push(createConfetti());

    hearts.forEach((h, i) => {
        h.y -= h.speed;
        drawHeart(h);
        if (h.y < -30) hearts.splice(i, 1);
    });

    fireworks.forEach((fw, i) => {
        drawFirework(fw);
        fw.particles = fw.particles.filter(p => p.life > 0);
        if (!fw.particles.length) fireworks.splice(i, 1);
    });

    confetti.forEach((c, i) => {
        c.y += c.speed;
        c.rotation += c.rotationSpeed;
        drawConfetti(c);
        if (c.y > canvas.height + 20) confetti.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

animate();
