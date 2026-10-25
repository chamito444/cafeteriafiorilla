(function(){'use strict';
document.addEventListener('contextmenu',function(e){e.preventDefault();return false;},{capture:true});
document.addEventListener('keydown',function(e){
  var k=e.key||'',c=e.keyCode||0;
  if(k==='F12'||c===123){e.preventDefault();e.stopPropagation();return false;}
  if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c'||k==='K'||k==='k'||c===73||c===74||c===67||c===75)){e.preventDefault();e.stopPropagation();return false;}
  if(e.metaKey&&e.altKey&&(k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c'||c===73||c===74||c===67)){e.preventDefault();e.stopPropagation();return false;}
  if((e.ctrlKey||e.metaKey)&&(k==='u'||k==='U'||k==='s'||k==='S'||c===85||c===83)){e.preventDefault();e.stopPropagation();return false;}
},{capture:true});
document.addEventListener('dragstart',function(e){if(e.target&&e.target.tagName&&(e.target.tagName==='IMG'||e.target.tagName==='VIDEO')){e.preventDefault();return false;}},{capture:true});
setInterval(function(){try{var t=performance.now();(function(){}['constructor']('debugger')());if(performance.now()-t>100){console.clear();}}catch(x){}},800);
try{var n=function(){};['log','debug','info','warn','error','table'].forEach(function(m){console[m]=n;});}catch(x){}
})();

/**
 * FIORELLA — Catálogo Interactivo & Scrollytelling Completo (Handoff Reintegrado)
 * Seguridad & Protección Anti-Inspección Integrada
 */

// BLINDAJE DE SEGURIDAD CLIENTE: ANTI-INSPECCIÓN & DEVTOOLS
(function() {
  'use strict';
  // Bloquear menú contextual (click derecho)
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  }, { capture: true });

  // Bloquear atajos de teclado de inspección (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
  document.addEventListener('keydown', function(e) {
    var k = e.key || '', c = e.keyCode || 0;
    if (k === 'F12' || c === 123) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c'||k==='K'||k==='k'||c===73||c===74||c===67||c===75)) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
    if (e.metaKey && e.altKey && (k==='I'||k==='i'||k==='J'||k==='j'||k==='C'||k==='c'||c===73||c===74||c===67)) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
    if ((e.ctrlKey || e.metaKey) && (k==='u'||k==='U'||k==='s'||k==='S'||c===85||c===83)) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
  }, { capture: true });

  // Prevenir arrastre de imágenes y videos
  document.addEventListener('dragstart', function(e) {
    if (e.target && e.target.tagName && (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO')) {
      e.preventDefault();
      return false;
    }
  }, { capture: true });

  // Desactivar inspección mediante bucle de debugger
  setInterval(function() {
    try {
      var t = performance.now();
      (function() {}['constructor']('debugger')());
      if (performance.now() - t > 100) {
        console.clear();
      }
    } catch(x) {}
  }, 800);

  // Silenciar logs de consola para usuarios finales
  try {
    var noop = function() {};
    ['log', 'debug', 'info', 'warn', 'error', 'table'].forEach(function(m) {
      console[m] = noop;
    });
  } catch(x) {}
})();

// ----------------------------------------------------------------------------
// 1. MAPA DE MEDIOS & DATOS DEL MENÚ
// ----------------------------------------------------------------------------
const SLUG_MAP = {
  'Cafe·Espresso': 'fio-cafe-espresso',
  'Cafe·Americano': 'fio-cafe-americano',
  'Cafe·Cortado': 'fio-cafe-cortado',
  'Cafe·Latte': 'fio-cafe-latte',
  'Cafe·Latte Sabores': 'fio-cafe-latte-sabores',
  'Cafe·Capuchino': 'fio-cafe-capuchino',
  'Cafe·Capuchino Sabores': 'fio-cafe-capuchino-sabores',
  'Cafe·Mocachino': 'fio-cafe-mocachino',
  'Infusiones·Chocolate Caliente': 'fio-infusiones-chocolate-caliente',
  'Infusiones·Chai': 'fio-infusiones-chai',
  'Infusiones·Chai Latte': 'fio-infusiones-chai-latte',
  'Infusiones·Dirty Chai Latte': 'fio-infusiones-dirty-chai-latte',
  'Infusiones·Matcha': 'fio-infusiones-matcha',
  'Infusiones·Matcha Latte': 'fio-infusiones-matcha-latte',
  'Infusiones·Te / Infusiones': 'fio-infusiones-te-infusiones',
  'Helados·Canasta Borde de Chocolate': 'fio-helados-canasta-borde-de-chocolate',
  'Helados·Canasta Galleta': 'fio-helados-canasta-galleta',
  'Helados·Cono': 'fio-helados-cono',
  'Galletones·Chispas de Chocolate': 'fio-galletones-chispas-de-chocolate',
  'Galletones·Chispas de Chocolate y Nutella': 'fio-galletones-chispas-de-chocolate-y-nutella',
  'Galletones·Chispas de Chocolate y Manjar': 'fio-galletones-chispas-de-chocolate-y-manjar',
  'Sandwiches·Ciabatta Jamón, Queso y Rúcula': 'fio-sandwiches-ciabatta-jamon-queso-y-rucula',
  'Croissant·Croissant Jamón & Queso': 'fio-croissant-croissant-jamon-queso',
  'Croissant·Napolitana Mix': 'fio-croissant-napolitana-mix',
  'Croissant·Medialunas': 'fio-croissant-medialunas',
  'Croissant·Medialunas Rellenas': 'fio-croissant-medialunas-rellenas',
  'Croissant·Croissant Nutella': 'fio-croissant-croissant-nutella',
  'Pasteleria·Donas': 'fio-pasteleria-donas',
  'Pasteleria·Muffin Rellenos': 'fio-pasteleria-muffin-rellenos',
  'Pasteleria·Brownie': 'fio-pasteleria-brownie',
  'Pasteleria·Brownie + Helado Soft': 'fio-pasteleria-brownie-helado-soft',
  'Waffle·Waffle Artesanal': 'fio-waffle-waffle-artesanal'
};

function getProductImageUrl(id) {
  const slug = SLUG_MAP[id];
  return slug ? `media/assets/${slug}.webp` : 'media/coffee-espresso-hero.jpg';
}

const MENU_DATA = [
  { 
    key: 'Cafe', kicker: '01', name: 'Café', note: 'Especialidad', 
    items: [
      { id: 'Cafe·Espresso', n: 'Espresso', p: '2.400', price: 2400, d: 'Extracción pura e intensa de grano seleccionado.', cat: 'Café' },
      { id: 'Cafe·Americano', n: 'Americano', p: '2.400', price: 2400, d: 'Espresso doble rebajado con agua caliente.', cat: 'Café' },
      { id: 'Cafe·Cortado', n: 'Cortado', p: '2.600', price: 2600, d: 'Espresso con un toque de leche emulsionada.', cat: 'Café' },
      { id: 'Cafe·Latte', n: 'Latte', p: '2.600', price: 2600, d: 'Suave y sedoso con microespuma de leche.', cat: 'Café' },
      { id: 'Cafe·Latte Sabores', n: 'Latte Sabores', p: '2.800', price: 2800, d: 'Vainilla · Caramelo · Canela · Avellana · Amaretto', cat: 'Café', hasOpts: true },
      { id: 'Cafe·Capuchino', n: 'Capuchino', p: '2.600', price: 2600, d: 'Espresso con abundante y densa crema de leche.', cat: 'Café' },
      { id: 'Cafe·Capuchino Sabores', n: 'Capuchino Sabores', p: '2.800', price: 2800, d: 'Vainilla · Caramelo · Canela · Avellana · Amaretto', cat: 'Café', hasOpts: true },
      { id: 'Cafe·Mocachino', n: 'Mocachino', p: '2.800', price: 2800, d: 'Cacao premium, espresso y leche emulsionada.', cat: 'Café' }
    ]
  },
  { 
    key: 'Infusiones', kicker: '02', name: 'Chocolate, Chai y Matcha', note: 'Infusiones & botánicos', 
    items: [
      { id: 'Infusiones·Chocolate Caliente', n: 'Chocolate Caliente', p: '2.990', price: 2990, d: 'Cacao espeso de alta pureza, receta tradicional.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Chai', n: 'Chai', p: '2.400', price: 2400, d: 'Infusión aromática de especias orientales seleccionadas.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Chai Latte', n: 'Chai Latte', p: '2.700', price: 2700, d: 'Té chai especiado con leche vaporizada.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Dirty Chai Latte', n: 'Dirty Chai Latte', p: '3.400', price: 3400, d: 'Coronado con un shot de espresso intenso.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Matcha', n: 'Matcha', p: '3.000', price: 3000, d: 'Té verde ceremonial puro batido tradicionalmente.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Matcha Latte', n: 'Matcha Latte', p: '3.500', price: 3500, d: 'Matcha ceremonial emulsionado con leche sedosa.', cat: 'Chocolate & Chai' },
      { id: 'Infusiones·Te / Infusiones', n: 'Té / Infusiones', p: '1.500', price: 1500, d: 'Bolsita. Negro, verde y hierbas digestivas.', cat: 'Chocolate & Chai', hasOpts: true }
    ]
  },
  { 
    key: 'Helados', kicker: '03', name: 'Helados Soft', note: 'A pedido', 
    items: [
      { id: 'Helados·Canasta Borde de Chocolate', n: 'Canasta Borde de Chocolate', p: '3.690', price: 3690, d: 'Dos frutas de temporada, un topping y salsa a elección.', cat: 'Helados Soft', hasOpts: true },
      { id: 'Helados·Canasta Galleta', n: 'Canasta Galleta', p: '3.190', price: 3190, d: 'Dos frutas de temporada, un topping y salsa a elección.', cat: 'Helados Soft', hasOpts: true },
      { id: 'Helados·Cono', n: 'Cono Artesanal', p: '1.990', price: 1990, d: 'Salsa a elección, barquillo y lluvia de chocolate o colores.', cat: 'Helados Soft', hasOpts: true }
    ]
  },
  { 
    key: 'Galletones', kicker: '04', name: 'Galletones Artesanales', note: 'Horneados del día', 
    items: [
      { id: 'Galletones·Chispas de Chocolate', n: 'Chispas de Chocolate', p: '3.200', price: 3200, d: 'Masa suave con abundante chocolate semi-amargo.', cat: 'Galletones' },
      { id: 'Galletones·Chispas de Chocolate y Nutella', n: 'Chispas de Chocolate y Nutella', p: '3.200', price: 3200, d: 'Relleno cremoso de auténtica Nutella italiana.', cat: 'Galletones' },
      { id: 'Galletones·Chispas de Chocolate y Manjar', n: 'Chispas de Chocolate y Manjar', p: '3.200', price: 3200, d: 'Relleno tradicional con manjar de campo.', cat: 'Galletones' }
    ]
  },
  { 
    key: 'Sandwiches', kicker: '05', name: 'Sándwiches', note: 'Salado', 
    items: [
      { id: 'Sandwiches·Ciabatta Jamón, Queso y Rúcula', n: 'Ciabatta Jamón, Queso y Rúcula', p: '5.400', price: 5400, d: 'Pan ciabatta con jamón, queso, tomate, rúcula y salsa especial Fiorella.', cat: 'Sándwiches' }
    ]
  },
  { 
    key: 'Croissant', kicker: '06', name: 'Croissant y Hojaldres', note: 'Panadería', 
    items: [
      { id: 'Croissant·Croissant Jamón & Queso', n: 'Croissant Jamón & Queso', p: '3.200', price: 3200, d: 'Mantequilla francesa con jamón seleccionado y queso fundido.', cat: 'Croissant & Hojaldres' },
      { id: 'Croissant·Napolitana Mix', n: 'Napolitana Mix', p: '2.400', price: 2400, d: 'Hojaldre horneado con relleno estilo napolitano.', cat: 'Croissant & Hojaldres' },
      { id: 'Croissant·Medialunas', n: 'Medialunas', p: '1.500', price: 1500, d: 'Tradicionales medialunas de manteca con almíbar.', cat: 'Croissant & Hojaldres' },
      { id: 'Croissant·Medialunas Rellenas', n: 'Medialunas Rellenas', p: '1.800', price: 1800, d: 'Manjar o Nutella + crema chantilly y salsa de chocolate.', cat: 'Croissant & Hojaldres', hasOpts: true },
      { id: 'Croissant·Croissant Nutella', n: 'Croissant Nutella', p: '3.500', price: 3500, d: 'Nutella generosa, frutilla fresca, crema chantilly y salsa de chocolate.', cat: 'Croissant & Hojaldres' }
    ]
  },
  { 
    key: 'Pasteleria', kicker: '07', name: 'Pastelería', note: 'Vitrina', 
    items: [
      { id: 'Pasteleria·Donas', n: 'Donas', p: '1.800', price: 1800, d: 'Chocolate · Frutos del bosque · Cookie', cat: 'Pastelería', hasOpts: true },
      { id: 'Pasteleria·Muffin Rellenos', n: 'Muffin Rellenos', p: '2.500', price: 2500, d: 'Chocolate · Limón · Cookie', cat: 'Pastelería', hasOpts: true },
      { id: 'Pasteleria·Brownie', n: 'Brownie', p: '2.000', price: 2000, d: 'Bizcocho húmedo de puro chocolate semi-amargo.', cat: 'Pastelería' },
      { id: 'Pasteleria·Brownie + Helado Soft', n: 'Brownie + Helado Soft', p: '2.800', price: 2800, d: 'Brownie tibio con helado soft artesanal a elección.', cat: 'Pastelería' }
    ]
  },
  { 
    key: 'Waffle', kicker: '08', name: 'Waffle Artesanal', note: 'La casa recomienda', 
    items: [
      { id: 'Waffle·Waffle Artesanal', n: 'Waffle Artesanal Fiorella', p: '4.990', price: 4990, d: 'Dos frutas de temporada, un topping, salsa a elección y crema chantilly. Agrega helado soft por +$1.000.', cat: 'Waffles', hasOpts: true }
    ]
  }
];

const OPTS_CONFIG = {
  'Latte Sabores': [{ label: 'Sirope', max: 1, items: ['Vainilla', 'Caramelo', 'Canela', 'Avellana', 'Amaretto'] }],
  'Capuchino Sabores': [{ label: 'Sirope', max: 1, items: ['Vainilla', 'Caramelo', 'Canela', 'Avellana', 'Amaretto'] }],
  'Té / Infusiones': [{ label: 'Variedad', max: 1, items: ['Té Negro', 'Té Verde', 'Hierbas Digestivas'] }],
  'Canasta Borde de Chocolate': [
    { label: 'Dos frutas de temporada', max: 2, items: ['Frutilla', 'Plátano', 'Arándanos', 'Durazno', 'Kiwi'] },
    { label: 'Topping', max: 1, items: ['Chocolate', 'Manjar', 'Nutella', 'Chispas', 'Maní'] },
    { label: 'Salsa', max: 1, items: ['Chocolate', 'Manjar', 'Frutos rojos'] }
  ],
  'Canasta Galleta': [
    { label: 'Dos frutas de temporada', max: 2, items: ['Frutilla', 'Plátano', 'Arándanos', 'Durazno', 'Kiwi'] },
    { label: 'Topping', max: 1, items: ['Chocolate', 'Manjar', 'Nutella', 'Chispas', 'Maní'] },
    { label: 'Salsa', max: 1, items: ['Chocolate', 'Manjar', 'Frutos rojos'] }
  ],
  'Cono Artesanal': [
    { label: 'Salsa', max: 1, items: ['Chocolate', 'Manjar', 'Frutos rojos'] },
    { label: 'Lluvia', max: 1, items: ['Chocolate', 'De colores'] }
  ],
  'Medialunas Rellenas': [{ label: 'Relleno', max: 1, items: ['Manjar', 'Nutella'] }],
  'Donas': [{ label: 'Sabor', max: 1, items: ['Chocolate', 'Frutos del bosque', 'Cookie'] }],
  'Muffin Rellenos': [{ label: 'Sabor', max: 1, items: ['Chocolate', 'Limón', 'Cookie'] }],
  'Waffle Artesanal Fiorella': [
    { label: 'Dos frutas de temporada', max: 2, items: ['Frutilla', 'Plátano', 'Arándanos', 'Durazno', 'Kiwi'] },
    { label: 'Topping', max: 1, items: ['Chocolate', 'Manjar', 'Nutella', 'Chispas', 'Maní'] },
    { label: 'Salsa', max: 1, items: ['Chocolate', 'Manjar', 'Frutos rojos'] },
    { label: 'Extra', max: 1, items: [{ n: 'Agregar helado soft', add: 1000 }] }
  ]
};

const fmt = (n) => '$' + n.toLocaleString('es-CL').replace(/,/g, '.');

// ----------------------------------------------------------------------------
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// ----------------------------------------------------------------------------
const state = {
  cart: {},
  activeCategory: 'all',
  searchQuery: '',
  deliveryMode: 'Retiro en local',
  activeSheetItem: null,
  tempChoices: {},
  tempQty: 1,
  tempNote: ''
};

try {
  const saved = localStorage.getItem('fiorella_cart');
  if (saved) state.cart = JSON.parse(saved);
  const savedMode = localStorage.getItem('fiorella_delivery_mode');
  if (savedMode && savedMode !== 'Delivery') state.deliveryMode = savedMode;
  else state.deliveryMode = 'Retiro en local';
} catch (e) {}

function saveCart() {
  try {
    localStorage.setItem('fiorella_cart', JSON.stringify(state.cart));
    localStorage.setItem('fiorella_delivery_mode', state.deliveryMode);
  } catch (e) {}
}

// ----------------------------------------------------------------------------
// 3. SCROLLYTELLING CON CANVAS Y LERP
// ----------------------------------------------------------------------------
function initScrollytelling() {
  const canvas = document.getElementById('scrolly-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  const container = document.querySelector('.scrolly-container');

  const TOTAL_FRAMES = 140;
  const frames = [];
  let currentSmoothFrame = 0;
  let targetFrame = 0;

  function getFrameUrl(i) {
    const p = String(i).padStart(4, '0');
    return `media/frames/frame_${p}.jpg`;
  }

  if (!canvas || !ctx) return;

  const firstImg = new Image();
  firstImg.src = getFrameUrl(0);
  firstImg.onload = () => {
    frames[0] = firstImg;
    resizeCanvas();
    if (container) container.classList.add('is-visible');

    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => { frames[i] = img; };
    }
  };

  let lastW = -1;
  let lastH = -1;

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Si el viewport aun no tiene medidas (iframe oculto, pestana en segundo
    // plano, carga temprana en movil) reintentamos: sin esto el canvas queda
    // en 0x0 y el fondo de frames no se dibuja nunca.
    if (!w || !h) { requestAnimationFrame(resizeCanvas); return; }
    // Al hacer pinch-zoom el visualViewport dispara 'resize' constantemente
    // aunque el tamano de maquetado no cambie. Redimensionar el canvas ahi
    // reiniciaba el dibujo y trababa el scroll: si no cambio nada, salimos.
    if (w === lastW && h === lastH) return;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);
    lastW = w;
    lastH = h;
  }

  function drawSingleFrame(img, opacity = 1.0) {
    if (!ctx || !img || !img.complete || img.naturalWidth === 0) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(w / iw, h / ih);
    const rw = iw * scale;
    const rh = ih * scale;
    const ox = (w - rw) / 2;
    const oy = (h - rh) / 2;

    ctx.globalAlpha = opacity;
    ctx.drawImage(img, ox, oy, rw, rh);
  }

  function renderLoop() {
    if (ctx && canvas) {
      currentSmoothFrame += (targetFrame - currentSmoothFrame) * 0.09;
      const baseIdx = Math.floor(currentSmoothFrame);
      const nextIdx = Math.min(TOTAL_FRAMES - 1, baseIdx + 1);
      const alpha = currentSmoothFrame - baseIdx;

      const baseImg = frames[baseIdx] || frames[0];
      const nextImg = frames[nextIdx] || baseImg;

      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (baseImg) drawSingleFrame(baseImg, 1.0);
      if (nextImg && nextImg !== baseImg && alpha > 0.01) {
        drawSingleFrame(nextImg, alpha);
      }
      ctx.globalAlpha = 1.0;
    }
    requestAnimationFrame(renderLoop);
  }

  function onScroll() {
    const dist = document.documentElement.scrollHeight - window.innerHeight;
    if (dist <= 0) return;
    const prog = Math.max(0, Math.min(1, window.scrollY / dist));
    targetFrame = prog * (TOTAL_FRAMES - 1);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 150), { passive: true });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resizeCanvas);

  requestAnimationFrame(renderLoop);
}

