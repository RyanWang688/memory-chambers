(function () {
  const $ = (id) => document.getElementById(id);
  const INK = '#16181a', RED = '#8e1b1b', MUST = '#d6a13a', MINT = '#6cc4a4', WALL = '#ebe6db', PAPER = '#f4f1ea';

  /* ---- player sizes against a room height ---- */
  const sizes = [
    { k: 'L', r: '¾ room', f: 0.75, t: 'Strong enough to pull the Outworld lever and push buildings in Room Work.' },
    { k: 'S', r: '¼ room', f: 0.25, t: 'Climbs shelves and crosses the fallen book bridge in Room Life.' },
    { k: 'XS', r: '⅛ room', f: 0.125, t: 'Drops through the skylight. A desk becomes a mountain.' },
  ];
  function person(h, x, base) {
    const head = h * 0.14, body = h - head;
    return `<g fill="${INK}"><circle cx="${x}" cy="${base - body - head / 2}" r="${head / 2}"/><rect x="${x - h * 0.08}" y="${base - body}" width="${h * 0.16}" height="${body}" rx="${h * 0.05}"/></g>`;
  }
  $('sizes').innerHTML = sizes.map(s => {
    const H = 52, h = H * s.f;
    return `<div class="size"><span class="k">${s.k}</span>
      <svg viewBox="0 0 160 56" aria-hidden="true"><rect x="40" y="2" width="80" height="52" fill="${PAPER}" stroke="${INK}" stroke-width="2"/>
      <line x1="40" y1="54" x2="120" y2="54" stroke="${INK}" stroke-width="3"/>${person(h, 80, 54)}</svg>
      <span class="r">${s.r} tall</span><p>${s.t}</p></div>`;
  }).join('');

  /* ---- isometric cube clusters for the scope story ---- */
  const C = 0.866;
  function cube(cx, cy, s, fill, label, dashed) {
    const p = (x, y) => `${(cx + x).toFixed(1)},${(cy + y).toFixed(1)}`;
    const top = [p(0, -s), p(s * C, -s / 2), p(0, 0), p(-s * C, -s / 2)].join(' ');
    const left = [p(-s * C, -s / 2), p(0, 0), p(0, s), p(-s * C, s / 2)].join(' ');
    const right = [p(s * C, -s / 2), p(0, 0), p(0, s), p(s * C, s / 2)].join(' ');
    const d = dashed ? ' stroke-dasharray="3 3"' : '';
    const o = dashed ? ' fill-opacity=".25"' : '';
    return `<g stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"${d}>
      <polygon points="${top}" fill="${fill[0]}"${o}/><polygon points="${left}" fill="${fill[1]}"${o}/><polygon points="${right}" fill="${fill[2]}"${o}/></g>` +
      (label ? `<text x="${cx}" y="${cy + s + 15}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="${INK}">${label}</text>` : '');
  }
  const cream = [WALL, '#d9d2c3', '#c6bead'], red = ['#b23a2e', RED, '#6a1414'], must = ['#e8bd62', MUST, '#a87a22'], mint = ['#9adbc2', MINT, '#3f8f73'];
  function svg(w, h, body) { return `<svg viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`; }

  // v0: centre + M1–M4 around, Exit above, Junk below (drawn back-to-front)
  const s = 18, g = s * 2 * C;
  let v0 = '';
  v0 += cube(110, 30, s, cream, '');                       // Exit (top)
  v0 += cube(110 - g, 60, s, cream, ''); v0 += cube(110 + g, 60, s, cream, '');
  v0 += cube(110, 66, s, must, '');                        // Centre
  v0 += cube(110 - g, 90, s, cream, ''); v0 += cube(110 + g, 90, s, cream, '');
  v0 += cube(110, 110, s, cream, '');                      // Junk (bottom)
  v0 += `<text x="110" y="150" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="${INK}">Centre · M1–M4 · Exit · Junk</text>`;
  $('scope7').innerHTML = svg(220, 156, v0);

  // 7 → 3 → 2
  let v2 = '';
  const row = (x, n, fills, labels, cut) => fills.map((f, i) => cube(x + i * (s * 2 + 6), 52, s, f, labels[i], cut === i)).join('');
  v2 += row(26, 7, [], []);
  v2 += [0, 1, 2, 3, 4, 5, 6].map(i => cube(24 + (i % 4) * 26, i < 4 ? 30 : 66, 11, cream, '')).join('');
  v2 += `<text x="62" y="108" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="${INK}">v0 · 7</text>`;
  v2 += `<text x="140" y="56" font-family="Patrick Hand, cursive" font-size="22" fill="${RED}">→</text>`;
  v2 += cube(186, 50, 16, red, '') + cube(222, 50, 16, must, '') + cube(258, 50, 16, mint, '');
  v2 += `<text x="222" y="108" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="${INK}">v2 · Life Work Childhood</text>`;
  v2 += `<text x="290" y="56" font-family="Patrick Hand, cursive" font-size="22" fill="${RED}">→</text>`;
  v2 += cube(336, 50, 16, red, '') + cube(372, 50, 16, must, '') + cube(408, 50, 16, mint, '', true);
  v2 += `<line x1="394" y1="34" x2="422" y2="66" stroke="${RED}" stroke-width="3"/>`;
  v2 += `<text x="372" y="108" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" fill="${INK}">v3 · Life Work</text>`;
  $('scope3').innerHTML = svg(440, 116, v2);

  /* ---- survey bars ---- */
  const Q = [
    ['Q1', 'Control & interaction', 3.0, 'Mouse movement felt intuitive, but most tests ran on a Mac trackpad, which made it hard. → Recommend a physical mouse.'],
    ['Q2', 'Technical performance', 3.6, 'Players walked into hidden areas and objects; jump and climb animations unfinished. → Walkable areas and climb animations fixed.'],
    ['Q3', 'Gameplay clarity', 3.5, 'Half couldn\'t tell how to progress without the trailer. → Intro UI page added before play.'],
    ['Q4', 'Narrative: time in Work', 3.5, 'The moon/building time transition was incomplete. → Background change and story dialogue UI.'],
    ['Q5', 'Level design', 4.0, 'Bedroom and workplace layouts looked natural. Met target.'],
    ['Q6', 'Narrative: rooms connect', 3.5, 'Without the backstory, rooms and interactions felt random. → Story dialogue UI.'],
    ['Q7', 'Visual design', 4.0, 'Visuals decent and simple; limited to three small spaces. Met target.'],
    ['Q8', 'Audio design', 4.0, 'Music felt natural and comfortable. Met target.'],
    ['Q9', 'Overall experience', 3.9, 'Playable but very hard. → Glow and outline hints added.'],
    ['Q10', 'Engagement', 4.0, 'Wanted more excitement and object interactions. Met target.'],
  ];
  const GOAL = 4.0;
  $('bars').innerHTML = Q.map(([q, label, v, tip]) =>
    `<div class="row${v < GOAL ? ' low' : ''}" tabindex="0">
      <span class="lbl"><small>${q}</small>${label}</span>
      <span class="track"><span class="fill" style="width:${v / 5 * 100}%"></span><span class="goal" style="left:${GOAL / 5 * 100}%"></span></span>
      <span class="val">${v.toFixed(1)}</span>
      <span class="tip" role="tooltip">${tip}</span>
    </div>`).join('') +
    `<div class="legend"><span><i style="background:#2f6f5c"></i>met 4.0 target</span><span><i style="background:${MUST}"></i>below target</span><span><i style="border-left:2px dashed ${RED};width:0;border-radius:0"></i>target 4.0 / 5</span></div>`;

  /* ---- lightbox for sketches and references ---- */
  const lb = $('lightbox'), lbImg = $('lightboxImg');
  document.querySelectorAll('.zoomable').forEach(b => b.addEventListener('click', () => {
    const img = b.querySelector('img');
    lbImg.src = b.dataset.full; lbImg.alt = img ? img.alt : '';
    if (lb.showModal) lb.showModal(); else window.open(b.dataset.full, '_blank');
  }));
  $('lightboxClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });

  /* ---- load the game on demand ---- */
  $('startGame').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'play/';
    f.title = 'Memory Chambers — playable WebGL build';
    f.allow = 'fullscreen; autoplay';
    f.allowFullscreen = true;
    $('stage').innerHTML = '';
    $('stage').appendChild(f);
    f.addEventListener('load', () => { try { f.focus(); } catch (e) {} });
  });
})();
