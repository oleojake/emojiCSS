(() => {
  const { emojis, categories, version } = window.EMOJICSS;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const byE = Object.fromEntries(emojis.map((d) => [d.e, d]));
  const slotted = emojis.filter((d) => d.slot).length;

  document.querySelectorAll('[data-count]').forEach((el) => (el.textContent = emojis.length));
  document.querySelectorAll('[data-version]').forEach((el) => (el.textContent = version));
  const more = $('.engine .code .c:last-of-type');
  if (more) more.textContent = `/* …and ${slotted - 3} more */`;

  // ── Copy ──────────────────────────────────────────────
  const toast = $('#toast');
  let toastTimer;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }
  async function copy(text, btn, label = 'Copied') {
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
      ta.remove();
    }
    if (ok) {
      say(`${label} ${text.length < 12 ? text : ''}`.trim());
      if (btn) {
        const prev = btn.textContent;
        btn.textContent = 'Done!'; btn.classList.add('done');
        setTimeout(() => { btn.textContent = prev; btn.classList.remove('done'); }, 1400);
      }
    } else {
      say('Could not copy: select the text and press Ctrl+C');
    }
  }
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-copy]');
    if (!btn) return;
    const src = btn.dataset.copy;
    const target = src.startsWith('#') ? $(src) : null;
    const text = target ? (target.value ?? target.textContent) : src;
    copy(text, btn);
  });

  // ── Single-emoji demo ─────────────────────────────────────
  // Modifiers and some utilities do nothing on their own, so they are demoed with 🔄.
  const COMBO = { '🧊': '🔄', '🧼': '🔄', '⏸️': '🔄', '👆': '🔄', '⏪': '🙃', '🔁': '🎈', '⏳': '🏀', '⌛': '🏀', '1️⃣': '🏀', '3️⃣': '🏀', '♾️': '💥' };
  const STICKER_TONE = ['', 'alt', 'sun', 'mint'];
  function demoEl(d, i = 0) {
    const cls = d.cat === 'mod' || COMBO[d.e] ? `${COMBO[d.e] || '🔄'} ${d.e}` : d.e;
    if (d.demo === 'word') return `<span class="word ${cls}">${esc(d.text)}</span>`;
    if (d.demo === 'button') return `<span class="btn-demo ${cls}">${esc(d.text)}</span>`;
    const glyph = d.cat === 'mod' ? (COMBO[d.e] || '🔄') : d.e;
    return `<span class="sticker ${STICKER_TONE[i % 4]} ${cls}">${glyph}</span>`;
  }

  // ── Hero stage ───────────────────────────────────
  const SHOWCASE = [
    ['🔄 🌈', '<span class="sticker">🔄</span>', 'Spins and changes color. Two classes, two properties, zero conflicts.'],
    ['🪄 🦄', 'AI-powered', 'Sparkles and a gradient: the recipe for every AI landing page.'],
    ['🔥 🫨', '500 Internal Server Error', 'Incident comms with the appropriate sense of urgency.'],
    ['🍮', '<span class="sticker alt">🍮</span>', 'Jelly physics applied to your architecture.'],
    ['🕶️', 'Yes, they are emojis', 'Deal with it.'],
    ['📈 🦄', '+340% ARR', 'Vanity metrics, now animated.'],
    ['🎉', '<span class="btn-demo">Deploy OK</span>', 'Celebrate the pipeline passing on the third try.'],
    ['👾', 'ERROR 418', 'I\'m a teapot. With glitch.'],
    ['🏀 💓 🌈 🐇', '<span class="sticker sun">🤯</span>', 'Four classes at once, and one of them speeds everything up.'],
    ['💤', '2-hour meeting', 'Could have been an email.'],
  ];
  let stageIndex = -1;
  const stageArea = $('#stage-area'), stageCode = $('#stage-code'), stageCaption = $('#stage-caption');
  function nextStage() {
    stageIndex = (stageIndex + 1) % SHOWCASE.length;
    const [cls, inner, caption] = SHOWCASE[stageIndex];
    const isEl = inner.startsWith('<span');
    const html = isEl ? inner.replace('class="', `class="${cls} `) : `<span class="word ${cls}">${inner}</span>`;
    stageArea.innerHTML = html;
    const content = inner.replace(/<[^>]+>/g, '');
    const tag = inner.includes('btn-demo') ? 'button' : isEl ? 'div' : 'h1';
    stageCode.textContent = `<${tag} class="${cls}">${content}</${tag}>`;
    stageCaption.textContent = caption;
  }
  nextStage();
  let stageTimer = setInterval(nextStage, 4200);
  $('#stage-next').addEventListener('click', () => { clearInterval(stageTimer); nextStage(); stageTimer = setInterval(nextStage, 4200); });

  // ── Builder ──────────────────────────────────────────
  const keys = $('#builder-keys'), stage = $('#builder-stage'), code = $('#builder-code'), text = $('#builder-text');
  const picked = new Set(['🔄', '🌈']);
  keys.innerHTML = categories.map((c) => `
    <div class="key-group">
      <h3>${c.label}</h3>
      <div class="key-row">${emojis.filter((d) => d.cat === c.id).map((d) =>
        `<button class="key" type="button" data-e="${d.e}" aria-pressed="false" title="${d.name}">${d.e}</button>`).join('')}</div>
    </div>`).join('');
  function renderBuilder() {
    const list = emojis.filter((d) => picked.has(d.e)).map((d) => d.e);
    const cls = list.join(' ');
    const t = text.value.trim() || 'Hello, production';
    stage.className = 'builder-stage ' + cls;
    stage.textContent = t;
    // Restart one-shot animations
    stage.style.animation = 'none'; void stage.offsetWidth; stage.style.animation = '';
    code.textContent = `<div class="${cls}">${t}</div>`;
    keys.querySelectorAll('.key').forEach((k) => k.setAttribute('aria-pressed', picked.has(k.dataset.e)));
  }
  keys.addEventListener('click', (ev) => {
    const k = ev.target.closest('.key');
    if (!k) return;
    const e = k.dataset.e;
    if (picked.has(e)) { picked.delete(e); } else {
      // Only one class per slot can win, so picking a new one replaces the old one.
      const d = byE[e];
      if (d.slot) emojis.forEach((o) => { if (o.slot === d.slot) picked.delete(o.e); });
      if (d.cat === 'fx') emojis.forEach((o) => { if (o.cat === 'fx') picked.delete(o.e); });
      picked.add(e);
    }
    renderBuilder();
  });
  text.addEventListener('input', renderBuilder);
  $('#builder-clear').addEventListener('click', () => { picked.clear(); renderBuilder(); });
  renderBuilder();

  // ── Catalog ─────────────────────────────────────────────
  const catalog = $('#catalog');
  catalog.innerHTML = categories.map((c) => `
    <section class="cat-block" data-cat="${c.id}">
      <div class="cat-head"><h3>${c.label}</h3><p>${c.blurb}</p></div>
      <div class="grid">${emojis.filter((d) => d.cat === c.id).map((d, i) => `
        <article class="card" data-e="${d.e}">
          <button class="card-demo" type="button" aria-label="Replay the ${d.name} demo">${demoEl(d, i)}</button>
          <div class="card-meta">
            <span class="kc" aria-hidden="true">${d.e}</span>
            <span class="card-name"><strong>.${d.e}</strong>${d.name}</span>
            <button class="copy" type="button" data-copy="${d.e}" aria-label="Copy the ${d.name} class">Copy</button>
          </div>
          <p class="card-desc">${d.desc}</p>
        </article>`).join('')}</div>
    </section>`).join('');
  catalog.addEventListener('click', (ev) => {
    const demo = ev.target.closest('.card-demo');
    if (!demo) return;
    const d = byE[demo.closest('.card').dataset.e];
    demo.innerHTML = demoEl(d, [...demo.closest('.grid').children].indexOf(demo.closest('.card')));
  });

  // ── Editable examples ───────────────────────────────────
  const EXAMPLES = [
    {
      title: 'The CTA your PM has been asking for for three sprints',
      note: 'It beats and sparkles. Conversion goes up, dignity goes down.',
      html: `<button class="btn 💓 🪄">Start for free*</button>
<small>*For 14 days. Then $49/month per seat.</small>`,
    },
    {
      title: 'Production error page',
      note: 'Conveys the severity of the situation without anyone reading the stack trace.',
      html: `<h3 class="🔥 🫨">500 Internal Server Error</h3>
<p class="🤡">We've notified an intern. They're on it.</p>`,
    },
    {
      title: 'The board meeting slide',
      note: 'The good news rises and shines. The bad news falls slowly so nobody notices.',
      html: `<p>Revenue <strong class="📈 🦄">+340%</strong></p>
<p>Profit <strong class="📉 🐌">-98%</strong></p>`,
    },
    {
      title: 'Friday deploy at 5:59 PM',
      note: 'A siren on the branch name, and a candle just in case.',
      html: `<code class="📟">$ git push --force origin <span class="🚨 ⚡">main</span></code>
<p class="🕯️">Whatever happens, happens.</p>`,
    },
    {
      title: 'Composition: four animations on one element',
      note: 'Each class animates a different property, so they add up. Try removing one.',
      html: `<div class="sticker 🔄 🏀 💓 🌈">🤯</div>`,
    },
    {
      title: 'Modifiers: hover only, at different speeds',
      note: '👆 is Tailwind\'s hover:. 🐇 speeds up, 🐌 slows down.',
      html: `<span class="sticker 👆 🐇 🔄">🐇</span>
<span class="sticker alt 👆 🐌 🍮">🐌</span>`,
    },
    {
      title: 'AI startup, Series A',
      note: 'Gradient, sparkles and a cursor that looks like it is thinking.',
      html: `<h3>Powered by <span class="🦄 🪄">AI</span></h3>
<p class="🤖">Generating a convincing answer</p>`,
    },
  ];
  $('#examples').innerHTML = EXAMPLES.map((x, i) => `
    <article class="example">
      <div class="example-head"><h3>${x.title}</h3><p>${esc(x.note)}</p></div>
      <div class="example-code">
        <label class="visually-hidden" for="ex-${i}">Example code: ${x.title}</label>
        <textarea id="ex-${i}" spellcheck="false" autocapitalize="off" autocomplete="off">${esc(x.html)}</textarea>
        <button class="copy" type="button" data-copy="#ex-${i}">Copy</button>
      </div>
      <div class="example-result" id="ex-${i}-out">${x.html}</div>
    </article>`).join('');
  document.querySelectorAll('.example textarea').forEach((ta) => {
    const fit = () => { ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px'; };
    ta.addEventListener('input', () => { $(`#${ta.id}-out`).innerHTML = ta.value; fit(); });
    requestAnimationFrame(fit);
  });
})();
