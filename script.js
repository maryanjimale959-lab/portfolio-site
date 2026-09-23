// ============================================
// script.js — interactions, particles, Go demo
// ============================================

const SITE_URL = 'https://maryanjimale959-lab.github.io/portfolio-site';
const GITHUB_PROFILE = 'https://github.com/maryanjimale959-lab';

// ---------------- Navigation ----------------
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
    });
}

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ---------------- Reveal on scroll ----------------
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------------- Stat counters ----------------
const animateCounter = el => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
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

// ---------------- Skill bars ----------------
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const row = entry.target;
        const level = parseInt(row.getAttribute('data-level'), 10) || 0;
        const fill = row.querySelector('.bar-fill');
        if (fill) fill.style.width = level + '%';
        if (level >= 90) row.classList.add('maxed');
        barObserver.unobserve(row);
    });
}, { threshold: 0.5 });

document.querySelectorAll('.bar-row').forEach(el => barObserver.observe(el));

// ---------------- Typing effect ----------------
const typeTarget = document.getElementById('typeTarget');
if (typeTarget) {
    const words = ['games.', 'game AI.', 'Somali apps.', 'voice tech.', 'Python backends.', 'the future.'];
    let wi = 0, ci = 0, deleting = false;
    const tickType = () => {
        const word = words[wi];
        if (!deleting) {
            ci++;
            typeTarget.textContent = word.slice(0, ci);
            if (ci === word.length) { deleting = true; setTimeout(tickType, 1600); return; }
            setTimeout(tickType, 75);
        } else {
            ci--;
            typeTarget.textContent = word.slice(0, ci);
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tickType, 350); return; }
            setTimeout(tickType, 35);
        }
    };
    setTimeout(tickType, 1200);
}

