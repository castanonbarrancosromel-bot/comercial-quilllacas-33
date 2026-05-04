/* ===== SCRIPT.JS - ANTI-GRAVITY ===== */

// ---- PARTICLE CANVAS ----
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticle() {
  const colors = ['rgba(212,160,23,', 'rgba(0,200,255,', 'rgba(255,255,255,'];
  const c = colors[Math.floor(Math.random() * colors.length)];
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    r: Math.random() * 2.5 + 0.5,
    speed: Math.random() * 0.8 + 0.2,
    opacity: Math.random() * 0.5 + 0.1,
    drift: (Math.random() - 0.5) * 0.4,
    color: c
  };
}

for (let i = 0; i < 120; i++) {
  const p = createParticle();
  p.y = Math.random() * canvas.height;
  particles.push(p);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.y -= p.speed;
    p.x += p.drift;
    p.opacity -= 0.0005;
    if (p.y < -10 || p.opacity <= 0) particles[i] = createParticle();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + p.opacity + ')';
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- CURSOR GLOW ----
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
  // Logo parallax
  const logo = document.getElementById('heroLogo');
  if (logo) {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    logo.style.transform = `translate(${x}px, ${y}px)`;
  }
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ---- LOGO PATHS ----
const BASE = 'C:/Users/ANTHONY/.gemini/antigravity/brain/f07cafad-d90a-4df8-97e1-5ab6eb36f447/';
const logos = {
  'TOYO':           BASE+'logo_toyo_1777866387001.png',
  'BOSCH':          BASE+'logo_bosch_1777866400218.png',
  'MOURA':          BASE+'logo_moura_1777866413069.png',
  'HELIAR':         BASE+'logo_heliar_1777866428184.png',
  'ACDELCO':        BASE+'logo_acdelco_1777866442396.png',
  'OPTIMA':         BASE+'logo_optima_1777866455182.png',
  'VARTA':          BASE+'logo_varta_1777866503121.png',
  'YUASA':          BASE+'logo_yuasa_1777866518446.png',
  'VICTRON ENERGY': BASE+'logo_victron_1777866537573.png',
  'CATL':           BASE+'logo_catl_1777866550639.png',
  'ODYSSEY':        BASE+'logo_odyssey_1777866565054.png',
};

// Brand accent colors for CSS badge fallback
const brandColors = {
  'TOYO':'#e53935','BOSCH':'#1565c0','MOURA':'#0288d1','HELIAR':'#f59e0b',
  'ACDELCO':'#c62828','OPTIMA':'#b71c1c','VARTA':'#37474f','YUASA':'#d32f2f',
  'VICTRON ENERGY':'#0277bd','CATL':'#1976d2','ODYSSEY':'#1a237e',
  'ENERGETIC':'#e65100','CRAL':'#2e7d32','REIFOR':'#4a148c','LENTO':'#006064',
  'TORA':'#bf360c','MAGNETI MARELLI':'#c0392b','EXCELL':'#1b5e20',
  'MAXION':'#880e4f','CAPSA':'#e53935','WILLARD':'#37474f',
  'VISION':'#388e3c','BAE':'#1565c0','DEKA SOLAR':'#f57f17','EXIDE':'#b71c1c',
  'ENERSYS':'#1a237e','HOLY SUN':'#ff8f00','RITAR':'#00695c','NARADA':'#4e342e',
  'MAC':'#455a64','MANLY':'#2e7d32','INTERSTATE':'#1565c0','QUANTUM':'#6a1b9a',
  'YLB':'#1b5e20','BYD':'#1565c0','SAMSUNG SDI':'#0d47a1',
};

// ---- FULL CATALOG WITH MODELS ----
const catalog = {
  liquidas: [
    { name:'TOYO', origin:'Japón 🇯🇵', color:'#e53935',
      models:[
        {model:'65D23R',  v:'12V', ah:'55Ah',  cca:'430'},
        {model:'75D23R',  v:'12V', ah:'60Ah',  cca:'490'},
        {model:'80D26R',  v:'12V', ah:'65Ah',  cca:'540'},
        {model:'95D26R',  v:'12V', ah:'70Ah',  cca:'580'},
        {model:'105D31R', v:'12V', ah:'80Ah',  cca:'640'},
        {model:'115D31R', v:'12V', ah:'80Ah',  cca:'680'},
        {model:'130D31R', v:'12V', ah:'90Ah',  cca:'750'},
        {model:'145G51',  v:'12V', ah:'100Ah', cca:'820'},
      ]},
    { name:'MOURA', origin:'Brasil 🇧🇷', color:'#0288d1',
      models:[
        {model:'M40GD',  v:'12V', ah:'40Ah',  cca:'300'},
        {model:'M50GD',  v:'12V', ah:'50Ah',  cca:'380'},
        {model:'M60GD',  v:'12V', ah:'60Ah',  cca:'450'},
        {model:'M70GD',  v:'12V', ah:'70Ah',  cca:'520'},
        {model:'M75GD',  v:'12V', ah:'75Ah',  cca:'570'},
        {model:'M100GD', v:'12V', ah:'100Ah', cca:'700'},
        {model:'M150GD', v:'12V', ah:'150Ah', cca:'900'},
      ]},
    { name:'HELIAR', origin:'Brasil 🇧🇷', color:'#f59e0b',
      models:[
        {model:'HF40',  v:'12V', ah:'40Ah',  cca:'300'},
        {model:'HF50',  v:'12V', ah:'50Ah',  cca:'380'},
        {model:'HF60',  v:'12V', ah:'60Ah',  cca:'460'},
        {model:'HF70',  v:'12V', ah:'70Ah',  cca:'530'},
        {model:'HF90',  v:'12V', ah:'90Ah',  cca:'650'},
        {model:'HF100', v:'12V', ah:'100Ah', cca:'720'},
      ]},
    { name:'BOSCH', origin:'Alemania 🇩🇪', color:'#1565c0',
      models:[
        {model:'S3 40Ah',  v:'12V', ah:'40Ah',  cca:'330'},
        {model:'S3 50Ah',  v:'12V', ah:'50Ah',  cca:'400'},
        {model:'S4 60Ah',  v:'12V', ah:'60Ah',  cca:'480'},
        {model:'S4 70Ah',  v:'12V', ah:'70Ah',  cca:'540'},
        {model:'S5 80Ah',  v:'12V', ah:'80Ah',  cca:'620'},
        {model:'S5 100Ah', v:'12V', ah:'100Ah', cca:'720'},
        {model:'S6 105Ah', v:'12V', ah:'105Ah', cca:'800'},
      ]},
    { name:'ACDELCO', origin:'USA 🇺🇸', color:'#c62828',
      models:[
        {model:'S40L',  v:'12V', ah:'40Ah',  cca:'310'},
        {model:'S50L',  v:'12V', ah:'50Ah',  cca:'390'},
        {model:'S60L',  v:'12V', ah:'60Ah',  cca:'470'},
        {model:'S70L',  v:'12V', ah:'70Ah',  cca:'550'},
        {model:'S80L',  v:'12V', ah:'80Ah',  cca:'630'},
        {model:'S100L', v:'12V', ah:'100Ah', cca:'750'},
      ]},
    { name:'ENERGETIC', origin:'Internacional', color:'#e65100',
      models:[
        {model:'E40',  v:'12V', ah:'40Ah',  cca:'300'},
        {model:'E50',  v:'12V', ah:'50Ah',  cca:'380'},
        {model:'E60',  v:'12V', ah:'60Ah',  cca:'450'},
        {model:'E75',  v:'12V', ah:'75Ah',  cca:'560'},
        {model:'E100', v:'12V', ah:'100Ah', cca:'700'},
      ]},
    { name:'MAGNETI MARELLI', origin:'Italia 🇮🇹', color:'#c0392b',
      models:[
        {model:'MM40', v:'12V', ah:'40Ah',  cca:'330'},
        {model:'MM60', v:'12V', ah:'60Ah',  cca:'480'},
        {model:'MM70', v:'12V', ah:'70Ah',  cca:'560'},
        {model:'MM80', v:'12V', ah:'80Ah',  cca:'640'},
      ]},
    { name:'CRAL',    origin:'Bolivia 🇧🇴', color:'#2e7d32',
      models:[
        {model:'CR40', v:'12V', ah:'40Ah', cca:'280'},
        {model:'CR50', v:'12V', ah:'50Ah', cca:'360'},
        {model:'CR60', v:'12V', ah:'60Ah', cca:'440'},
      ]},
    { name:'REIFOR',  origin:'Bolivia 🇧🇴', color:'#4a148c',
      models:[
        {model:'RF40', v:'12V', ah:'40Ah', cca:'290'},
        {model:'RF55', v:'12V', ah:'55Ah', cca:'400'},
        {model:'RF70', v:'12V', ah:'70Ah', cca:'510'},
      ]},
    { name:'LENTO',   origin:'Bolivia 🇧🇴', color:'#006064',
      models:[
        {model:'LT40', v:'12V', ah:'40Ah', cca:'280'},
        {model:'LT50', v:'12V', ah:'50Ah', cca:'360'},
        {model:'LT60', v:'12V', ah:'60Ah', cca:'430'},
      ]},
    { name:'TORA',    origin:'Bolivia 🇧🇴', color:'#bf360c',
      models:[
        {model:'TR50',  v:'12V', ah:'50Ah',  cca:'360'},
        {model:'TR70',  v:'12V', ah:'70Ah',  cca:'510'},
        {model:'TR100', v:'12V', ah:'100Ah', cca:'680'},
      ]},
    { name:'EXCELL',  origin:'Internacional', color:'#1b5e20',
      models:[
        {model:'EX45', v:'12V', ah:'45Ah', cca:'320'},
        {model:'EX60', v:'12V', ah:'60Ah', cca:'440'},
        {model:'EX75', v:'12V', ah:'75Ah', cca:'560'},
      ]},
    { name:'MAXION',  origin:'Internacional', color:'#880e4f',
      models:[
        {model:'MX50',  v:'12V', ah:'50Ah',  cca:'370'},
        {model:'MX70',  v:'12V', ah:'70Ah',  cca:'520'},
        {model:'MX100', v:'12V', ah:'100Ah', cca:'700'},
      ]},
    { name:'CAPSA',   origin:'España 🇪🇸', color:'#e53935',
      models:[
        {model:'CP45', v:'12V', ah:'45Ah', cca:'330'},
        {model:'CP60', v:'12V', ah:'60Ah', cca:'460'},
        {model:'CP80', v:'12V', ah:'80Ah', cca:'600'},
      ]},
    { name:'WILLARD', origin:'Internacional', color:'#37474f',
      models:[
        {model:'WL50',  v:'12V', ah:'50Ah',  cca:'370'},
        {model:'WL65',  v:'12V', ah:'65Ah',  cca:'490'},
        {model:'WL80',  v:'12V', ah:'80Ah',  cca:'610'},
        {model:'WL100', v:'12V', ah:'100Ah', cca:'730'},
      ]},
  ],
  gel: [
    { name:'VISION', origin:'China 🇨🇳', color:'#388e3c',
      models:[
        {model:'6FM33',  v:'12V', ah:'33Ah',  cca:'—'},
        {model:'6FM55',  v:'12V', ah:'55Ah',  cca:'—'},
        {model:'6FM100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'6FM150', v:'12V', ah:'150Ah', cca:'—'},
        {model:'6FM200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'YUASA', origin:'Japón 🇯🇵', color:'#d32f2f',
      models:[
        {model:'NPH50-12',  v:'12V', ah:'50Ah',  cca:'—'},
        {model:'NPL100-12', v:'12V', ah:'100Ah', cca:'—'},
        {model:'NPL150-12', v:'12V', ah:'150Ah', cca:'—'},
        {model:'NPL200-12', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'EXIDE', origin:'USA 🇺🇸', color:'#b71c1c',
      models:[
        {model:'GEL50',  v:'12V', ah:'50Ah',  cca:'—'},
        {model:'GEL80',  v:'12V', ah:'80Ah',  cca:'—'},
        {model:'GEL100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'GEL200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'VICTRON ENERGY', origin:'Holanda 🌍', color:'#0277bd',
      models:[
        {model:'GEL 60Ah',  v:'12V', ah:'60Ah',  cca:'—'},
        {model:'GEL 90Ah',  v:'12V', ah:'90Ah',  cca:'—'},
        {model:'GEL 110Ah', v:'12V', ah:'110Ah', cca:'—'},
        {model:'GEL 200Ah', v:'12V', ah:'200Ah', cca:'—'},
        {model:'GEL 220Ah', v:'12V', ah:'220Ah', cca:'—'},
      ]},
    { name:'ENERSYS', origin:'USA 🇺🇸', color:'#1a237e',
      models:[
        {model:'NP65-12',  v:'12V', ah:'65Ah',  cca:'—'},
        {model:'NP100-12', v:'12V', ah:'100Ah', cca:'—'},
        {model:'NP180-12', v:'12V', ah:'180Ah', cca:'—'},
      ]},
    { name:'BAE', origin:'Alemania 🇩🇪', color:'#1565c0',
      models:[
        {model:'OPzV 100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'OPzV 150', v:'12V', ah:'150Ah', cca:'—'},
        {model:'OPzV 200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'DEKA SOLAR', origin:'USA 🇺🇸', color:'#f57f17',
      models:[
        {model:'8G27',  v:'12V', ah:'92Ah',  cca:'—'},
        {model:'8G31',  v:'12V', ah:'130Ah', cca:'—'},
        {model:'8L16',  v:'6V',  ah:'370Ah', cca:'—'},
      ]},
    { name:'HOLY SUN', origin:'China 🇨🇳', color:'#ff8f00',
      models:[
        {model:'HS100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'HS150', v:'12V', ah:'150Ah', cca:'—'},
        {model:'HS200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'RITAR', origin:'China 🇨🇳', color:'#00695c',
      models:[
        {model:'RT12-55',  v:'12V', ah:'55Ah',  cca:'—'},
        {model:'RT12-100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'RT12-150', v:'12V', ah:'150Ah', cca:'—'},
        {model:'RT12-200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'NARADA', origin:'China 🇨🇳', color:'#4e342e',
      models:[
        {model:'6-GFM-100', v:'12V', ah:'100Ah', cca:'—'},
        {model:'6-GFM-150', v:'12V', ah:'150Ah', cca:'—'},
        {model:'6-GFM-200', v:'12V', ah:'200Ah', cca:'—'},
      ]},
  ],
  agm: [
    { name:'OPTIMA', origin:'USA 🇺🇸', color:'#b71c1c',
      models:[
        {model:'RedTop 34',   v:'12V', ah:'50Ah',  cca:'800'},
        {model:'RedTop 35',   v:'12V', ah:'44Ah',  cca:'720'},
        {model:'YellowTop D34', v:'12V', ah:'55Ah', cca:'750'},
        {model:'YellowTop D27', v:'12V', ah:'66Ah', cca:'830'},
        {model:'BlueTop D27M', v:'12V', ah:'66Ah',  cca:'800'},
        {model:'BlueTop D31M', v:'12V', ah:'75Ah',  cca:'900'},
      ]},
    { name:'VARTA', origin:'Alemania 🇩🇪', color:'#37474f',
      models:[
        {model:'C6 52Ah',  v:'12V', ah:'52Ah',  cca:'520'},
        {model:'D24 60Ah', v:'12V', ah:'60Ah',  cca:'600'},
        {model:'E38 74Ah', v:'12V', ah:'74Ah',  cca:'730'},
        {model:'F17 80Ah', v:'12V', ah:'80Ah',  cca:'800'},
        {model:'G14 95Ah', v:'12V', ah:'95Ah',  cca:'850'},
        {model:'H15 105Ah',v:'12V', ah:'105Ah', cca:'950'},
      ]},
    { name:'ODYSSEY', origin:'USA 🇺🇸', color:'#1a237e',
      models:[
        {model:'PC680',  v:'12V', ah:'16Ah',  cca:'220'},
        {model:'PC925',  v:'12V', ah:'28Ah',  cca:'330'},
        {model:'PC1200', v:'12V', ah:'54Ah',  cca:'540'},
        {model:'PC1500', v:'12V', ah:'68Ah',  cca:'835'},
        {model:'PC1750', v:'12V', ah:'72Ah',  cca:'880'},
        {model:'PC2150', v:'12V', ah:'100Ah', cca:'1150'},
      ]},
    { name:'MAC', origin:'Internacional', color:'#455a64',
      models:[
        {model:'MAC AGM 60',  v:'12V', ah:'60Ah',  cca:'640'},
        {model:'MAC AGM 70',  v:'12V', ah:'70Ah',  cca:'720'},
        {model:'MAC AGM 80',  v:'12V', ah:'80Ah',  cca:'800'},
        {model:'MAC AGM 100', v:'12V', ah:'100Ah', cca:'950'},
      ]},
    { name:'INTERSTATE', origin:'USA 🇺🇸', color:'#1565c0',
      models:[
        {model:'MTX-35',  v:'12V', ah:'44Ah',  cca:'525'},
        {model:'MTX-48',  v:'12V', ah:'70Ah',  cca:'760'},
        {model:'MTX-65',  v:'12V', ah:'75Ah',  cca:'810'},
        {model:'MTX-78',  v:'12V', ah:'74Ah',  cca:'800'},
      ]},
    { name:'CATL', origin:'China 🇨🇳', color:'#1976d2',
      models:[
        {model:'LF50',  v:'12.8V', ah:'50Ah',  cca:'—'},
        {model:'LF100', v:'12.8V', ah:'100Ah', cca:'—'},
        {model:'LF150', v:'12.8V', ah:'150Ah', cca:'—'},
        {model:'LF200', v:'12.8V', ah:'200Ah', cca:'—'},
        {model:'LF280', v:'3.2V',  ah:'280Ah', cca:'—'},
      ]},
    { name:'BYD', origin:'China 🇨🇳', color:'#1565c0',
      models:[
        {model:'B-Box 5kWh',  v:'48V', ah:'100Ah', cca:'—'},
        {model:'B-Box 10kWh', v:'48V', ah:'200Ah', cca:'—'},
        {model:'LFP 100Ah',   v:'12V', ah:'100Ah', cca:'—'},
        {model:'LFP 200Ah',   v:'12V', ah:'200Ah', cca:'—'},
      ]},
    { name:'SAMSUNG SDI', origin:'Corea 🇰🇷', color:'#0d47a1',
      models:[
        {model:'94Ah EV',  v:'12V',  ah:'94Ah',  cca:'—'},
        {model:'INR21700', v:'3.6V', ah:'5Ah',   cca:'—'},
        {model:'PRiMX 48V',v:'48V',  ah:'120Ah', cca:'—'},
      ]},
    { name:'QUANTUM', origin:'Internacional', color:'#6a1b9a',
      models:[
        {model:'Q-AGM 60',  v:'12V', ah:'60Ah',  cca:'640'},
        {model:'Q-AGM 80',  v:'12V', ah:'80Ah',  cca:'800'},
        {model:'Q-LI 100',  v:'12.8V',ah:'100Ah',cca:'—'},
      ]},
    { name:'YLB', origin:'Bolivia 🇧🇴', color:'#1b5e20',
      models:[
        {model:'YLB-LI-50',  v:'12.8V', ah:'50Ah',  cca:'—'},
        {model:'YLB-LI-100', v:'12.8V', ah:'100Ah', cca:'—'},
        {model:'YLB-AGM-60', v:'12V',   ah:'60Ah',  cca:'640'},
      ]},
  ]
};

function createBrandCard(brand) {
  const card = document.createElement('div');
  card.className = 'brand-card';
  card.setAttribute('data-animate', 'fadeUp');
  const logoSrc = logos[brand.name];
  const color = brand.color || '#d4a017';

  const logoHTML = logoSrc
    ? `<img src="${logoSrc}" alt="${brand.name}" class="brand-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : '';
  const badgeDisplay = logoSrc ? 'none' : 'flex';

  const modelsHTML = brand.models.map(m => `
    <div class="model-row" onclick="consultarWA('${brand.name}','${m.model}');event.stopPropagation()">
      <span class="model-name">${m.model}</span>
      <span class="model-spec">${m.ah}</span>
      <span class="model-spec">${m.cca !== '—' ? m.cca+'CCA' : m.v}</span>
    </div>`).join('');

  card.innerHTML = `
    <div class="brand-logo-wrap">
      ${logoHTML}
      <div class="brand-logo-badge" style="display:${badgeDisplay};background:${color}">${brand.name.slice(0,2)}</div>
    </div>
    <div class="brand-name">${brand.name}</div>
    <div class="brand-origin">${brand.origin}</div>
    <div class="brand-models">${modelsHTML}</div>
    <button class="brand-wa-btn" onclick="consultarWA('${brand.name}','')">💬 Consultar Precio</button>
  `;
  return card;
}

function consultarWA(marca, modelo) {
  const txt = modelo
    ? `Hola! Me interesa la batería *${marca} ${modelo}*. ¿Tienen disponible y cuál es el precio?`
    : `Hola! Me interesa una batería de la marca *${marca}*. ¿Qué modelos tienen disponibles?`;
  window.open(`https://wa.me/59165302585?text=${encodeURIComponent(txt)}`, '_blank');
}

// Render all grids + observe each card
['liquidas','gel','agm'].forEach(cat => {
  const grid = document.getElementById(`grid-${cat}`);
  if (!grid) return;
  catalog[cat].forEach(brand => {
    const card = createBrandCard(brand);
    grid.appendChild(card);
    observer.observe(card); // ← observe after insertion
  });
});

// Also observe other dynamically-relevant cards
document.querySelectorAll('.brand-card, .servicio-card, .mv-card, .log-item, .review-card').forEach(el => {
  if (!el.hasAttribute('data-animate')) el.setAttribute('data-animate', 'fadeUp');
  observer.observe(el);
});

// Tab switching
const catTabs = document.querySelectorAll('.cat-tab');
const catPanels = document.querySelectorAll('.cat-panel');
catTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;
    catTabs.forEach(t => t.classList.remove('active'));
    catPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`panel-${cat}`).classList.add('active');
  });
});

// ---- STAR RATING ----
const stars = document.querySelectorAll('.star');
const ratingInput = document.getElementById('ratingInput');
stars.forEach(star => {
  star.addEventListener('click', () => {
    const val = +star.dataset.val;
    ratingInput.value = val;
    stars.forEach(s => s.classList.toggle('active', +s.dataset.val <= val));
  });
  star.addEventListener('mouseenter', () => {
    const val = +star.dataset.val;
    stars.forEach(s => s.classList.toggle('active', +s.dataset.val <= val));
  });
});
document.getElementById('starRating').addEventListener('mouseleave', () => {
  const val = +ratingInput.value;
  stars.forEach(s => s.classList.toggle('active', +s.dataset.val <= val));
});

// ---- FEEDBACK FORM ----
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = feedbackForm.querySelector('button[type=submit]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  try {
    const res = await fetch(feedbackForm.action, {
      method: 'POST',
      body: new FormData(feedbackForm),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      feedbackForm.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  } catch {
    btn.textContent = 'Enviar Reseña';
    btn.disabled = false;
  }
});

// ---- CHAT BOT ----
const chatTrigger = document.getElementById('chatTrigger');
const chatBubble = document.getElementById('chatBubble');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatBadge = document.querySelector('.chat-trigger-badge');

// Chat starts CLOSED
chatBubble.classList.remove('open');

chatTrigger.addEventListener('click', () => {
  chatBubble.classList.toggle('open');
  if (chatBadge) chatBadge.style.display = 'none';
});
chatClose.addEventListener('click', () => chatBubble.classList.remove('open'));

function addMsg(text, type) {
  const d = document.createElement('div');
  d.className = 'chat-msg ' + type;
  d.textContent = text;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

const responses = [
  { k: ['precio','cost','cuánto','costo','vale'], r: '¡Tenemos los mejores precios! Escríbenos al WhatsApp para una cotización personalizada 👉 wa.me/59165302585' },
  { k: ['toyo','enerjet','volta','fbc','bosch','gs','mac','panasonic'], r: '✅ Sí, tenemos esa marca disponible. Consulta modelos y precios en nuestro WhatsApp: 65302585' },
  { k: ['envío','envio','despacho','mandar','ciudad'], r: '🚚 Hacemos envíos a los 9 departamentos de Bolivia. Seguro y rápido.' },
  { k: ['garantía','garantia'], r: '🛡️ Todas nuestras baterías tienen garantía oficial de fábrica. ¡Sin preocupaciones!' },
  { k: ['dirección','ubicación','donde','tienda'], r: '📍 Estamos en Calle Falsuri #1134, Cochabamba. Lun–Sáb 8AM–6:30PM.' },
  { k: ['hola','buenos','buenas','saludos'], r: '¡Hola! 😊 Somos Comercial Quillacas, tu especialista en baterías. ¿En qué te puedo ayudar?' },
];

function getBotReply(msg) {
  const m = msg.toLowerCase();
  for (const r of responses) {
    if (r.k.some(k => m.includes(k))) return r.r;
  }
  return '¿Tienes alguna duda sobre nuestras baterías? Escríbenos directo al 📱 WhatsApp: 65302585';
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMsg(text, 'user');
  chatInput.value = '';
  setTimeout(() => addMsg(getBotReply(text), 'bot'), 700);
}
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });
