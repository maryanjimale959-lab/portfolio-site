// ============================================================
// sprites.js — hand-coded pixel art, rendered to <canvas>
// Every sprite is a string map; each char = one pixel.
// '.' or ' ' = transparent.
// ============================================================

const PAL = {
    o: '#0a0812', // outline
    h: '#8b5cf6', // hijab
    H: '#6d40c9', // hijab shadow
    s: '#b0794c', // skin
    S: '#8a5c38', // skin shadow
    e: '#141024', // eyes
    m: '#5c3524', // mouth
    k: '#241d3d', // hoodie
    K: '#372c5a', // hoodie highlight
    g: '#c4b5fd', // glow accent
    p: '#171226', // pants
    d: '#0f0b1c', // shoes
    w: '#f5f3ff', // white
    a: '#fbbf24', // amber
    r: '#f472b6', // pink
    G: '#34d399', // green
    b: '#d8a75c', // wood
    n: '#5b3a1e', // dark wood
    c: '#7c4ff0', // deep violet
    y: '#9d8cff', // soft indigo
    A: '#fde68a', // light amber (highlight)
    O: '#141024', // stone black
};

// ---------------- MASCOT (24 x 30) ----------------
const SPRITE_MASCOT = [
    '.......oooooooo.....',
    '.....ooHHHHHHHHoo...',
    '....oHhhhhhhhhhhHo..',
    '...oHhhhhhhhhhhhhHo.',
    '...oHhhhsssssshhhHo.',
    '..oHhhhhsssssssshHo.',
    '..oHhhhhhsesseshhHo.',
    '..oHhhhhhsesseshhHo.',
    '..oHhhhHhsSmmSsHhHo.',
    '...oHhhHhssssssHhHo.',
    '...oHhHHhhsssshhHHo.',
    '....ooHHhhhhhhhHho..',
    '.....ooHHhhhhhHho...',
    '...ookkkKooooKkkkoo.',
    '..okkkkkKkkkkkKkkkko',
    '.okKkkkkkkkgkkkkkkko',
    '.okkkKKKKKKKKKKKKkko',
    '.okkKgggggggggggKkko',
    '.okkKKKKKKKKKKKKKkko',
    '.okkkkkkkkkkkkkkkkoo',
    '..okkkkkkkkkkkkkkoo.',
    '...ooppppppppppoo...',
    '....okppp.o.pppko...',
    '....okppp.o.pppko...',
    '....okppp.o.pppko...',
    '....okppp.o.pppko...',
    '....odddd.o.ddddo...',
    '...oddddd.o.dddddo..',
    '...o.dddd..o.ddddo..',
    '...o.......o......o.',
];

// ---------------- 16x16 ICONS ----------------

const SPRITE_MUSIC = [
    '.......oooooo...',
    '.......oaaaao...',
    '.......oaaaooo..',
    '.......oaa..oo..',
    '.......oaaaaao..',
    '.......oaa......',
    '.......oaa......',
    '.......oaa......',
    '....ooooaaoooo..',
    '...oaaaaaaaaro..',
    '...oaaaaaaaroo..',
    '....ooooooo.....',
    '................',
    '..o.........o...',
    '.oGo.......oGo..',
    '..o.........o...',
];

const SPRITE_DUMBBELL = [
    '................',
    '................',
    '..oo........oo..',
    '.oKKo......oKKo.',
    '.oKco......ocKo.',
    'oKccoo....ookcco',
    'oKcccKooooKcccKo',
    'oKcccKaaaaKcccKo',
    'ookcoKaaaaKocoo.',
    '..oo.oaaaao..oo.',
    '.....oaaaao.....',
    '..oo.o....o.oo..',
    '.oKKoo....ooKKo.',
    '.oKco......ocKo.',
    '..oo........oo..',
    '................',
];

const SPRITE_PHONE = [
    '....oooooooo....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '..ohwwwwwwwwho..',
    '..ohweeweeweho..',
    '..ohwwwwwwwwho..',
    '..ohweeweeweho..',
    '..ohwwwwwwwwho..',
    '..ohweeweeweho..',
    '..ohwwwwwwwwho..',
    '..ohhhhhhhhhho..',
    '..ohheeeehhhho..',
    '...ohhhhhhhho...',
    '....oooooooo....',
    '................',
    '................',
];

const SPRITE_CALENDAR = [
    '...o........o...',
    '...o........o...',
    '.oooooooooooooo.',
    'oaAAAAAAAAAAAAAo',
    'oAAAAAAAAAAAAAAo',
    'oooooooooooooooo',
    'owwoowwoowwoowwo',
    'owwoowwoowwoowwo',
    'owwoorrwoowwoowo',
    'oooooooooooooooo',
    'owwoowwoowwoowwo',
    'owwoowwoowwoorwo',
    'oooooooooooooooo',
    'owwoowwoowwoowwo',
    'oooooooooooooooo',
    '................',
];