// ---------------- Particles ----------------
const pc = document.getElementById('particles');
if (pc && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = pc.getContext('2d');
    let dots = [];
    const COLORS = ['#8b5cf6', '#c4b5fd', '#f472b6', '#fbbf24'];

    const resize = () => {
        pc.width = pc.offsetWidth;
        pc.height = pc.offsetHeight;
        dots = Array.from({ length: 40 }, () => ({
            x: Math.random() * pc.width,
            y: Math.random() * pc.height,
            s: Math.random() < 0.5 ? 2 : 3,
            vx: (Math.random() - .5) * .25,
            vy: -Math.random() * .35 - .05,
            c: COLORS[Math.floor(Math.random() * COLORS.length)],
            a: Math.random() * .5 + .15,
        }));
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
        ctx.clearRect(0, 0, pc.width, pc.height);
        dots.forEach(d => {
            d.x += d.vx; d.y += d.vy;
            if (d.y < -5) { d.y = pc.height + 5; d.x = Math.random() * pc.width; }
            if (d.x < -5) d.x = pc.width + 5;
            if (d.x > pc.width + 5) d.x = -5;
            ctx.globalAlpha = d.a;
            ctx.fillStyle = d.c;
            ctx.fillRect(Math.round(d.x), Math.round(d.y), d.s, d.s);
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(loop);
    };
    loop();
}

// ============================================
// PLAYABLE GO DEMO — 9x9, rules-lite
// captures ✓ · suicide ban ✓ · simple ko ✓ ·
// territory scoring after two passes
// ============================================
(() => {
    const canvas = document.getElementById('goBoard');
    if (!canvas) return;
    const statusEl = document.getElementById('goStatus');
    const N = 9;
    const CELL = 50, PAD = 25;
    canvas.width = canvas.height = PAD * 2 + CELL * (N - 1);
    const ctx = canvas.getContext('2d');

    const EMPTY = 0, BLACK = 1, WHITE = 2;
    let board, lastMove, koPoint, passes, gameOver, captures;

    const idx = (x, y) => y * N + x;
    const inB = (x, y) => x >= 0 && x < N && y >= 0 && y < N;
    const neighbors = (x, y) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].filter(([a, b]) => inB(a, b));

    function group(bd, x, y) {
        const color = bd[idx(x, y)];
        const seen = new Set([idx(x, y)]);
        const stack = [[x, y]];
        const libs = new Set();
        const stones = [];
        while (stack.length) {
            const [cx, cy] = stack.pop();
            stones.push([cx, cy]);
            neighbors(cx, cy).forEach(([nx, ny]) => {
                const ni = idx(nx, ny);
                if (bd[ni] === EMPTY) libs.add(ni);
                else if (bd[ni] === color && !seen.has(ni)) { seen.add(ni); stack.push([nx, ny]); }
            });
        }
        return { stones, libs };
    }

    function tryMove(bd, x, y, color) {
        if (bd[idx(x, y)] !== EMPTY) return null;
        if (koPoint && koPoint === idx(x, y) && color === BLACK) return null;
        const next = bd.slice();
        next[idx(x, y)] = color;
        const enemy = color === BLACK ? WHITE : BLACK;
        let captured = 0;
        neighbors(x, y).forEach(([nx, ny]) => {
            if (next[idx(nx, ny)] === enemy) {
                const g = group(next, nx, ny);
                if (g.libs.size === 0) {
                    g.stones.forEach(([sx, sy]) => { next[idx(sx, sy)] = EMPTY; captured++; });
                }
            }
        });
        const own = group(next, x, y);
        if (own.libs.size === 0 && captured === 0) return null; // suicide
        return { board: next, captured };
    }

    function legalMoves(bd, color) {
        const moves = [];
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            const r = tryMove(bd, x, y, color);
            if (r) moves.push({ x, y, captured: r.captured, board: r.board });
        }
        return moves;
    }

    // ---- AI: greedy with influence ----
    function aiMove() {
        const moves = legalMoves(board, WHITE);
        if (!moves.length) return null;
        let best = null, bestScore = -Infinity;
        for (const m of moves) {
            let score = m.captured * 12;
            // threaten enemy groups with 1 liberty
            neighbors(m.x, m.y).forEach(([nx, ny]) => {
                if (board[idx(nx, ny)] === BLACK) {
                    const g = group(board, nx, ny);
                    if (g.libs.size === 1) score += 6;
                    if (g.libs.size === 2) score += 2;
                }
                if (board[idx(nx, ny)] === WHITE) {
                    const g = group(board, nx, ny);
                    if (g.libs.size === 1) score += 8; // save own
                }
            });
            // influence: prefer near last move, avoid filling own eyes
            if (lastMove) score += 3 - (Math.abs(m.x - lastMove.x) + Math.abs(m.y - lastMove.y)) * 0.4;
            const emptyN = neighbors(m.x, m.y).filter(([a, b]) => board[idx(a, b)] === EMPTY).length;
            if (emptyN === 0) score -= 20;
            // don't walk into capture: check resulting group liberties
            const g = group(m.board, m.x, m.y);
            score += Math.min(g.libs.size, 3) * 1.5;
            score += Math.random() * 1.2;
            if (score > bestScore) { bestScore = score; best = m; }
        }
        return bestScore < 2 ? null : best;
    }

    // ---- scoring ----
    function score() {
        let b = 0, w = 0, tb = 0, tw = 0;
        const seen = new Set();
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            const c = board[idx(x, y)];
            if (c === BLACK) b++; else if (c === WHITE) w++;
        }
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            if (board[idx(x, y)] !== EMPTY || seen.has(idx(x, y))) continue;
            const region = [];
            const stack = [[x, y]];
            const touch = new Set();
            seen.add(idx(x, y));
            while (stack.length) {
                const [cx, cy] = stack.pop();
                region.push([cx, cy]);
                neighbors(cx, cy).forEach(([nx, ny]) => {
                    const ni = idx(nx, ny);
                    if (board[ni] === EMPTY && !seen.has(ni)) { seen.add(ni); stack.push([nx, ny]); }
                    else if (board[ni] !== EMPTY) touch.add(board[ni]);
                });
            }
            if (touch.size === 1) {
                if (touch.has(BLACK)) tb += region.length; else tw += region.length;
            }
        }
        return { black: b + tb, white: w + tw + 5.5 }; // komi for AI going second
    }

    // ---- drawing ----
    function draw() {
        const W = canvas.width;
        ctx.clearRect(0, 0, W, W);
        ctx.fillStyle = '#d8a75c';
        ctx.fillRect(0, 0, W, W);
        ctx.strokeStyle = '#5b3a1e';
        ctx.lineWidth = 1.5;
        for (let i = 0; i < N; i++) {
            const p = PAD + i * CELL;
            ctx.beginPath(); ctx.moveTo(PAD, p); ctx.lineTo(W - PAD, p); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(p, PAD); ctx.lineTo(p, W - PAD); ctx.stroke();
        }
        ctx.fillStyle = '#5b3a1e';
        [[2, 2], [6, 2], [2, 6], [6, 6], [4, 4]].forEach(([x, y]) => {
            ctx.beginPath();
            ctx.arc(PAD + x * CELL, PAD + y * CELL, 3.5, 0, Math.PI * 2);
            ctx.fill();
        });
        for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
            const c = board[idx(x, y)];
            if (!c) continue;
            const px = PAD + x * CELL, py = PAD + y * CELL;
            const grad = ctx.createRadialGradient(px - 4, py - 4, 2, px, py, 20);
            if (c === BLACK) { grad.addColorStop(0, '#3c3550'); grad.addColorStop(1, '#0c0a14'); }
            else { grad.addColorStop(0, '#ffffff'); grad.addColorStop(1, '#b9b3cc'); }
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(px, py, 21, 0, Math.PI * 2); ctx.fill();
        }
        if (lastMove) {
            ctx.strokeStyle = '#f472b6';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(PAD + lastMove.x * CELL, PAD + lastMove.y * CELL, 10, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function setStatus(text, cls) {
        statusEl.textContent = text;
        statusEl.className = 'go-status' + (cls ? ' ' + cls : '');
    }

    function endGame() {
        gameOver = true;
        const s = score();
        const youWin = s.black > s.white;
        const diff = Math.abs(s.black - s.white).toFixed(1);
        setStatus(
            youWin
                ? `🏆 You win! You ${s.black} — AI ${s.white} (by ${diff})`
                : `🤖 The AI wins — You ${s.black} vs AI ${s.white} (by ${diff})`,
            youWin ? 'win' : 'lose'
        );
    }

    function aiTurn() {
        if (gameOver) return;
        setTimeout(() => {
            const m = aiMove();
            if (!m) {
                passes++;
                setStatus(passes >= 2 ? 'Both passed — counting…' : 'AI passes. Your move — you play ● black');
                if (passes >= 2) endGame();
                return;
            }
            const prev = board;
            board = m.board;
            captures.white += m.captured;
            koPoint = (m.captured === 1 && group(m.board, m.x, m.y).stones.length === 1)
                ? koPointFor(prev, board) : null;
            lastMove = { x: m.x, y: m.y };
            passes = 0;
            draw();
            if (!legalMoves(board, BLACK).length) { endGame(); return; }
            setStatus(`Your move — you play ● black (you captured ${captures.black}, AI ${captures.white})`);
        }, 350);
    }

    function koPointFor(prevBoard, newBoard) {
        for (let i = 0; i < N * N; i++) {
            if (prevBoard[i] !== EMPTY && newBoard[i] === EMPTY) return i;
        }
        return null;
    }

    function play(x, y) {
        if (gameOver) return;
        const r = tryMove(board, x, y, BLACK);
        if (!r) { setStatus('Illegal move there — try another point'); return; }
        const wasKoCandidate = r.captured === 1;
        const prev = board;
        board = r.board;
        captures.black += r.captured;
        koPoint = (wasKoCandidate && group(board, x, y).stones.length === 1) ? koPointFor(prev, board) : null;
        lastMove = { x, y };
        passes = 0;
        draw();
        if (!legalMoves(board, WHITE).length) { endGame(); return; }
        aiTurn();
    }

    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        const mx = (e.clientX - rect.left) * scale;
        const my = (e.clientY - rect.top) * scale;
        const x = Math.round((mx - PAD) / CELL);
        const y = Math.round((my - PAD) / CELL);
        if (inB(x, y)) play(x, y);
    });

    document.getElementById('goPass').addEventListener('click', () => {
        if (gameOver) return;
        passes++;
        setStatus(passes >= 2 ? 'Both passed — counting…' : 'You pass. AI thinking…');
        if (passes >= 2) { endGame(); return; }
        aiTurn();
    });

    document.getElementById('goNew').addEventListener('click', reset);

    function reset() {
        board = new Array(N * N).fill(EMPTY);
        lastMove = null; koPoint = null; passes = 0; gameOver = false;
        captures = { black: 0, white: 0 };
        draw();
        setStatus('Your move — you play ● black');
    }

    reset();
})();