// ----------------------------------------------------------------------------
// 4. RENDERIZADO DEL CATÁLOGO (CON MINIATURAS 74x74 WEBP)
// ----------------------------------------------------------------------------
function renderCatalog() {
  const container = document.getElementById('menu-grid');
  if (!container) return;

  const q = state.searchQuery.toLowerCase().trim();
  let totalVisible = 0;

  container.innerHTML = '';

  MENU_DATA.forEach((sec) => {
    const isCatActive = state.activeCategory === 'all' || state.activeCategory === sec.key;
    
    const matchedItems = sec.items.filter((it) => {
      if (!isCatActive) return false;
      if (!q) return true;
      const full = `${it.n} ${it.d || ''} ${sec.name}`.toLowerCase();
      return full.includes(q);
    });

    if (matchedItems.length === 0) return;
    totalVisible++;

    const card = document.createElement('article');
    card.className = `menu-category-card ${sec.key === 'Waffle' ? 'full-width-card' : ''}`;
    card.setAttribute('data-cat-key', sec.key);

    let rowsHtml = matchedItems.map((it) => {
      const inCart = state.cart[it.id];
      const hasOpts = OPTS_CONFIG[it.n] != null;
      const rowSelectedClass = inCart ? 'is-selected' : '';
      const imgUrl = getProductImageUrl(it.id);

      let footerHtml = '';
      if (inCart) {
        const choiceLabels = [];
        Object.entries(inCart.choices || {}).forEach(([g, vals]) => {
          if (vals && vals.length) choiceLabels.push(vals.join(', '));
        });
        const summary = choiceLabels.join(' · ') + (inCart.note ? ` — "${inCart.note}"` : '');

        footerHtml = `
          <div class="item-selected-footer" onclick="event.stopPropagation();">
            <div class="row-stepper">
              <button class="step-btn" onclick="updateItemQty('${it.id}', -1)" aria-label="Quitar uno">–</button>
              <span class="step-val">${inCart.qty}</span>
              <button class="step-btn" onclick="updateItemQty('${it.id}', 1)" aria-label="Agregar uno">+</button>
            </div>
            <div class="row-selection-summary">
              <span class="summary-text">${summary || 'Personalizado'}</span>
              <button class="edit-opt-btn" onclick="openSheetById('${it.id}')">Editar</button>
            </div>
          </div>
        `;
      } else {
        footerHtml = `
          <div class="item-tap-footer">
            <span class="tap-label">TOCA PARA PEDIR</span>
          </div>
        `;
      }

      return `
        <div class="product-row ${rowSelectedClass}" onclick="handleRowClick('${it.id}')" tabindex="0" role="button" aria-label="Pedir ${it.n}">
          <div class="product-tile-media">
            <img src="${imgUrl}" alt="${it.n}" class="media-thumb-img" loading="lazy">
          </div>
          <div class="row-main">
            <div class="row-header">
              <span class="row-name">
                ${it.n}
                ${hasOpts ? '<span class="badge-custom">A TU GUSTO</span>' : ''}
              </span>
              <span class="row-dots" aria-hidden="true"></span>
              <span class="row-price">$${it.p}</span>
            </div>
            ${it.d ? `<div class="row-desc">${it.d}</div>` : ''}
            ${footerHtml}
          </div>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <header class="section-card-header">
        <div class="header-left">
          <span class="kicker-num">${sec.kicker}</span>
          <h3 class="section-title">${sec.name}</h3>
        </div>
        <span class="section-pill-tag">${sec.note}</span>
      </header>
      <div class="section-hairline"></div>
      <div class="section-products-list">
        ${rowsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  const noResults = document.getElementById('no-results-box');
  if (noResults) {
    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  }

  updateOrderTray();
}

// ----------------------------------------------------------------------------
// 5. BANDEJA FIJA DE PEDIDO (ORDER TRAY)
// ----------------------------------------------------------------------------
// Detalle editable de la bandeja: sumar, restar y quitar antes de enviar.
// Se arma con DOM en vez de innerHTML: nada que escapar y sin riesgo de inyeccion.
function renderTrayCart() {
  const cont = document.getElementById('tray-cart-list');
  if (!cont) return;

  cont.textContent = '';
  const entries = Object.values(state.cart);

  if (entries.length === 0) {
    const vacio = document.createElement('div');
    vacio.className = 'tray-cart-vacio';
    vacio.textContent = 'Tu bandeja esta vacia';
    cont.appendChild(vacio);
    return;
  }

  const crear = (tag, clase, texto) => {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto != null) el.textContent = texto;
    return el;
  };

  entries.forEach((line) => {
    const id = line.item.id;

    const fila = crear('div', 'tray-cart-item');

    // --- Info: tocarla abre el personalizador ---
    const info = crear('div', 'tcl-info');
    info.appendChild(crear('div', 'tcl-nombre', line.item.n));

    const opciones = Object.values(line.choices || {})
      .filter((v) => v && v.length)
      .map((v) => v.join(', '))
      .join(' · ');
    if (opciones) info.appendChild(crear('div', 'tcl-op', opciones));
    if (line.note) info.appendChild(crear('div', 'tcl-nota', line.note));
    info.appendChild(crear('div', 'tcl-editar', 'Tocar para cambiar'));
    info.addEventListener('click', () => openSheetById(id));
    fila.appendChild(info);

    // --- Cantidad y subtotal ---
    const controles = crear('div', 'tcl-controles');
    const qty = crear('div', 'tcl-qty');

    const menos = crear('button', 'tcl-btn', '−');
    menos.setAttribute('aria-label', 'Quitar uno');
    menos.addEventListener('click', () => updateItemQty(id, -1));

    const mas = crear('button', 'tcl-btn', '+');
    mas.setAttribute('aria-label', 'Agregar uno');
    mas.addEventListener('click', () => updateItemQty(id, 1));

    qty.appendChild(menos);
    qty.appendChild(crear('span', 'tcl-num', String(line.qty)));
    qty.appendChild(mas);

    controles.appendChild(qty);
    controles.appendChild(crear('div', 'tcl-sub', fmt(line.qty * line.unitPrice)));
    fila.appendChild(controles);

    // --- Quitar del pedido ---
    const quitar = crear('button', 'tcl-quitar', '×');
    quitar.setAttribute('aria-label', 'Quitar ' + line.item.n + ' del pedido');
    quitar.addEventListener('click', () => quitarDelPedido(id));
    fila.appendChild(quitar);

    cont.appendChild(fila);
  });
}

window.quitarDelPedido = function (id) {
  if (!state.cart[id]) return;
  delete state.cart[id];
  renderCatalog();
};

window.toggleTrayCart = function (forzar) {
  const tray = document.getElementById('order-tray');
  if (!tray) return;

  const abierto = typeof forzar === 'boolean'
    ? forzar
    : !tray.classList.contains('cart-abierto');

  tray.classList.toggle('cart-abierto', abierto);

  const flecha = document.getElementById('tray-cart-toggle');
  if (flecha) {
    flecha.classList.toggle('abierto', abierto);
    flecha.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  }
  if (abierto) renderTrayCart();
};

function updateOrderTray() {
  const tray = document.getElementById('order-tray');
  const countEl = document.getElementById('tray-count');
  const totalEl = document.getElementById('tray-total');
  const formLinkEl = document.getElementById('tray-form-link');
  const modeButtons = document.querySelectorAll('.tray-mode-btn');

  if (!tray) return;

  const entries = Object.values(state.cart);
  const totalItems = entries.reduce((s, it) => s + it.qty, 0);
  const totalPrice = entries.reduce((s, it) => s + (it.qty * it.unitPrice), 0);

  if (totalItems > 0) {
    tray.classList.add('is-visible');
    tray.style.pointerEvents = 'auto';
  } else {
    tray.classList.remove('is-visible');
    tray.style.pointerEvents = 'none';
  }

  if (countEl) countEl.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
  if (totalEl) totalEl.textContent = fmt(totalPrice);

  renderTrayCart();
  if (totalItems === 0) toggleTrayCart(false);

  if (formLinkEl) {
    formLinkEl.href = buildGoogleFormUrl();
  }

  modeButtons.forEach((btn) => {
    if (btn.getAttribute('data-mode') === state.deliveryMode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  saveCart();
}

// ----------------------------------------------------------------------------
// 6. ACCIONES DEL CARRITO Y MODAL SHEET
// ----------------------------------------------------------------------------
function findItemById(id) {
  for (const sec of MENU_DATA) {
    for (const it of sec.items) {
      if (it.id === id) return it;
    }
  }
  return null;
}

window.handleRowClick = function(id) {
  const item = findItemById(id);
  if (!item) return;

  const inCart = state.cart[id];
  const hasOpts = OPTS_CONFIG[item.n] != null;

  if (hasOpts || inCart) {
    openSheet(item);
  } else {
    state.cart[id] = {
      item,
      qty: 1,
      choices: {},
      note: '',
      unitPrice: item.price
    };
    renderCatalog();
  }
};

window.openSheetById = function(id) {
  const item = findItemById(id);
  if (item) openSheet(item);
};

window.updateItemQty = function(id, delta) {
  if (!state.cart[id]) return;
  const newQty = state.cart[id].qty + delta;
  if (newQty <= 0) {
    delete state.cart[id];
  } else {
    state.cart[id].qty = newQty;
  }
  renderCatalog();
};

function openSheet(item) {
  state.activeSheetItem = item;
  const inCart = state.cart[item.id];

  state.tempQty = inCart ? inCart.qty : 1;
  state.tempChoices = inCart ? JSON.parse(JSON.stringify(inCart.choices)) : {};
  state.tempNote = inCart ? inCart.note || '' : '';

  renderSheetContent();

  const modal = document.getElementById('sheet-modal');
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSheet() {
  const modal = document.getElementById('sheet-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  state.activeSheetItem = null;
}

function renderSheetContent() {
  const item = state.activeSheetItem;
  if (!item) return;

  const container = document.getElementById('sheet-body');
  if (!container) return;

  const groups = OPTS_CONFIG[item.n] || [];
  const imgUrl = getProductImageUrl(item.id);

  let extraAdd = 0;
  groups.forEach((g) => {
    const selected = state.tempChoices[g.label] || [];
    selected.forEach((name) => {
      const match = g.items.map((x) => typeof x === 'string' ? { n: x, add: 0 } : x).find((x) => x.n === name);
      if (match && match.add) extraAdd += match.add;
    });
  });

  const unitPrice = item.price + extraAdd;
  const subtotal = unitPrice * state.tempQty;

  let groupsHtml = groups.map((g) => {
    const selected = state.tempChoices[g.label] || [];
    const chipsHtml = g.items.map((opt) => {
      const optName = typeof opt === 'string' ? opt : opt.n;
      const optAdd = typeof opt === 'object' && opt.add ? ` · +$${opt.add.toLocaleString('es-CL')}` : '';
      const isSelected = selected.includes(optName);

      return `
        <button type="button" 
          class="opt-chip ${isSelected ? 'is-active' : ''}" 
          onclick="toggleChoice('${g.label}', '${optName}', ${g.max})">
          ${optName}${optAdd}
        </button>
      `;
    }).join('');

    return `
      <div class="opts-group">
        <div class="opts-header">
          <span class="opts-label">${g.label}</span>
          <span class="opts-hint">${g.max === 1 ? 'elige una' : `elige hasta ${g.max}`}</span>
        </div>
        <div class="opts-chips-grid">${chipsHtml}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="sheet-top-header">
      <div class="sheet-title-col">
        <span class="sheet-category-kicker">${item.cat || 'Fiorella'}</span>
        <h2 class="sheet-product-title">${item.n}</h2>
      </div>
      <button class="sheet-close-btn" onclick="closeSheet()" aria-label="Cerrar ventana">&times;</button>
    </div>

    <!-- Banner 260px del producto -->
    <div class="sheet-media-banner">
      <img src="${imgUrl}" alt="${item.n}" class="sheet-banner-img">
    </div>

    ${item.d ? `<p class="sheet-desc-italic">${item.d}</p>` : ''}
    
    <div class="sheet-divider"></div>

    <div class="sheet-groups-container">
      ${groupsHtml}
    </div>

    <div class="sheet-note-group">
      <label class="opts-label" for="sheet-note-input">Comentarios o Instrucciones</label>
      <input type="text" id="sheet-note-input" class="sheet-input-text" 
        placeholder="Sin azúcar, para llevar, leche de almendras…" 
        value="${state.tempNote}" 
        oninput="state.tempNote = this.value">
    </div>

    <div class="sheet-footer">
      <div class="sheet-stepper">
        <button class="step-btn" onclick="changeSheetQty(-1)" aria-label="Menos">–</button>
        <span class="step-val">${state.tempQty}</span>
        <button class="step-btn" onclick="changeSheetQty(1)" aria-label="Más">+</button>
      </div>

      <button class="sheet-submit-btn" onclick="saveSheetSelection(${unitPrice})">
        <span>${state.cart[item.id] ? 'Actualizar pedido' : 'Agregar al pedido'}</span>
        <span class="sheet-subtotal">${fmt(subtotal)}</span>
      </button>
    </div>
  `;
}

window.toggleChoice = function(groupLabel, choiceName, max) {
  if (!state.tempChoices[groupLabel]) state.tempChoices[groupLabel] = [];
  const cur = state.tempChoices[groupLabel];
  const idx = cur.indexOf(choiceName);

  if (idx >= 0) {
    cur.splice(idx, 1);
  } else {
    if (max === 1) {
      state.tempChoices[groupLabel] = [choiceName];
    } else {
      cur.push(choiceName);
      if (cur.length > max) {
        state.tempChoices[groupLabel] = cur.slice(-max);
      }
    }
  }

  renderSheetContent();
};

window.changeSheetQty = function(delta) {
  state.tempQty = Math.max(1, state.tempQty + delta);
  renderSheetContent();
};

window.saveSheetSelection = function(unitPrice) {
  const item = state.activeSheetItem;
  if (!item) return;

  state.cart[item.id] = {
    item,
    qty: state.tempQty,
    choices: JSON.parse(JSON.stringify(state.tempChoices)),
    note: state.tempNote.trim(),
    unitPrice: unitPrice
  };

  closeSheet();
  renderCatalog();
};

// ----------------------------------------------------------------------------
// 7. GENERACIÓN DE MENSAJE Y ENVÍO POR WHATSAPP
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// FORMULARIO OFICIAL DE PEDIDOS (Google Forms) — prellenado automatico
// ----------------------------------------------------------------------------
const GOOGLE_FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSdWRvhxTIQnnP09Op6IyqPw-P6dj-yUNyadpO4Yz6XFTs_LPQ/viewform';

// Campos de texto del formulario
const FORM_FIELD_DETALLES = 'entry.419932620';

// Mapa producto del catalogo -> fila de la grilla del formulario (entry.ID)
const FORM_GRID_MAP = {
  'Cafe·Espresso': 'entry.435456595',
  'Cafe·Americano': 'entry.1283851476',
  'Cafe·Cortado': 'entry.1890680133',
  'Cafe·Mocachino': 'entry.634092722',
  'Cafe·Capuchino': 'entry.1212106180',
  'Infusiones·Chocolate Caliente': 'entry.439865779',
  'Infusiones·Chai': 'entry.1071699083',
  'Infusiones·Chai Latte': 'entry.1065577578',
  'Infusiones·Dirty Chai Latte': 'entry.1168160309',
  'Infusiones·Matcha': 'entry.1554122967',
  'Infusiones·Matcha Latte': 'entry.835074532',
  'Infusiones·Te / Infusiones': 'entry.1226494553',
  'Helados·Canasta Borde de Chocolate': 'entry.2029312108',
  'Helados·Canasta Galleta': 'entry.1070307350',
  'Helados·Cono': 'entry.231242410',
  'Croissant·Croissant Jamón & Queso': 'entry.1966509878',
  'Croissant·Napolitana Mix': 'entry.2059762459',
  'Croissant·Medialunas': 'entry.1631650113',
  'Croissant·Medialunas Rellenas': 'entry.348365888',
  'Croissant·Croissant Nutella': 'entry.346298056',
  'Pasteleria·Donas': 'entry.758999268',
  'Pasteleria·Muffin Rellenos': 'entry.1305833650',
  'Pasteleria·Brownie': 'entry.317955192',
  'Pasteleria·Brownie + Helado Soft': 'entry.324125969',
  'Sandwiches·Ciabatta Jamón, Queso y Rúcula': 'entry.510627187',
  'Waffle·Waffle Artesanal': 'entry.399686021',
  'Galletones·Chispas de Chocolate': 'entry.794951556',
  'Galletones·Chispas de Chocolate y Nutella': 'entry.1415206666',
  'Galletones·Chispas de Chocolate y Manjar': 'entry.1735352039'
};

// Productos con sabor: el sirope elegido define la fila del formulario
const FORM_FLAVOR_MAP = {
  'Cafe·Latte Sabores': {
    'Vainilla': 'entry.1438055912',
    'Caramelo': 'entry.332929509',
    'Canela': 'entry.1371644164',
    'Avellana': 'entry.685443826',
    'Amaretto': 'entry.558465260'
  },
  'Cafe·Capuchino Sabores': {
    'Vainilla': 'entry.1904768432',
    'Caramelo': 'entry.1073376551',
    'Canela': 'entry.461568723',
    'Avellana': 'entry.428676934'
  }
};

// La grilla del formulario solo acepta cantidades de 1 a 6
const FORM_MAX_QTY = 6;

function resolveFormEntry(cartLine) {
  const id = cartLine.item.id;
  if (FORM_FLAVOR_MAP[id]) {
    const chosen = Object.values(cartLine.choices || {}).flat();
    for (const value of chosen) {
      if (FORM_FLAVOR_MAP[id][value]) return FORM_FLAVOR_MAP[id][value];
    }
    // Sabor sin fila propia (ej. Capuchino Amaretto): va al capuchino simple
    return id === 'Cafe·Capuchino Sabores' ? FORM_GRID_MAP['Cafe·Capuchino'] : null;
  }
  return FORM_GRID_MAP[id] || null;
}

function buildGoogleFormUrl() {
  const entries = Object.values(state.cart);
  if (entries.length === 0) return GOOGLE_FORM_BASE;

  const params = new URLSearchParams();
  params.set('usp', 'pp_url');

  const detalles = [];
  const sinFila = [];
  let total = 0;

  entries.forEach((line) => {
    total += line.qty * line.unitPrice;

    const opciones = Object.values(line.choices || {})
      .filter((v) => v && v.length)
      .map((v) => v.join(', '))
      .join(' · ');

    const partes = [`${line.qty} × ${line.item.n}`];
    if (opciones) partes.push(opciones);
    if (line.note) partes.push(line.note);
    detalles.push(partes.join(' → '));

    const field = resolveFormEntry(line);
    if (!field) {
      sinFila.push(`${line.qty} × ${line.item.n}`);
      return;
    }

    const qty = Math.min(line.qty, FORM_MAX_QTY);
    params.append(field, String(qty));
    if (line.qty > FORM_MAX_QTY) {
      detalles.push(`(${line.item.n}: cantidad real ${line.qty})`);
    }
  });

  if (sinFila.length) {
    detalles.push(`No listados en la grilla: ${sinFila.join(' · ')}`);
  }
  detalles.push(`Modo de entrega: ${state.deliveryMode}`);
  detalles.push(`Total estimado: ${fmt(total)}`);

  params.set(FORM_FIELD_DETALLES, detalles.join('\n'));

  return `${GOOGLE_FORM_BASE}?${params.toString()}`;
}

// ----------------------------------------------------------------------------
// ENVIO DIRECTO AL LOCAL (API propia -> programa de Windows)
// ----------------------------------------------------------------------------
const API_PEDIDOS = 'api/crear_pedido.php';
const TOTAL_MESAS = 7;

// La mesa llega por el QR pegado en la mesa: index.html?mesa=3
// Se guarda en la sesion para que sobreviva recargas y navegacion interna.
const MESA_ACTUAL = (function () {
  var desdeUrl = parseInt(new URLSearchParams(location.search).get('mesa'), 10);
  if (desdeUrl >= 1 && desdeUrl <= TOTAL_MESAS) {
    try { sessionStorage.setItem('fiorella_mesa', String(desdeUrl)); } catch (e) {}
    return desdeUrl;
  }
  try {
    var guardada = parseInt(sessionStorage.getItem('fiorella_mesa'), 10);
    if (guardada >= 1 && guardada <= TOTAL_MESAS) return guardada;
  } catch (e) {}
  return null;
})();

function enMesa() {
  return MESA_ACTUAL !== null;
}

// ---------------------------------------------------------------------------
// UBICACION
// Los pedidos de mesa solo se aceptan cerca del local. Pedimos la ubicacion
// al navegador; si el cliente la niega, el pedido igual se manda pero llega
// marcado como "sin verificar" para que el local decida.
// ---------------------------------------------------------------------------
function obtenerUbicacion(timeoutMs) {
  return new Promise(function (resolve) {
    if (!navigator.geolocation || !window.isSecureContext) {
      resolve(null);
      return;
    }

    var resuelto = false;
    var terminar = function (valor) {
      if (!resuelto) { resuelto = true; resolve(valor); }
    };

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        terminar({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          precision: pos.coords.accuracy
        });
      },
      function () { terminar(null); },
      { enableHighAccuracy: true, timeout: timeoutMs || 8000, maximumAge: 60000 }
    );

    // Red de seguridad: nunca dejar al cliente esperando
    setTimeout(function () { terminar(null); }, (timeoutMs || 8000) + 1500);
  });
}

// En modo mesa: banner fijo arriba, modos de entrega bloqueados y textos adaptados.
function aplicarModoMesa() {
  if (!enMesa()) return;

  document.body.classList.add('modo-mesa');

  var banner = document.createElement('div');
  banner.className = 'mesa-banner';
  banner.innerHTML =
    '<span class="mesa-banner-icono">●</span>' +
    '<span>Estas pidiendo desde la <strong>Mesa ' + MESA_ACTUAL + '</strong></span>' +
    '<span class="mesa-banner-nota">Te lo llevamos a tu mesa</span>';
  document.body.appendChild(banner);

  // El modo de entrega lo define la mesa: se deja fijo
  state.deliveryMode = 'Mesa ' + MESA_ACTUAL;
  try { localStorage.setItem('fiorella_delivery_mode', state.deliveryMode); } catch (e) {}

  var grupoModos = document.querySelector('.tray-delivery-modes');
  if (grupoModos) {
    grupoModos.innerHTML =
      '<div class="tray-mesa-fija">Mesa ' + MESA_ACTUAL + '</div>';
  }

  var btnEnviar = document.getElementById('tray-send-btn');
  if (btnEnviar) {
    btnEnviar.querySelector('span').textContent = 'Enviar a cocina';
    btnEnviar.title = 'Enviar el pedido de la Mesa ' + MESA_ACTUAL + ' a la cocina';
  }

  // WhatsApp y formulario pierden sentido estando sentado en el local
  ['tray-form-btn', 'tray-whatsapp-btn'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  var callout = document.querySelector('.catalog-form-callout');
  if (callout) callout.style.display = 'none';
}

function construirPayloadPedido(cliente, telefono, ubicacion) {
  const entries = Object.values(state.cart);
  return {
    ubicacion: ubicacion || null,
    cliente: cliente || '',
    telefono: telefono || '',
    mesa: MESA_ACTUAL,
    modo: enMesa() ? ('Mesa ' + MESA_ACTUAL) : state.deliveryMode,
    nota: '',
    items: entries.map((line) => ({
      producto_id: line.item.id,
      nombre: line.item.n,
      cantidad: line.qty,
      precio_unit: line.unitPrice,
      opciones: Object.values(line.choices || {})
        .filter((v) => v && v.length)
        .map((v) => v.join(', ')),
      nota: line.note || ''
    }))
  };
}

window.enviarPedidoAlLocal = async function () {
  const entries = Object.values(state.cart);
  if (entries.length === 0) {
    alert('Tu bandeja esta vacia. Agrega productos antes de enviar el pedido.');
    return;
  }

  let cliente = '';
  let telefono = '';
  let ubicacion = null;

  // Capturamos el texto ANTES de tocarlo, si no lo restauramos mal despues
  const btn = document.getElementById('tray-send-btn');
  const etiqueta = btn ? btn.querySelector('span') : null;
  const textoOriginal = etiqueta ? etiqueta.textContent : '';

  if (enMesa()) {
    // Desde el QR de la mesa no pedimos datos: la mesa ya identifica al cliente
    if (!confirm('Enviar tu pedido a la cocina desde la Mesa ' + MESA_ACTUAL + '?')) return;

    if (btn) {
      btn.disabled = true;
      if (etiqueta) etiqueta.textContent = 'Verificando ubicacion...';
    }
    ubicacion = await obtenerUbicacion(8000);
  } else {
    cliente = (prompt('Tu nombre para el pedido:') || '').trim();
    if (!cliente) return;
    telefono = (prompt('Tu telefono o WhatsApp (para avisarte cuando este listo):') || '').trim();
  }

  if (btn) {
    btn.disabled = true;
    if (etiqueta) etiqueta.textContent = 'Enviando...';
  }

  try {
    const res = await fetch(API_PEDIDOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(construirPayloadPedido(cliente, telefono, ubicacion))
    });

    const data = await res.json().catch(() => ({}));

    if (res.status === 403 && data.motivo === 'fuera_de_rango') {
      alert(
        'No pudimos confirmar que estas en el local.\n\n' +
        'Los pedidos por mesa solo se toman desde la cafeteria. ' +
        'Si estas adentro y ves esto, avisale a alguien del local.'
      );
      return;
    }

    if (!res.ok || !data.ok) {
      throw new Error(data.error || 'No pudimos enviar el pedido');
    }

    const urlSeguimiento = new URL('estado.html', location.href).href +
      '?folio=' + encodeURIComponent(data.folio);

    // Guardamos el folio: si el cliente sale del seguimiento (o dice "no"),
    // puede volver a verlo desde la carta con el boton "Ver mi pedido"
    guardarUltimoPedido(data.folio);
    vaciarCarritoSilencioso();

    // En mesa no hay WhatsApp ni telefono: el seguimiento es la unica forma
    // de saber del pedido, asi que vamos directo sin preguntar
    if (enMesa()) {
      location.href = urlSeguimiento;
      return;
    }

    const verEstado = confirm(
      'Pedido enviado al local\n\n' +
      'Folio: ' + data.folio + '\n' +
      'Total: ' + fmt(data.total) + '\n\n' +
      'Puedes seguir tu pedido en vivo y te avisamos apenas este listo.\n' +
      'Quieres abrir el seguimiento ahora?'
    );

    if (verEstado) {
      location.href = urlSeguimiento;
    }
  } catch (err) {
    alert(
      'No pudimos enviar el pedido: ' + err.message + '\n\n' +
      'Puedes pedir por WhatsApp o por el formulario mientras tanto.'
    );
  } finally {
    if (btn) {
      btn.disabled = false;
      if (etiqueta) etiqueta.textContent = textoOriginal;
    }
  }
};

function generateOrderText() {
  const entries = Object.values(state.cart);
  if (entries.length === 0) return '';

  const mode = state.deliveryMode;
  let text = `*Pedido Fiorella — ${mode}*\n\n`;

  let total = 0;
  entries.forEach((it) => {
    const sub = it.qty * it.unitPrice;
    total += sub;

    const choiceList = [];
    Object.entries(it.choices || {}).forEach(([g, vals]) => {
      if (vals && vals.length) choiceList.push(vals.join(', '));
    });

    const details = choiceList.length > 0 ? ` (${choiceList.join(' · ')})` : '';
    const noteText = it.note ? ` — _${it.note}_` : '';

    text += `• ${it.qty} × ${it.item.n}${details}${noteText} · ${fmt(sub)}\n`;
  });

  text += `\n*Total:* ${fmt(total)}`;
  return text;
}

window.sendWhatsAppOrder = function() {
  const text = generateOrderText();
  if (!text) return;

  const phone = '56900000000';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');

  const btn = document.getElementById('tray-whatsapp-btn');
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span>Pedido Enviado ✓</span>`;
    setTimeout(() => {
      btn.innerHTML = originalText;
    }, 2600);
  }
};

window.copyOrderText = function() {
  const text = generateOrderText();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('tray-copy-btn');
    if (btn) {
      btn.textContent = '¡Copiado! ✓';
      setTimeout(() => { btn.textContent = 'Copiar detalle'; }, 2000);
    }
  });
};

// Vacia sin preguntar. Se usa despues de enviar el pedido: preguntarle al
// cliente si quiere vaciar cuando su pedido YA se mando es confuso, y si
// dice que no se arriesga a mandarlo dos veces.
function vaciarCarritoSilencioso() {
  state.cart = {};
  saveCart();
  renderCatalog();
  toggleTrayCart(false);
}

window.clearCart = function() {
  if (Object.keys(state.cart).length === 0) return;
  if (confirm('¿Deseas vaciar todos los productos del pedido?')) {
    vaciarCarritoSilencioso();
  }
};

window.setDeliveryMode = function(mode) {
  if (mode === 'Delivery') return;
  state.deliveryMode = mode;
  updateOrderTray();
};

// ----------------------------------------------------------------------------
// 8. CARTA DEL DÍA (ROTACIÓN AUTOMÁTICA)
// ----------------------------------------------------------------------------
function initFeatureCardRotation() {
  const categories = MENU_DATA;
  let currentIdx = 0;
  const kickerEl = document.getElementById('feat-kicker');
  const ghostEl = document.getElementById('feat-ghost');
  const titleEl = document.getElementById('feat-title');
  const metaEl = document.getElementById('feat-meta');
  const listEl = document.getElementById('feat-list');
  const pipsContainer = document.getElementById('feat-pips');

  if (!titleEl || !listEl || !pipsContainer) return;

  pipsContainer.innerHTML = categories.map((_, i) => `
    <button class="pip-mark ${i === 0 ? 'active' : ''}" onclick="setFeatureCategory(${i})" aria-label="Ir a sección ${i+1}"></button>
  `).join('');

  function renderFeature(idx) {
    currentIdx = idx;
    const cat = categories[idx];

    if (kickerEl) kickerEl.textContent = `0${idx + 1} / ${cat.note.toUpperCase()}`;
    if (ghostEl) ghostEl.textContent = cat.kicker;
    if (titleEl) titleEl.textContent = cat.name;
    if (metaEl) metaEl.textContent = `${cat.items.length} preparaciones`;

    listEl.innerHTML = cat.items.slice(0, 4).map((it) => `
      <div class="feat-row">
        <div class="feat-row-top">
          <span class="feat-name">${it.n}</span>
          <span class="feat-dots"></span>
          <span class="feat-price">$${it.p}</span>
        </div>
        ${it.d ? `<div class="feat-desc">${it.d}</div>` : ''}
      </div>
    `).join('');

    const pips = pipsContainer.querySelectorAll('.pip-mark');
    pips.forEach((p, i) => {
      if (i === idx) p.classList.add('active');
      else p.classList.remove('active');
    });
  }

  window.setFeatureCategory = renderFeature;
  renderFeature(0);

  let timer = setInterval(() => {
    const next = (currentIdx + 1) % categories.length;
    renderFeature(next);
  }, 5000);

  const card = document.getElementById('feature-card');
  if (card) {
    card.addEventListener('mouseenter', () => clearInterval(timer));
    card.addEventListener('mouseleave', () => {
      timer = setInterval(() => {
        const next = (currentIdx + 1) % categories.length;
        renderFeature(next);
      }, 5000);
    });
  }
}

// ----------------------------------------------------------------------------
// 9. EVENT LISTENERS Y INICIALIZACIÓN
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initScrollytelling();
  initFeatureCardRotation();

  const searchInput = document.getElementById('catalog-search-input');
  const searchClear = document.getElementById('search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (searchClear) searchClear.style.display = state.searchQuery ? 'block' : 'none';
      renderCatalog();
    });
  }

  if (searchClear && searchInput) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      searchClear.style.display = 'none';
      renderCatalog();
    });
  }

  const pills = document.querySelectorAll('.category-chip-btn');
  pills.forEach((btn) => {
    btn.addEventListener('click', () => {
      pills.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.getAttribute('data-cat-key');
      renderCatalog();
    });
  });

  const modal = document.getElementById('sheet-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSheet();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSheet();
  });

  renderCatalog();
  initReelsAutoplay();
});

