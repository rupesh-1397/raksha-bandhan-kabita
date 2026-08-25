// ============ PETALS ============
(function petals(){
  const wrap = document.getElementById('petals');
  const count = window.innerWidth < 500 ? 14 : 22;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (9 + Math.random()*10) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.opacity = 0.3 + Math.random()*0.4;
    p.style.background = Math.random() > 0.5 ? 'var(--rose)' : 'var(--gold-soft)';
    wrap.appendChild(p);
  }
})();

// ============ SCREEN NAV ============
const cover = document.getElementById('cover');
const discovery = document.getElementById('discovery');
const locker = document.getElementById('locker');
const rakhi = document.getElementById('rakhi');
const finalScreen = document.getElementById('final');

document.getElementById('btnEnter').addEventListener('click', () => {
  cover.classList.add('hidden');
  discovery.classList.remove('hidden');
  window.scrollTo({top:0, behavior:'instant'});
});

// ============ MODAL CONTENT ============
const CONTENT = {
  report: {
    title: 'Official Case File',
    html: `
      <p class="stamp-mark">SIBLING INVESTIGATION UNIT</p>
      <h3>Subject: Kabita Shah, a.k.a. "Bro"</h3>
      <p><strong>Status:</strong> Repeat offender. No remorse shown.</p>
      <ul>
        <li><strong>Remote Control Larceny</strong> &mdash; Subject has, on multiple occasions, seized the TV remote and refused to relinquish it under any negotiation. Case remains open since childhood.</li>
        <li><strong>Chronic Mess Generation</strong> &mdash; Subject creates disorder at scale, then exits the scene. Cleanup consistently performed by the undersigned (me).</li>
        <li><strong>Confidentiality Breach, Repeated</strong> &mdash; Subject is constitutionally incapable of keeping a secret longer than 24 hours. Multiple informants confirm.</li>
        <li><strong>Excessive Browsing Behaviour</strong> &mdash; Subject has been found, at all hours, scrolling clothing sites with no purchase intent whatsoever. Just looking, apparently. For three hours.</li>
        <li><strong>Unauthorized Protection Detail</strong> &mdash; Subject has repeatedly and without being asked, stepped in to shield the undersigned from trouble, including from Mama's temper. This charge could not, in good conscience, be held against her.</li>
      </ul>
      <p><strong>Verdict:</strong> Guilty on all counts. Sentence: one lifetime of being called "Bro" and being loved anyway.</p>
    `
  },
  letter: {
    title: 'The Letter',
    html: `
      <p>Some things are easier to write than to say out loud, so here it is.</p>
      <p>I've known you since I was about three years old, living under the same roof, which basically makes you my sister &mdash; not "practically," not "like a sister," just my sister, full stop. Cousin was never the right word for us.</p>
      <p>You fought me for the remote and lost gracefully, made messes I quietly cleaned without ever really minding, and told my secrets to at least two people before I'd even finished telling them to you. And somehow none of that ever mattered, because the moment things got hard &mdash; especially with Mama &mdash; you were the one standing in front of me, not behind.</p>
      <p>I don't say this enough, so consider this the one time it's in writing: thank you for being the kind of sister who shows up. I see it. I've always seen it.</p>
    `
  },
  mystery: {
    title: 'The Mystery',
    html: `
      <p>You found something I wasn't planning to explain yet...</p>
      <p>There's a locked drawer in this case &mdash; a few photographs, a thread that hasn't been tied yet, and a message I've been putting off for years. All three are somewhere on this page, waiting.</p>
      <p>Finish opening the files. The rest will find you.</p>
    `
  }
};

const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('modalOverlay');
const modalInner = document.getElementById('modalInner');
const modalClose = document.getElementById('modalClose');
const progressFill = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const lockerHint = document.getElementById('lockerHint');

let openedCount = 0;
const opened = new Set();

function openModal(key){
  const data = CONTENT[key];
  modalInner.innerHTML = `<h3>${data.title}</h3>${data.html}`;
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function closeModal(){
  overlay.classList.remove('show');
  setTimeout(() => overlay.classList.add('hidden'), 300);
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.card;
    openModal(key);
    if(!opened.has(key)){
      opened.add(key);
      card.classList.add('opened');
      openedCount++;
      progressFill.style.width = (openedCount/3*100) + '%';
      progressLabel.textContent = `${openedCount} / 3 files opened`;
      if(openedCount === 3){
        lockerHint.classList.add('show');
        setTimeout(() => {
          locker.classList.remove('hidden');
        }, 700);
      }
    }
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });

// reveal rakhi + final sections once locker is visible (simple scroll-linked flow)
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      if(entry.target.id === 'locker'){
        rakhi.classList.remove('hidden');
      }
    }
  });
}, {threshold:0.4});
revealObserver.observe(locker);

// Always allow scrolling to final after rakhi tied (handled below)

// ============ RAKHI TIE ============
const rakhiBtn = document.getElementById('rakhiBtn');
const rakhiMessage = document.getElementById('rakhiMessage');
let tied = false;

rakhiBtn.addEventListener('click', () => {
  if(tied) return;
  tied = true;
  rakhiBtn.classList.add('tied');
  rakhiMessage.classList.remove('hidden');
  requestAnimationFrame(() => rakhiMessage.classList.add('reveal'));
  fireConfetti();
  setTimeout(() => finalScreen.classList.remove('hidden'), 900);
});

// ============ SECRET REVEAL ============
const secretBtn = document.getElementById('secretBtn');
const secretReveal = document.getElementById('secretReveal');
secretBtn.addEventListener('click', () => {
  secretReveal.classList.remove('hidden');
  requestAnimationFrame(() => secretReveal.classList.add('reveal'));
  secretBtn.style.display = 'none';
});

// ============ CONFETTI ============
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
function resizeCanvas(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function fireConfetti(){
  const colors = ['#5E1A26', '#C6A15B', '#C98A93', '#F6EFE4'];
  const pieces = Array.from({length: 90}, () => ({
    x: canvas.width/2 + (Math.random()-0.5)*80,
    y: canvas.height*0.35,
    vx: (Math.random()-0.5)*8,
    vy: -Math.random()*10 - 4,
    size: 4 + Math.random()*4,
    color: colors[Math.floor(Math.random()*colors.length)],
    rot: Math.random()*360,
    vr: (Math.random()-0.5)*10,
    gravity: 0.25 + Math.random()*0.15
  }));

  let frame = 0;
  function tick(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let alive = false;
    pieces.forEach(p => {
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if(p.y < canvas.height + 20) alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
    });
    frame++;
    if(alive && frame < 240){
      requestAnimationFrame(tick);
    } else {
      ctx.clearRect(0,0,canvas.width, canvas.height);
    }
  }
  tick();
}
