// ── 1. TYPEWRITER EFFECT ──────────────────────────────────────
new Typed('#typed-text', {
    strings: ['AI for venture capital.', 'agents that do the research.', 'deal flow on autopilot.', 'products that ship.'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
});

// ── 2. SCROLL REVEAL ─────────────────────────────────────────
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 900,
    delay: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    reset: false
});

sr.reveal('.reveal',       { interval: 120 });
sr.reveal('.skill-card',   { interval: 100 });
sr.reveal('.project-card', { interval: 100 });
sr.reveal('.edu-card',     { interval: 120 });
sr.reveal('.timeline-item',{ interval: 150 });
sr.reveal('.social-box',   { interval: 100, scale: 0.88, origin: 'bottom' });

// ── 3. THEME TOGGLE ──────────────────────────────────────────
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeIcon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
});

// ── 4. MOBILE NAV TOGGLE ─────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '70px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.padding = '16px 20px 20px';
    nav.style.background = 'var(--bg-2)';
    nav.style.borderBottom = '1px solid var(--border)';
    nav.style.gap = '4px';
    mobileMenuBtn.querySelector('i').className = open ? 'fas fa-bars' : 'fas fa-times';
});

// Close mobile nav when a link is clicked
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.cssText = '';
    }
});

// ── 5. NEURAL NETWORK CANVAS ─────────────────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x      = Math.random() * canvas.width;
        this.y      = Math.random() * canvas.height;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.size   = Math.random() * 1.5 + 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width  || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = Array.from({ length: 80 }, () => new Particle());
const CONNECTION_DIST = 110;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DIST) {
                ctx.strokeStyle = accentColor;
                ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.55;
                ctx.lineWidth   = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

animate();

// ── 6. ACTIVE NAV HIGHLIGHT ON SCROLL ────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));


// ── SPOTLIGHT: cards light up where the mouse is ───────────────
document.querySelectorAll('.spot').forEach(el => {
    el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
});