// ----------------------------------------------------------------------------
// 10. REELS EN VIVO: AUTOPLAY EN MUTE Y CONTROL INTELIGENTE DE AUDIO
// ----------------------------------------------------------------------------
function initReelsAutoplay() {
  const reelVideos = document.querySelectorAll('.reel-video');
  reelVideos.forEach((v) => {
    v.muted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for strict browser autoplay
        const startOnScroll = () => {
          v.play();
          window.removeEventListener('scroll', startOnScroll);
          window.removeEventListener('click', startOnScroll);
        };
        window.addEventListener('scroll', startOnScroll, { passive: true });
        window.addEventListener('click', startOnScroll, { passive: true });
      });
    }
  });
}

window.toggleReelSound = function(card) {
  const video = card.querySelector('.reel-video');
  if (!video) return;

  const iconMuted = card.querySelector('.icon-muted');
  const iconUnmuted = card.querySelector('.icon-unmuted');
  const isCurrentlyMuted = video.muted;

  // Si vamos a activar el audio en este video, silenciar todos los demás
  if (isCurrentlyMuted) {
    document.querySelectorAll('.reel-card').forEach((otherCard) => {
      if (otherCard !== card) {
        const otherVid = otherCard.querySelector('.reel-video');
        if (otherVid) otherVid.muted = true;
        otherCard.classList.remove('is-unmuted');
        const oMuted = otherCard.querySelector('.icon-muted');
        const oUnmuted = otherCard.querySelector('.icon-unmuted');
        if (oMuted) oMuted.style.display = 'block';
        if (oUnmuted) oUnmuted.style.display = 'none';
      }
    });

    video.muted = false;
    video.volume = 1.0;
    if (video.paused) video.play();
    card.classList.add('is-unmuted');
    if (iconMuted) iconMuted.style.display = 'none';
    if (iconUnmuted) iconUnmuted.style.display = 'block';
  } else {
    // Silenciar este video
    video.muted = true;
    card.classList.remove('is-unmuted');
    if (iconMuted) iconMuted.style.display = 'block';
    if (iconUnmuted) iconUnmuted.style.display = 'none';
  }
};



