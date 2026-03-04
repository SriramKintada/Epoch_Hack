// ─── NAV SCROLL EFFECT ─────────────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ─── MOBILE HAMBURGER ──────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
    const open = navMobile.style.display === 'flex';
    navMobile.style.display = open ? 'none' : 'flex';
});

navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { navMobile.style.display = 'none'; });
});

// ─── FADE-IN ON SCROLL (BRUTALIST FAST TIMING) ─────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

function staggerChildren(selector, delayStep) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('fade-in');
        el.dataset.delay = i * delayStep;
    });
}

// Minimal stagger delays for snappier hacker aesthetic
staggerChildren('.benefit-card', 50);
staggerChildren('.track-card', 100);
staggerChildren('.m-card', 50);
staggerChildren('.partner-card', 80);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── SMOOTH SCROLL FOR NAV LINKS ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
