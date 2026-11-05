import './styles.css';

const TARGET = 'THE EDUCATION VALLEY';
const CONNECTION_START = new Date('2025-04-06T00:00:00+05:00');
const imageAssets = {
  background: '/assets/education-valley-bg.webp',
  cats: '/assets/cutie-cat-sticker.webp',
  graffiti: '/assets/campus-graffiti.webp',
};
document.documentElement.style.setProperty('--scrapbook-bg', `url(${imageAssets.background})`);

const gate = document.querySelector('#gate');
const story = document.querySelector('#story');
const phraseValue = document.querySelector('#phrase-value');
const keyboard = document.querySelector('#keyboard');
const errorMessage = document.querySelector('#error-message');
const lockStatus = document.querySelector('#lock-status');
const audio = document.querySelector('#lofi-audio');
const soundBtn = document.querySelector('#sound-btn');
const soundLabel = document.querySelector('#sound-label');
let phrase = '';
let isPlaying = false;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const keys = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'SPACE', '⌫', 'ENTER'];
keys.forEach((key) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `key ${key === 'SPACE' ? 'space' : ''} ${key === 'ENTER' ? 'enter' : ''} ${key === '⌫' ? 'wide' : ''}`;
  button.textContent = key === 'SPACE' ? 'space' : key;
  button.setAttribute('aria-label', key === '⌫' ? 'Delete last character' : key === 'ENTER' ? 'Unlock phrase' : key === 'SPACE' ? 'Space' : key);
  button.addEventListener('click', () => handleKey(key));
  keyboard.append(button);
});

function handleKey(key) {
  startMusicOnGesture();
  if (key === 'ENTER') return attemptUnlock();
  if (key === '⌫') phrase = phrase.slice(0, -1);
  else if (key === 'SPACE' && phrase.length && !phrase.endsWith(' ')) phrase += ' ';
  else if (/^[A-Z]$/.test(key) && phrase.length < TARGET.length) phrase += key;
  updatePhrase();
}

function updatePhrase() {
  phraseValue.textContent = phrase || 'T__ E___U_______N V_L__Y';
  phraseValue.classList.toggle('is-placeholder', !phrase);
  errorMessage.textContent = '';
  lockStatus.innerHTML = '<span class="lock-icon">⌑</span> locked';
}

function attemptUnlock() {
  const normalized = phrase.trim().replace(/\s+/g, ' ').toUpperCase();
  if (normalized === TARGET) {
    unlock();
    return;
  }
  lockStatus.innerHTML = '<span class="lock-icon">!</span> try again';
  errorMessage.textContent = 'Almost, Cutie. The little valley is waiting for the right letters.';
  if (!reduceMotion) document.querySelector('.phrase-board').animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'translateX(0)' }], { duration: 260 });
}

function unlock() {
  lockStatus.innerHTML = '<span class="lock-icon">♡</span> unlocked';
  lockStatus.style.background = '#ffe0e7';
  lockStatus.style.color = '#c85c72';
  if (reduceMotion) gate.style.opacity = '0';
  else gate.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(1.04)' }], { duration: 700, easing: 'ease-in-out' });
  setTimeout(() => {
    gate.classList.add('is-hidden');
    story.classList.remove('is-hidden');
    story.scrollIntoView({ behavior: 'instant', block: 'start' });
    revealSections();
    story.querySelector('.hero-copy h2')?.focus({ preventScroll: true });
    startMusicOnGesture();
  }, reduceMotion ? 0 : 620);
}

document.querySelector('#unlock-btn').addEventListener('click', () => { startMusicOnGesture(); attemptUnlock(); });
document.querySelector('#clear-btn').addEventListener('click', () => { phrase = ''; updatePhrase(); });
document.addEventListener('keydown', (event) => {
  if (gate.classList.contains('is-hidden')) return;
  if (event.key === 'Enter') return attemptUnlock();
  if (event.key === 'Backspace') { phrase = phrase.slice(0, -1); updatePhrase(); return; }
  if (event.key === ' ') { event.preventDefault(); handleKey('SPACE'); return; }
  const key = event.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) handleKey(key);
});

async function startMusicOnGesture() {
  if (!audio || isPlaying) return;
  try {
    await audio.play();
    isPlaying = true;
    soundBtn.classList.add('is-playing');
    soundBtn.setAttribute('aria-pressed', 'true');
    soundLabel.textContent = 'our little soundtrack is on';
  } catch {
    soundLabel.textContent = 'tap to play our soundtrack';
  }
}

soundBtn.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); isPlaying = true; } catch { return; }
  } else { audio.pause(); isPlaying = false; }
  soundBtn.classList.toggle('is-playing', isPlaying);
  soundBtn.setAttribute('aria-pressed', String(isPlaying));
  soundLabel.textContent = isPlaying ? 'our little soundtrack is on' : 'play our little soundtrack';
});

audio.addEventListener('error', () => { soundLabel.textContent = 'soundtrack loading soon'; });

function diffCalendar(start, end) {
  let cursor = new Date(start);
  let years = 0; let months = 0;
  const addUtcYears = (date, amount) => new Date(Date.UTC(date.getUTCFullYear() + amount, date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
  const addUtcMonths = (date, amount) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));
  while (addUtcYears(cursor, 1) <= end) {
    cursor = addUtcYears(cursor, 1); years += 1;
  }
  while (addUtcMonths(cursor, 1) <= end) {
    cursor = addUtcMonths(cursor, 1); months += 1;
  }
  const remainder = Math.max(0, end.getTime() - cursor.getTime());
  const days = Math.floor(remainder / 86400000);
  const hours = Math.floor((remainder % 86400000) / 3600000);
  const minutes = Math.floor((remainder % 3600000) / 60000);
  const seconds = Math.floor((remainder % 60000) / 1000);
  return { years, months, days, hours, minutes, seconds };
}

function updateTimer() {
  const parts = diffCalendar(CONNECTION_START, new Date());
  Object.entries(parts).forEach(([key, value]) => {
    const node = document.querySelector(`#${key}`);
    if (node) node.textContent = String(value).padStart(2, '0');
  });
}
updateTimer();
setInterval(updateTimer, 1000);

function revealSections() {
  const items = document.querySelectorAll('.reveal-section');
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (reduceMotion) entry.target.style.opacity = '1';
        else entry.target.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

document.querySelector('#forever-btn').addEventListener('click', () => {
  const response = document.querySelector('#final-response');
  response.textContent = 'Then it is settled — same team, forever & always. ♡';
  document.querySelector('#forever-btn').innerHTML = 'our little forever is saved <span>♥</span>';
  if (reduceMotion) return;
  for (let i = 0; i < 14; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = i % 2 ? '♡' : '✦';
    heart.className = 'floating-heart';
    heart.style.left = `${35 + Math.random() * 30}%`;
    heart.style.animationDelay = `${Math.random() * .5}s`;
    document.querySelector('.final-card').append(heart);
    setTimeout(() => heart.remove(), 2200);
  }
});

document.querySelector('#again-btn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  setTimeout(() => { story.classList.add('is-hidden'); gate.classList.remove('is-hidden'); gate.style.opacity = '1'; phrase = ''; updatePhrase(); document.querySelector('#gate-title')?.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; });

const floatingStyle = document.createElement('style');
floatingStyle.textContent = '.floating-heart{position:absolute;bottom:20px;color:#ff7892;font:24px Kalam,cursive;animation:float-away 2.2s ease-out forwards;pointer-events:none;z-index:3}@keyframes float-away{to{transform:translateY(-180px) rotate(22deg);opacity:0}}';
document.head.append(floatingStyle);

updatePhrase();
