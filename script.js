// ============================================

// CONFIG — set your live URL after deploying

// Example: 'https://mariam-portfolio.netlify.app'

// ============================================

const SITE_URL = 'https://maryanjimale959-lab.github.io/portfolio-site';

const GITHUB_USER = 'maryanjimale959-lab';

const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`;



// Fallback projects shown until your GitHub repos are public

const FALLBACK_PROJECTS = [

    {

        name: 'AI Student Helper',

        description: 'Full-stack AI education platform with multi-LLM integration, real-time streaming, and study tools built with Django.',

        language: 'Python',

        topics: ['Django', 'Python', 'AI'],

        featured: true

    },

    {

        name: 'Event Booking Platform',

        description: 'Booking system with seat selection, payment integration, and a user dashboard with transaction history.',

        language: 'JavaScript',

        topics: ['HTML', 'CSS', 'JS']

    },

    {

        name: 'Medscope',

        description: 'Healthcare management system with secure patient records, intake workflows, and role-based access control.',

        language: 'Python',

        topics: ['Flask', 'Python']

    },

    {

        name: 'Multi-Chat Application',

        description: 'Real-time messaging in C++ using socket programming, multi-threading, and a custom network protocol.',

        language: 'C++',

        topics: ['C++', 'Sockets']

    },

    {

        name: 'Logic Games Collection',

        description: 'Interactive games including Sudoku solver, Chess AI, Go, and Minesweeper with vanilla JavaScript.',

        language: 'JavaScript',

        topics: ['JavaScript', 'HTML5']

    },

    {

        name: '80 C++ Projects',

        description: 'Collection covering data structures, algorithms, design patterns, and performance optimization.',

        language: 'C++',

        topics: ['C++', 'Algorithms']

    },

    {

        name: 'Go Game',

        description: 'Full Go (Weiqi) implementation with territory scoring, ko rule detection, and capture logic.',

        language: 'JavaScript',

        topics: ['JavaScript']

    },

    {

        name: 'Math Adventure',

        description: 'Educational game with adaptive difficulty, achievements, and progress tracking for young learners.',

        language: 'JavaScript',

        topics: ['JavaScript', 'HTML5']

    }

];



// Navigation scroll

const nav = document.getElementById('nav');

const navToggle = document.getElementById('navToggle');

const navLinks = document.getElementById('navLinks');



function getPortfolioUrl() {

    if (SITE_URL) return SITE_URL.replace(/\/$/, '');

    if (window.location.protocol.startsWith('http')) {

        return window.location.origin + window.location.pathname.replace(/index\.html?$/, '');

    }

    return '';

}



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

        if (link.getAttribute('href') === `#${current}`) {

            link.classList.add('active');

        }

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



const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            revealObserver.unobserve(entry.target);

        }

    });

}, { threshold: 0.12 });



document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));



const animateCounter = el => {

    const target = parseInt(el.getAttribute('data-target'), 10);

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

}, { threshold: 0.5 });



document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));



// Missing image placeholders

function handleMissingImage(img) {

    const wrap = img.closest('.hero-avatar');

    if (wrap) wrap.classList.add('missing-image');

}



document.querySelectorAll('.hero-photo').forEach(img => {

    img.addEventListener('error', () => handleMissingImage(img));

    if (!img.complete || img.naturalWidth === 0) {

        if (img.complete) handleMissingImage(img);

    }

});



// Load projects from GitHub (public repos)

const githubIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>';



function formatRepoName(name) {

    return name

        .replace(/[-_]/g, ' ')

        .replace(/\b\w/g, c => c.toUpperCase());

}



function renderProjects(projects, { fromGithub }) {

    const list = document.getElementById('projectsList');

    if (!list) return;



    if (!projects.length) {

        list.innerHTML = `

            <div class="projects-empty">

                <p>No public repositories yet.</p>

                <p>Make your GitHub repos <strong>public</strong> so companies can open the code and README.</p>

                <p><a href="${GITHUB_PROFILE}?tab=repositories" target="_blank" rel="noopener noreferrer">Open my GitHub →</a></p>

            </div>`;

        return;

    }



    list.innerHTML = (!fromGithub ? `

        <div class="projects-empty" style="margin-bottom:1rem;">

            <p>Your GitHub projects will appear here with direct <strong>View code</strong> and <strong>README</strong> links once the repositories are set to <strong>public</strong>.</p>

            <p><a href="${GITHUB_PROFILE}?tab=repositories" target="_blank" rel="noopener noreferrer">Make repos public on GitHub →</a></p>

        </div>` : '') + projects.map((p, i) => {

        const num = String(i + 1).padStart(2, '0');

        const title = p.name ? (fromGithub ? formatRepoName(p.name) : p.name) : 'Project';

        const desc = p.description || 'Open the repository to read the README and explore the source code.';

        const topics = (p.topics && p.topics.length)

            ? p.topics.slice(0, 4)

            : (p.language ? [p.language] : []);

        const featured = p.featured || i === 0;

        const repoUrl = p.html_url || GITHUB_PROFILE;

        const readmeUrl = p.html_url ? `${p.html_url}#readme` : GITHUB_PROFILE;



        return `

            <article class="project-item${featured ? ' featured' : ''} reveal visible">

                <span class="project-num">${num}</span>

                <div class="project-info">

                    ${featured ? '<span class="featured-label">Featured</span>' : ''}

                    <h3>${title}</h3>

                    <p>${desc}</p>

                    <div class="project-actions">

                        <a class="project-link" href="${repoUrl}" target="_blank" rel="noopener noreferrer">${githubIcon} View code</a>

                        <a class="project-link" href="${readmeUrl}" target="_blank" rel="noopener noreferrer">README</a>

                    </div>

                </div>

                <div class="project-meta">

                    <div class="project-stack">

                        ${topics.map(t => `<span class="stack-pill">${t}</span>`).join('')}

                    </div>

                </div>

            </article>`;

    }).join('');



    const stat = document.querySelector('.stat-number[data-target]');

    if (stat && fromGithub) {

        stat.dataset.target = String(projects.length);

        stat.textContent = '0';

    }

}



async function loadGithubProjects() {

    try {

        const res = await fetch(

            `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,

            { headers: { Accept: 'application/vnd.github+json' } }

        );

        if (!res.ok) throw new Error('GitHub API error');

        const repos = (await res.json())

            .filter(r => !r.fork && !r.private)

            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));



        if (repos.length) {

            renderProjects(repos, { fromGithub: true });

            return;

        }

    } catch (err) {

        console.warn('Could not load GitHub repos:', err);

    }



    renderProjects(FALLBACK_PROJECTS, { fromGithub: false });

}



loadGithubProjects();



// Social sharing

const portfolioUrlInput = document.getElementById('portfolioUrl');

const copyLinkBtn = document.getElementById('copyLinkBtn');

const shareWhatsApp = document.getElementById('shareWhatsApp');

const shareNote = document.getElementById('shareNote');



const portfolioUrl = getPortfolioUrl();

const shareText = encodeURIComponent('Check out my portfolio — Mariam Hassan Jimale, IT Student & Developer');



if (portfolioUrlInput) {

    portfolioUrlInput.value = portfolioUrl || 'Upload your site online first (Netlify, GitHub Pages, etc.)';

}



if (shareWhatsApp && portfolioUrl) {

    shareWhatsApp.href = `https://wa.me/?text=${shareText}%20${encodeURIComponent(portfolioUrl)}`;

}



if (copyLinkBtn) {

    copyLinkBtn.addEventListener('click', async () => {

        const url = getPortfolioUrl();

        if (!url) {

            alert('Deploy your portfolio online first, then set SITE_URL at the top of script.js.');

            return;

        }

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



// Update Open Graph URL when live

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



const contactForm = document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener('submit', e => {

        e.preventDefault();

        alert('Thank you for your message! I will get back to you soon.');

        contactForm.reset();

    });

}