// ---------------- Social sharing ----------------
function getPortfolioUrl() {
    if (SITE_URL) return SITE_URL.replace(/\/$/, '');
    if (window.location.protocol.startsWith('http')) {
        return window.location.origin + window.location.pathname.replace(/index\.html?$/, '');
    }
    return '';
}

const portfolioUrlInput = document.getElementById('portfolioUrl');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const portfolioUrl = getPortfolioUrl();
const shareText = encodeURIComponent('Check out my portfolio — Mariam Hassan Jimale, IT Student & Developer');

if (portfolioUrlInput) portfolioUrlInput.value = portfolioUrl;
if (shareWhatsApp && portfolioUrl) {
    shareWhatsApp.href = `https://wa.me/?text=${shareText}%20${encodeURIComponent(portfolioUrl)}`;
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', async () => {
        const url = getPortfolioUrl();
        if (!url) return;
        try {
            await navigator.clipboard.writeText(url);
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => { copyLinkBtn.textContent = 'Copy link'; }, 2000);
        } catch {
            portfolioUrlInput.select();
            document.execCommand('copy');
        }
    });
}

if (portfolioUrl) {
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', portfolioUrl);
    document.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]').forEach(meta => {
        const path = meta.getAttribute('content');
        if (path && !path.startsWith('http')) {
            meta.setAttribute('content', portfolioUrl.replace(/\/?$/, '/') + path.replace(/^\//, ''));
        }
    });
}

// ---------------- Contact form → mailto ----------------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:maryanjimale959@gmail.com?subject=${encodeURIComponent('[Portfolio] ' + subject)}&body=${body}`;
    });
}
