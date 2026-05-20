// sato 解读 · 主交互脚本
// =====================================================================
// 1. 阅读进度条 / 章节进度高亮
// 2. 移动端目录抽屉
// 3. 铸造曲线（与 sat0.org 官网视觉一致）
//    - 左 y 轴 supply (0 → 21m)，右 y 轴 price ($0 → ∞)
//    - 顶端两侧均显示 ∞，X 轴右端显示 ∞
//    - 实心绿点 = 当前真实供应（real / mintedFair）
//    - 空心绿圈 = forward（曲线公式在 ethCum 处对应的供应）
//    - 底部粉点 = burn 价、绿点 = mint 价
//    - 拖动 / 触摸 sliding cursor 探索曲线
// 4. 实时数据：/api/market/curve、/api/market/eth-usd、/api/market/fair-price
// =====================================================================

(function () {
  'use strict';

  // 让 .js 章节动画 CSS 仅在脚本可用时生效
  document.documentElement.classList.add('js');

  // ---------- i18n 双语切换 ----------
  const SUPPORTED = ['zh', 'en'];
  function detectLang() {
    const saved = localStorage.getItem('sato-lang');
    if (saved && SUPPORTED.includes(saved)) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    return nav.startsWith('zh') ? 'zh' : 'en';
  }
  let LANG = detectLang();
  const dict = () => (window.I18N && window.I18N[LANG]) || {};

  function applyI18n() {
    const D = dict();
    document.documentElement.lang = LANG === 'en' ? 'en' : 'zh-CN';
    document.documentElement.classList.toggle('lang-en', LANG === 'en');
    document.documentElement.classList.toggle('lang-zh', LANG === 'zh');

    // 文本节点
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = D[key];
      if (val == null) return;
      // pre 标签保留换行；其他用 innerHTML 以便支持内联标签
      const attrTarget = el.getAttribute('data-i18n-attr');
      if (attrTarget) {
        el.setAttribute(attrTarget, val);
      } else if (el.tagName === 'PRE' || el.tagName === 'TITLE') {
        el.textContent = val;
      } else {
        el.innerHTML = val;
      }
    });

    // 切换按钮的显示
    const active = document.getElementById('langActive');
    const other  = document.getElementById('langOther');
    if (active && other) {
      active.textContent = LANG === 'zh' ? '中' : 'EN';
      other.textContent  = LANG === 'zh' ? 'EN' : '中';
    }
  }

  function setLang(next) {
    if (!SUPPORTED.includes(next)) return;
    LANG = next;
    localStorage.setItem('sato-lang', next);
    applyI18n();
    // i18n 更新后，章节标识需重算（章节名翻译了）
    if (typeof updateProgress === 'function') updateProgress();
  }

  // 等 DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyI18n, { once: true });
  } else {
    applyI18n();
  }
  // 切换按钮
  document.addEventListener('click', (e) => {
    const t = e.target.closest('#langToggle');
    if (!t) return;
    setLang(LANG === 'zh' ? 'en' : 'zh');
  });

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // ---------- 数学常量（白皮书参数）----------
  const K = 21_000_000;       // 渐近上限 21m
  const S = 500;              // 衰减常数 500 ETH
  const FEE = 0.003;          // 0.3% 协议费

  function qFwd(e) { return K * (1 - Math.exp(-e / S)); }      // forward 供应
  function priceETH(e) { return (S / K) * Math.exp(e / S); }   // mint 边际价
  function eFromQ(q) {                                          // 反向：q → e
    return -S * Math.log(Math.max(1e-15, 1 - q / K));
  }

  // ---------- 数字格式 ----------
  function fmtSupply(n) {
    if (!isFinite(n)) return '∞';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'm';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
    return n.toFixed(0);
  }
  function fmtUsd(n) {
    if (!isFinite(n) || n <= 0) return '$0.00';
    if (n >= 1000) return '$' + n.toFixed(0);
    if (n >= 10) return '$' + n.toFixed(2);
    if (n >= 0.01) return '$' + n.toFixed(4);
    return '$' + n.toExponential(2);
  }
  function fmtEth(n) {
    if (!isFinite(n)) return '∞';
    if (n >= 1) return n.toFixed(2) + ' ETH';
    if (n >= 0.001) return n.toFixed(4) + ' ETH';
    return n.toExponential(2) + ' ETH';
  }

  // ---------- 阅读进度条 + 章节高亮 ----------
  const progressFill = $('#progressFill');
  const sideLinks = $$('.side-nav a, .drawer-list a');
  const sideTargets = sideLinks.map(a => $(a.getAttribute('href')));

  function updateProgress() {
    const sTop = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    const r = dh > 0 ? Math.min(1, Math.max(0, sTop / dh)) : 0;
    if (progressFill) progressFill.style.width = (r * 100).toFixed(2) + '%';

    const ref = window.scrollY + window.innerHeight * 0.32;
    let active = 0;
    sideTargets.forEach((sec, i) => {
      if (sec && sec.offsetTop <= ref) active = i;
    });
    sideLinks.forEach((link, i) => {
      link.classList.toggle('active', i === active);
      link.classList.toggle('visited', i < active);
    });

    // 移动端章节标识
    const mobileLabel = $('#chapterPillLabel');
    if (mobileLabel) {
      const items = $$('.side-nav a');
      const cur = items[active];
      if (cur) {
        const num = cur.querySelector('.step-num')?.textContent || '00';
        const name = cur.querySelector('.step-name')?.textContent || '';
        mobileLabel.textContent = `${num} · ${name}`;
      }
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  // ---------- 移动端目录抽屉 ----------
  const drawerBtn = $('#chapterPill');
  const drawer = $('#drawer');
  const drawerClose = $('#drawerClose');
  function openDrawer() { drawer?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeDrawer() { drawer?.classList.remove('open'); document.body.style.overflow = ''; }
  drawerBtn?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });
  $$('.drawer-list a').forEach(a => a.addEventListener('click', closeDrawer));

  // ---------- 实时数据 ----------
  const API_BASE = 'https://sat0.org';
  // 兜底（用于离线 / 接口失败时仍显示合理图像）
  const FALLBACK = {
    ethCum: 1436.5,
    mintedFair: 18_365_974,
    totalSupply: 18_365_974,
    ethUsd: 2104,
    priceUsd: 0.4318,
  };
  let LIVE = { ...FALLBACK, _live: false };

  async function loadLive() {
    const get = (u) => fetch(API_BASE + u, { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject(r.status));
    try {
      const [curve, ethUsd, fair] = await Promise.allSettled([
        get('/api/market/curve'),
        get('/api/market/eth-usd'),
        get('/api/market/fair-price'),
      ]);
      const next = { ...LIVE };
      if (curve.status === 'fulfilled') {
        // ethCum / totalMintedFair / totalSupply 为 wei 字符串（18 decimals）
        const c = curve.value;
        const e18 = (s) => Number(BigInt(s)) / 1e18;
        next.ethCum = e18(c.ethCum);
        next.mintedFair = e18(c.totalMintedFair);
        next.totalSupply = e18(c.totalSupply);
        next._live = true;
      }
      if (ethUsd.status === 'fulfilled' && ethUsd.value?.usd) {
        next.ethUsd = ethUsd.value.usd;
      }
      if (fair.status === 'fulfilled' && fair.value?.priceUsd) {
        next.priceUsd = fair.value.priceUsd;
      }
      LIVE = next;
      const dot = $('#liveDot');
      if (dot && next._live) {
        dot.classList.add('live');
        dot.title = '实时数据已加载';
      }
    } catch (_) { /* keep fallback */ }
    cursorE = LIVE.ethCum;
    rerenderAll();
  }

  // ---------- SVG 曲线 ----------
  const svg = $('#curveChart');
  const VW = 760, VH = 380;
  const PAD = { l: 56, r: 64, t: 24, b: 38 };
  const PW = VW - PAD.l - PAD.r;   // 绘图区宽
  const PH = VH - PAD.t - PAD.b;   // 绘图区高
  const E_VIEW = 3000;             // 视图最右端的 e（视觉上对应 ∞）

  function ex(e) { return PAD.l + (e / E_VIEW) * PW; }
  function yQ(supply) { return PAD.t + PH - (supply / K) * PH; }

  // 价格 y 轴：直接用公式 priceETH(e) × ETH_USD（不用 fair-price API 作基准，
  // 因为 fair-price 是 V4 池中性价 ≈ burn 与 mint 的几何均值，会让 mint = fair）
  function priceUsdAt(e) {
    return priceETH(e) * LIVE.ethUsd;
  }
  let PRICE_MAX = priceUsdAt(E_VIEW);
  function yP(usd) { return PAD.t + PH - (usd / PRICE_MAX) * PH; }

  // 取当前状态（基于 cursorE）
  let cursorE = FALLBACK.ethCum;
  function snapshot() {
    const fwdQ = qFwd(cursorE);
    // 漂移：实时数据时用真实漂移；否则按观察到的 ~7%
    const driftFrac = LIVE._live
      ? Math.max(0, 1 - (LIVE.mintedFair / qFwd(LIVE.ethCum)))
      : 0.072;
    const realQ = fwdQ * (1 - driftFrac);
    const eReal = eFromQ(realQ);
    const mintUsd = priceUsdAt(cursorE);                 // forward 边际价
    const burnUsd = priceUsdAt(eReal) * (1 - FEE);       // real 位置 × (1 - 0.3% fee)
    return { e: cursorE, fwdQ, realQ, eReal, drift: fwdQ - realQ, mintUsd, burnUsd };
  }

  function svgEl(tag, attrs, inner = '') {
    const a = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ');
    return `<${tag} ${a}>${inner}</${tag}>`;
  }

  function buildCurvePath(yFn, getY) {
    const N = 220;
    let d = '';
    for (let i = 0; i <= N; i++) {
      const e = (i / N) * E_VIEW;
      const x = ex(e).toFixed(2);
      const y = yFn(getY(e)).toFixed(2);
      d += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
    }
    return d.trim();
  }
  function buildAreaPath() {
    const N = 220;
    let d = `M${ex(0).toFixed(2)},${(PAD.t + PH).toFixed(2)} `;
    for (let i = 0; i <= N; i++) {
      const e = (i / N) * E_VIEW;
      d += `L${ex(e).toFixed(2)},${yQ(qFwd(e)).toFixed(2)} `;
    }
    d += `L${ex(E_VIEW).toFixed(2)},${(PAD.t + PH).toFixed(2)} Z`;
    return d.trim();
  }

  function renderChart() {
    if (!svg) return;
    PRICE_MAX = priceUsdAt(E_VIEW);
    const st = snapshot();
    let h = '';

    // 边框
    h += svgEl('rect', {
      x: PAD.l - 0.5, y: PAD.t - 0.5,
      width: PW + 1, height: PH + 1,
      fill: 'none', stroke: '#27272a', 'stroke-width': '1'
    });

    // 横向网格
    [5e6, 10e6, 15e6, 20e6].forEach(t => {
      const y = yQ(t).toFixed(2);
      h += svgEl('line', {
        x1: PAD.l, x2: PAD.l + PW, y1: y, y2: y,
        stroke: '#1f1f23', 'stroke-width': 1, 'stroke-dasharray': '2 4'
      });
    });

    // 左 y 轴刻度（supply / emerald）
    [0, 5e6, 10e6, 15e6].forEach(t => {
      const y = yQ(t).toFixed(2);
      h += svgEl('text', {
        x: PAD.l - 8, y, 'text-anchor': 'end', 'dominant-baseline': 'central',
        'font-size': 11, fill: '#34d399', 'font-family': 'ui-monospace, monospace'
      }, t === 0 ? '0' : (t / 1e6) + 'm');
    });
    // 21m at top of left axis（也是渐近上限）
    h += svgEl('text', {
      x: PAD.l - 8, y: PAD.t + 4, 'text-anchor': 'end', 'dominant-baseline': 'hanging',
      'font-size': 11, fill: '#34d399', 'font-family': 'ui-monospace, monospace'
    }, '21m');

    // 右 y 轴刻度（price / amber）
    h += svgEl('text', {
      x: PAD.l + PW + 8, y: PAD.t + PH, 'text-anchor': 'start', 'dominant-baseline': 'central',
      'font-size': 11, fill: '#fbbf24', 'font-family': 'ui-monospace, monospace'
    }, '$0');
    [0.25, 0.5, 0.75].forEach(frac => {
      const usd = PRICE_MAX * frac;
      const y = yP(usd).toFixed(2);
      h += svgEl('text', {
        x: PAD.l + PW + 8, y, 'text-anchor': 'start', 'dominant-baseline': 'central',
        'font-size': 11, fill: '#fbbf24', 'font-family': 'ui-monospace, monospace'
      }, fmtUsd(usd));
    });
    // ∞ 顶端
    h += svgEl('text', {
      x: PAD.l + PW + 8, y: PAD.t + 4, 'text-anchor': 'start', 'dominant-baseline': 'hanging',
      'font-size': 14, fill: '#fbbf24', 'font-family': 'ui-monospace, monospace'
    }, '∞');

    // X 轴刻度
    [0, 500, 1000, 1500, 2000, 2500].forEach(t => {
      const x = ex(t).toFixed(2);
      h += svgEl('text', {
        x, y: PAD.t + PH + 18, 'text-anchor': 'middle',
        'font-size': 11, fill: '#71717a', 'font-family': 'ui-monospace, monospace'
      }, t);
    });
    // X 轴右端 ∞
    h += svgEl('text', {
      x: PAD.l + PW, y: PAD.t + PH + 18, 'text-anchor': 'middle',
      'font-size': 14, fill: '#71717a', 'font-family': 'ui-monospace, monospace'
    }, '∞');
    // X 轴标题
    h += svgEl('text', {
      x: PAD.l + PW / 2, y: VH - 4, 'text-anchor': 'middle',
      'font-size': 11, fill: '#52525b', 'font-family': 'ui-monospace, monospace'
    }, 'cumulative eth');

    // 供应曲线 + 填充
    h += svgEl('path', { d: buildAreaPath(), fill: '#34d399', 'fill-opacity': 0.07 });
    h += svgEl('path', { d: buildCurvePath(yQ, qFwd), fill: 'none', stroke: '#34d399', 'stroke-width': 1.6 });

    // 价格曲线
    h += svgEl('path', {
      d: buildCurvePath(yP, priceUsdAt), fill: 'none', stroke: '#fbbf24', 'stroke-width': 1.6
    });

    // 垂直虚线 @ forward (cursor)
    const xCur = ex(st.e);
    h += svgEl('line', {
      x1: xCur.toFixed(2), x2: xCur.toFixed(2),
      y1: PAD.t, y2: PAD.t + PH,
      stroke: '#52525b', 'stroke-width': 1, 'stroke-dasharray': '3 4'
    });

    // 实心绿点（real / mintedFair）
    const xReal = ex(st.eReal);
    const yRealS = yQ(st.realQ);
    h += svgEl('circle', { cx: xReal.toFixed(2), cy: yRealS.toFixed(2), r: 4.5, fill: '#34d399' });

    // 空心绿圈（forward = q(ethCum)）
    const yFwdS = yQ(st.fwdQ);
    h += svgEl('circle', {
      cx: xCur.toFixed(2), cy: yFwdS.toFixed(2), r: 6.5,
      fill: '#09090b', stroke: '#34d399', 'stroke-width': 2
    });

    // 底部 burn 价（粉）+ mint 价（绿）
    const yMint = yP(st.mintUsd);
    const yBurn = yP(st.burnUsd);
    h += svgEl('circle', { cx: xReal.toFixed(2), cy: yBurn.toFixed(2), r: 3.5, fill: '#ec4899' });
    h += svgEl('circle', { cx: xCur.toFixed(2), cy: yMint.toFixed(2), r: 3.5, fill: '#34d399' });

    // 透明捕获层
    h += svgEl('rect', {
      id: 'captureRect',
      x: PAD.l, y: PAD.t, width: PW, height: PH,
      fill: 'transparent', style: 'cursor:crosshair'
    });

    svg.innerHTML = h;
    updateReadout(st);
  }

  function updateReadout(st) {
    const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    set('#rdSupplyReal', fmtSupply(st.realQ));
    set('#rdSupplyFwd',  fmtSupply(st.fwdQ));
    set('#rdDrift',      fmtSupply(st.drift));
    set('#rdPrice',      fmtUsd(st.mintUsd));
    set('#rdBurn',       fmtUsd(st.burnUsd));
    set('#rdMint',       fmtUsd(st.mintUsd));
    set('#rdEth',        cursorE.toFixed(0) + ' ETH');
  }

  // ---------- 拖动 / 触摸 ----------
  function eventToE(ev) {
    const rect = svg.getBoundingClientRect();
    const cx = ev.touches ? ev.touches[0].clientX : ev.clientX;
    const vbX = (cx - rect.left) * (VW / rect.width);
    const t = (vbX - PAD.l) / PW;
    return Math.max(0, Math.min(1, t)) * E_VIEW;
  }

  let dragging = false;
  function attachEvents() {
    if (!svg) return;
    const onDown = (ev) => {
      dragging = true;
      cursorE = Math.max(1, eventToE(ev));
      renderChart();
      ev.preventDefault();
    };
    const onMove = (ev) => {
      if (!dragging) return;
      cursorE = Math.max(1, eventToE(ev));
      renderChart();
      ev.preventDefault();
    };
    const onUp = () => { dragging = false; };

    svg.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    svg.addEventListener('touchstart', onDown, { passive: false });
    svg.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    window.addEventListener('keydown', (ev) => {
      if (ev.target && ['INPUT', 'TEXTAREA'].includes(ev.target.tagName)) return;
      if (ev.key === 'ArrowRight') { cursorE = Math.min(E_VIEW, cursorE + 25); renderChart(); }
      if (ev.key === 'ArrowLeft')  { cursorE = Math.max(1, cursorE - 25);     renderChart(); }
    });

    // 重置按钮：跳回当前实时位置
    $('#curveReset')?.addEventListener('click', () => {
      cursorE = LIVE.ethCum;
      renderChart();
    });
  }

  function rerenderAll() {
    renderChart();
    updateProgress();
  }

  // ---------- 章节进入动画 ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      es.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    $$('.chapter, .hero').forEach(el => io.observe(el));
  }

  // ---------- 初始化 ----------
  attachEvents();
  rerenderAll();
  loadLive();

  // 每 30 秒静默刷新一次实时数据
  setInterval(loadLive, 30_000);
})();
