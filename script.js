// ============================================
// script.js — minimal interactions
// ============================================

// Top bar background on scroll
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
    if (topbar) topbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Menu pill
const menuPill = document.getElementById('menuPill');
if (menuPill) {
    menuPill.addEventListener('click', e => {
        if (e.target.closest('.menu-list a')) {
            menuPill.classList.remove('open');
            return;
        }
        menuPill.classList.toggle('open');
    });
    document.addEventListener('click', e => {
        if (!menuPill.contains(e.target)) menuPill.classList.remove('open');
    });
}

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Stat counters
const animateCounter = el => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1600;
    const step = target / (duration / 16);
    let current = 0;
    const tick = () => {
        current += step;
        if (current < target) {
            el.textContent = Math.floor(current) + '+';
            requestAnimationFrame(tick);
        } else {
            el.textContent = target + '+';
        }
    };
    tick();
};

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// Open Graph URL
const SITE_URL = 'https://maryanjimale959-lab.github.io/portfolio-site';
let ogUrl = document.querySelector('meta[property="og:url"]');
if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
}
ogUrl.setAttribute('content', SITE_URL);
document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(meta => {
    const path = meta.getAttribute('content');
    if (path && !path.startsWith('http')) {
        meta.setAttribute('content', SITE_URL + '/' + path.replace(/^\//, ''));
    }
});
