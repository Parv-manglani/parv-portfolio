// 1. TYPEWRITER EFFECT
new Typed('#typed-text', {
    strings: ['Data into Insights.', 'Models into Solutions.', 'Code into Automation.', 'AI into Reality.'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// 2. SCROLL REVEAL 
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false
});

sr.reveal('.reveal', { interval: 150 });
sr.reveal('.skill-card', { interval: 100 });
sr.reveal('.project-card', { interval: 100 });
// Staggered social box reveal
sr.reveal('.social-box', { interval: 150, scale: 0.8, origin: 'bottom' });

// 3. THEME TOGGLE
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? '☀️' : '🌙';
});

// 4. NEURAL NETWORK CANVAS
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.update(); p.draw();
        for (let j = index; j < particles.length; j++) {
            const distance = Math.hypot(p.x - particles[j].x, p.y - particles[j].y);
            if (distance < 100) {
                ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent');
                ctx.globalAlpha = 1 - (distance / 100);
                ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}
init(); animate();