// ---------------------------------------------------------------------------
// ULTIMO PEDIDO
// El folio queda guardado en el telefono para volver al seguimiento desde la
// carta. estado.html lo borra cuando el pedido se entrega o se cancela.
// ---------------------------------------------------------------------------
const CLAVE_ULTIMO_PEDIDO = 'fiorella_ultimo_pedido';
const VIGENCIA_ULTIMO_PEDIDO_MS = 8 * 60 * 60 * 1000;

function guardarUltimoPedido(folio) {
  try {
    localStorage.setItem(CLAVE_ULTIMO_PEDIDO, JSON.stringify({ folio: folio, t: Date.now() }));
  } catch (e) {}
}

function leerUltimoPedido() {
  try {
    var d = JSON.parse(localStorage.getItem(CLAVE_ULTIMO_PEDIDO) || 'null');
    if (d && d.folio && Date.now() - d.t < VIGENCIA_ULTIMO_PEDIDO_MS) return d.folio;
  } catch (e) {}
  return null;
}

function mostrarBotonMiPedido() {
  var folio = leerUltimoPedido();
  if (!folio || document.getElementById('btn-mi-pedido')) return;

  var a = document.createElement('a');
  a.id = 'btn-mi-pedido';
  a.href = 'estado.html?folio=' + encodeURIComponent(folio);
  a.textContent = 'Ver mi pedido · ' + folio;
  a.style.cssText =
    'position:fixed;left:16px;z-index:25;' +
    'bottom:calc(18px + env(safe-area-inset-bottom));' +
    'padding:9px 18px;border-radius:999px;background:#1a1208;color:#f5e6c8;' +
    'font:600 13px/1.2 system-ui,sans-serif;text-decoration:none;white-space:nowrap;' +
    'box-shadow:0 6px 18px rgba(0,0,0,.25);';
  document.body.appendChild(a);
}

function alCargar() {
  aplicarModoMesa();
  mostrarBotonMiPedido();
}

// Activar modo mesa al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', alCargar);
} else {
  alCargar();
}