const SPRITE_TERMINAL = [
    '................',
    '.oooooooooooooo.',
    '.owwwwwwwwwwwwo.',
    '.oooooooooooooo.',
    '.okkkkkkkkkkkko.',
    '.okGGGGkkkkkkko.',
    '.okkkkkkkkkkkko.',
    '.okGgkkkkkkkkko.',
    '.okkkGkkkkkkkko.',
    '.okkkkGkkkkkkko.',
    '.okkkkkkkkGGkko.',
    '.okkkkkkkkkGkko.',
    '.okkkkkkkkkkoko.',
    '.oooooooooooooo.',
    '................',
    '................',
];

const SPRITE_STAR = [
    '................',
    '.......aa.......',
    '.......aa.......',
    '......oAAo......',
    '....aaaaaaaa....',
    '..aaaaaaaaaaa...',
    '.aaaaaaaaaaaaa..',
    '..aaaaaaaaaaa...',
    '...aaaaaaaa.....',
    '....aa...aa.....',
    '...aa.....aa....',
    '..oo.......oo...',
    '................',
    '................',
    '................',
    '................',
];

const SPRITE_HEART = [
    '................',
    '...ooo....ooo...',
    '..orrrrooerrro..',
    '.orwwrrrrrrrro..',
    '.orwwrrrrrrrro..',
    '.orrrrrrrrrrro..',
    '.orrrrrrrrrrro..',
    '..orrrrrrrrro...',
    '...orrrrrrro....',
    '....orrrrro.....',
    '.....orro.......',
    '......oo........',
    '................',
    '................',
    '................',
    '................',
];

const SPRITE_BRAIN = [
    '................',
    '...oooooooo.....',
    '..ohhhhhrro.....',
    '.ohhrrhhrhho....',
    '.ohhrhhhrhho....',
    '.ohhhhrhhrho....',
    '.ohrhhrhhrho....',
    '.ohhrrhhrrho....',
    '..ohhrhhrro.....',
    '...ooooooo......',
    '.....o.o........',
    '................',
    '................',
    '................',
    '................',
    '................',
];

const SPRITE_GLOBE = [
    '.....ooooo......',
    '...ooHHHHoo.....',
    '..oHHooHHHo.....',
    '.oHHoGHoHHHo....',
    '.oHoGGGGGoho....',
    'oHoGGHHGoGho....',
    'oHoGGGGGGGho....',
    'oHHGGHHGGGHH....',
    'oHHGGGGGGGHH....',
    'oHHGGGHHGGHH....',
    '.oHGGGGGGGHO....',
    '.oHHGGGGGHHo....',
    '..oHHGGGHHo.....',
    '...ooHHHHoo.....',
    '.....oooo.......',
    '................',
];

const SPRITE_BOX = [
    '................',
    '..oooooooooooo..',
    '..onnnnnnnnno...',
    '..onbbbbbbo.....',
    '..onbbbbbbo.....',
    '..onbbbbbbo.....',
    '..oooooooooo....',
    '..obbo..obbo....',
    '..obbo..obbo....',
    '..obbo..obbo....',
    '..obbo..obbo....',
    '..obbbbbbbbo....',
    '..obbbbbbbbo....',
    '..oooooooooo....',
    '................',
    '................',
];

const SPRITE_ROCKET = [
    '.......oo.......',
    '......owwo......',
    '......owwo......',
    '.....owwwwo.....',
    '.....ohhho......',
    '....ohhhhho.....',
    '...oorhhhooo....',
    '..ohorhhhooho...',
    '.ohhoohhooohho..',
    '.ooh.oowwo.oo...',
    '...o.owwwo.o....',
    '....oaarao......',
    '....oarrra......',
    '.....arra.......',
    '......aa........',
    '................',
];

const SPRITE_MIC = [
    '......oooo......',
    '.....ohhhho.....',
    '.....ohhhho.....',
    '.....ohhhho.....',
    '.....ohhhho.....',
    '.....ohhhho.....',
    '....oohhhhoo....',
    '....ohwwhho.....',
    '..ooohwwhooo....',
    '..ohoowwhooo....',
    '..ohoowwoooo....',
    '..oo.oGGGo.oo...',
    '.....oGGGo......',
    '......ooo.......',
    '....ooooooo.....',
    '................',
];

const SPRITE_PUZZLE = [
    '....oooo........',
    '...ohhhho.......',
    '...ohhhho.......',
    '..ooooooooo.....',
    '.ohhhhhhhhho....',
    '.ohhooooohho....',
    'ooohowwhooho....',
    'oho.oowo.oho....',
    'oho.oowo.oho....',
    'ooohowwhooho....',
    '.ohhhoooooho....',
    '.ohhhhhhhho.....',
    '..ooooooooo.....',
    '...ohhhho.......',
    '...ohhhho.......',
    '....oooo........',
];

const SPRITE_CODE = [
    '................',
    '...oo......oo...',
    '..oggo....oggo..',
    '.ogggo....ggo...',
    '.oggg.....ggo...',
    '..oggg...gggo...',
    '...ogggggggg....',
    '....oggggggo....',
    '...ogggggggg....',
    '..oggg...gggo...',
    '.oggg.....ggo...',
    '.ogggo....ggo...',
    '..oggo....oggo..',
    '...oo......oo...',
    '................',
    '................',
];

const SPRITE_LAYERS = [
    '................',
    '.......oo.......',
    '......ohho......',
    '.....ohhhho.....',
    '....ohhhhhho....',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '.oooooooooooooo.',
    '...ohhhhhhhho...',
    '..ohhhhhhhhhho..',
    '.ohhhhhhhhhhhho.',
    'oooooooooooooooo',
    '..ohhhhhhhhhho..',
    '.ohhhhhhhhhhhho.',
    'oooooooooooooooo',
    '................',
];

const SPRITE_BOT = [
    '................',
    '...o........o...',
    '...og......go...',
    '...oggggggggo...',
    '..ohhhhhhhhho...',
    '..ohhoowwohho...',
    '..ohhoowwohho...',
    '..ohhhhhhhhho...',
    '..ohGGGGGGGho...',
    '..ohhhhhhhhho...',
    '..oooooooooo....',
    '...ohhhhhho.....',
    '...ohhhhhho.....',
    '...oo....oo.....',
    '................',
    '................',
];

const SPRITE_GO = [
    '................',
    '.bbbbbbbbbbbbbb.',
    '.b.o.o.o.o.o.bb.',
    '.bbbbbbbbbbbbb..',
    '.b.o.o.Oo.o.o.b.',
    '.b...OOOo...o.b.',
    '.b..OOOwwo..o.b.',
    '.b.o.Owwo.o.o.b.',
    '.bbbbbbbbbbbbb..',
    '.b.o.o.ww.o.o.b.',
    '.b..o.www.o.o.b.',
    '.b.o.o.wo.o.o.b.',
    '.bbbbbbbbbbbbb..',
    '.bbbbbbbbbbbbbb.',
    '................',
    '................',
];

const SPRITES = {
    mascot: SPRITE_MASCOT,
    music: SPRITE_MUSIC,
    dumbbell: SPRITE_DUMBBELL,
    phone: SPRITE_PHONE,
    calendar: SPRITE_CALENDAR,
    terminal: SPRITE_TERMINAL,
    star: SPRITE_STAR,
    heart: SPRITE_HEART,
    brain: SPRITE_BRAIN,
    globe: SPRITE_GLOBE,
    box: SPRITE_BOX,
    rocket: SPRITE_ROCKET,
    mic: SPRITE_MIC,
    puzzle: SPRITE_PUZZLE,
    code: SPRITE_CODE,
    layers: SPRITE_LAYERS,
    bot: SPRITE_BOT,
    go: SPRITE_GO,
};

// ---------------- renderer ----------------

function renderSprite(canvas, map, scale) {
    const h = map.length;
    const w = map[0].length;
    canvas.width = w * scale;
    canvas.height = h * scale;
    canvas.style.width = w * scale + 'px';
    canvas.style.height = h * scale + 'px';
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < h; y++) {
        const row = map[y];
        if (row.length !== w) {
            console.warn(`sprite row ${y} has ${row.length} chars, expected ${w}`);
        }
        for (let x = 0; x < row.length; x++) {
            const ch = row[x];
            if (ch === '.' || ch === ' ') continue;
            const color = PAL[ch];
            if (!color) { console.warn(`unknown pixel char "${ch}" at ${x},${y}`); continue; }
            ctx.fillStyle = color;
            ctx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
}

// Mount every <span data-sprite="name"> with its canvas
function mountSprites() {
    document.querySelectorAll('[data-sprite]').forEach(el => {
        const name = el.getAttribute('data-sprite');
        const map = SPRITES[name];
        if (!map) { console.warn('no sprite named', name); return; }
        const canvas = document.createElement('canvas');
        const box = el.getBoundingClientRect();
        const target = Math.max(box.width, 16) || 32;
        const scale = Math.max(1, Math.floor(target / map[0].length));
        renderSprite(canvas, map, scale);
        el.appendChild(canvas);
    });
}

// Mascot + generated favicon
function mountMascot() {
    const canvas = document.getElementById('mascotCanvas');
    if (canvas) {
        renderSprite(canvas, SPRITE_MASCOT, 10);
        canvas.style.width = '240px';
        canvas.style.height = '300px';
    }
    // favicon from the star sprite
    const fav = document.createElement('canvas');
    renderSprite(fav, SPRITE_STAR, 2);
    const link = document.querySelector('link[rel="icon"]');
    if (link) link.href = fav.toDataURL('image/png');
}

document.addEventListener('DOMContentLoaded', () => {
    mountMascot();
    mountSprites();
});
