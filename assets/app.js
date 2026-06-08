/* assets/app.js
 * Render, tema, idioma, animações.
 * Dependências: I18N (i18n.js), CONTENT (content.js).
 */

(() => {
  'use strict';

  const { t, setLang, getLang } = window.I18N;
  const C = window.CONTENT;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const html = (str) => str; // só para o linter; escrevemos strings directo
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── THEME ────────────────────────────────────── */
  const THEME_KEY = 'edg.theme';

  function getInitialTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = $('#theme-toggle');
    if (btn) {
      const isLight = theme === 'light';
      btn.setAttribute('aria-label', isLight ? t('nav.toggleTheme.toLight') : t('nav.toggleTheme.toDark'));
      btn.setAttribute('aria-pressed', String(isLight));
      btn.dataset.theme = theme;
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    const apply = () => {
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    };
    if (isReduced || typeof document.startViewTransition !== 'function') {
      apply();
      return;
    }
    document.startViewTransition(apply);
  }

  /* ── LANGUAGE ─────────────────────────────────── */
  const LANG_KEY = 'edg.lang';

  function getInitialLang() {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  function applyLang() {
    document.documentElement.setAttribute('lang', getLang());
    const btn = $('#lang-toggle');
    if (btn) {
      btn.textContent = t('nav.lang.short');
      btn.setAttribute('aria-label', t('nav.toggleLang'));
    }
    document.title = t('meta.title');
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('meta.description'));
  }

  function setLanguage(lang, persist = true) {
    setLang(lang);
    if (persist) localStorage.setItem(LANG_KEY, lang);
    render();
    applyLang();
  }

  /* ── RENDER ───────────────────────────────────── */
  function render() {
    const lang = getLang();
    // Texto estático (data-i18n="key")
    $$('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });
    $$('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });
    $$('[data-i18n-attr]').forEach((el) => {
      // data-i18n-attr="placeholder:contact.form.name.ph;aria-label:contact.form.message"
      el.getAttribute('data-i18n-attr')
        .split(';')
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((pair) => {
          const [attr, key] = pair.split(':').map((s) => s.trim());
          if (attr && key) el.setAttribute(attr, t(key));
        });
    });

    // Stats (data-count)
    $$('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const suffix = el.dataset.suffix || '';
      animateCount(el, target, decimals, suffix);
    });

    // Skills
    renderSkills(lang);
    // Marquee
    renderMarquee(lang);
    // Projects
    renderProjects(lang);
    // Journey
    renderJourney(lang);
    // Certifications
    renderCertifications(lang);
  }

  function renderSkills(lang) {
    const root = $('#skill-groups');
    if (!root) return;
    const groups = C.skillGroups[lang] || C.skillGroups.en;
    root.innerHTML = groups
      .map(
        (g) => `
        <div class="skill-group">
          <div class="skill-group-label">${escapeHtml(t(g.label))}</div>
          <div class="skill-items">
            ${g.items.map((it) => `<span class="skill-item">${escapeHtml(it)}</span>`).join('')}
          </div>
        </div>`
      )
      .join('');
  }

  function renderMarquee(lang) {
    const root = $('#marquee-track');
    if (!root) return;
    const items = C.marquee[lang] || C.marquee.en;
    // duplicar para loop infinito
    const all = items.concat(items);
    root.innerHTML = all
      .map(
        (it, i) =>
          `<span class="marquee-item">${escapeHtml(it)}</span>` +
          (i < all.length - 1 ? `<span class="marquee-sep">✦</span>` : '')
      )
      .join('');
  }

  function renderProjects(lang) {
    const root = $('#project-list');
    if (!root) return;
    if (!C.projects.length) {
      root.innerHTML = `<div class="work-empty">${escapeHtml(t('work.empty'))}</div>`;
      return;
    }
    root.innerHTML = C.projects
      .map((p) => {
        const tags = p.tags.map((tag) => `<span class="pi-tag">${escapeHtml(tag)}</span>`).join('');
        const bonus = p.bonus ? `<div class="pi-bonus">+ ${lang === 'pt' ? 'bónus' : 'bonus'}</div>` : '';
        const latest = p.latest ? `<div class="pi-latest">${lang === 'pt' ? 'Mais recente' : 'Latest'}</div>` : '';
        const inner = `
        <article class="project-item" data-hover>
          <div class="pi-num">${escapeHtml(p.num)}</div>
          <div class="pi-main">
            <div class="pi-name">${escapeHtml(p.name)}</div>
            <div class="pi-sub">${escapeHtml(p.summary[lang] || p.summary.en)}</div>
            ${bonus}${latest}
          </div>
          <div class="pi-tags">${tags}</div>
          <div class="pi-year">${escapeHtml(p.year)}</div>
          <div class="pi-arrow" aria-hidden="true">↗</div>
        </article>`;
        if (p.repo) {
          return `<a href="${escapeHtml(p.repo)}" target="_blank" rel="noopener noreferrer" class="project-link">${inner}</a>`;
        }
        return inner;
      })
      .join('');
  }

  function renderJourney(lang) {
    const root = $('#journey-list');
    if (!root) return;
    root.innerHTML = C.journey
      .map((j) => {
        const statusKey = j.status === 'pass+bonus' ? 'js-pass' : j.status === 'fail' ? 'js-fail' : 'js-pass';
        const statusLabel =
          j.status === 'pass+bonus'
            ? lang === 'pt'
              ? 'pass +bónus'
              : 'pass +bonus'
            : j.status === 'fail'
              ? lang === 'pt'
                ? 'failed'
                : 'failed'
              : lang === 'pt'
                ? 'pass'
                : 'pass';
        return `
        <div class="j-item">
          <div class="j-name">${escapeHtml(j.name)} <strong>— ${escapeHtml(j.desc[lang] || j.desc.en)}</strong></div>
          <span class="j-status ${statusKey}">${escapeHtml(statusLabel)}</span>
          <div class="j-date">${escapeHtml(j.date[lang] || j.date.en)}</div>
        </div>`;
      })
      .join('');
  }

  function renderCertifications(lang) {
    const root = $('#cert-list');
    if (!root) return;
    root.innerHTML = C.certifications
      .map((c) => {
        const skills = (c.skills[lang] || c.skills.en)
          .map((s) => `<span class="cert-skill">${escapeHtml(s)}</span>`)
          .join('');
        return `
        <article class="cert-card" data-hover>
          <div class="cert-head">
            <div class="cert-issuer">${escapeHtml(c.issuer)}</div>
            <div class="cert-date">${escapeHtml(t('certs.issued'))}: ${escapeHtml(c.date[lang] || c.date.en)}</div>
          </div>
          <h3 class="cert-title">${escapeHtml(c.title[lang] || c.title.en)}</h3>
          <div class="cert-foot">
            <div class="cert-code"><span>${escapeHtml(t('certs.code'))}:</span> <code>${escapeHtml(c.code)}</code></div>
            <div class="cert-skills">${skills}</div>
          </div>
        </article>`;
      })
      .join('');
  }

  /* ── COUNT ANIMATION ──────────────────────────── */
  function animateCount(el, target, decimals, suffix) {
    if (isReduced) {
      el.textContent = (decimals > 0 ? target.toFixed(decimals) : Math.round(target)) + suffix;
      return;
    }
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const val = eased * target;
      el.textContent = (decimals > 0 ? val.toFixed(decimals) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ── UTILS ────────────────────────────────────── */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── SCROLL REVEAL ────────────────────────────── */
  function initReveal() {
    if (isReduced) {
      $$('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { threshold: 0.12 }
    );
    $$('.reveal').forEach((el) => io.observe(el));
  }

  /* ── CURSOR ───────────────────────────────────── */
  function initCursor() {
    if (isCoarse) return;
    const dot = $('#cur-dot');
    const circ = $('#cur-circle');
    if (!dot || !circ) return;
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    });
    (function raf() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      circ.style.left = cx + 'px';
      circ.style.top = cy + 'px';
      requestAnimationFrame(raf);
    })();
    document.body.addEventListener('mouseenter', (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, label')) {
        document.body.classList.add('hovering');
      }
    }, true);
    document.body.addEventListener('mouseleave', (e) => {
      if (e.target.closest('a, button, [data-hover], input, textarea, label')) {
        document.body.classList.remove('hovering');
      }
    }, true);
  }

  /* ── SMOOTH SCROLL ────────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = $(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // fechar menu mobile se aberto
          document.body.classList.remove('nav-open');
          const navRight = $('#nav-right');
          if (navRight) navRight.classList.remove('is-open');
          const burger = $('#nav-burger');
          if (burger) {
            burger.setAttribute('aria-expanded', 'false');
            burger.setAttribute('aria-label', t('nav.openMenu'));
          }
          document.body.style.overflow = '';
        }
      });
    });
  }

  /* ── NAV TOGGLES ──────────────────────────────── */
  function initNavToggles() {
    const themeBtn = $('#theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    const langBtn = $('#lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const next = getLang() === 'pt' ? 'en' : 'pt';
        if (isReduced) {
          setLanguage(next);
        } else {
          // micro fade
          const main = $('main');
          if (main) {
            main.classList.add('is-fading');
            setTimeout(() => {
              setLanguage(next);
              requestAnimationFrame(() => main.classList.remove('is-fading'));
            }, 180);
          } else {
            setLanguage(next);
          }
        }
      });
    }

    const burger = $('#nav-burger');
    if (burger) {
      burger.addEventListener('click', () => {
        const open = document.body.classList.toggle('nav-open');
        const navRight = $('#nav-right');
        if (navRight) navRight.classList.toggle('is-open', open);
        
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? t('nav.closeMenu') : t('nav.openMenu'));
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }
  }

  /* ── LOADER ───────────────────────────────────── */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;
    const hide = () => {
      loader.classList.add('gone');
      setTimeout(() => loader.remove(), 1000);
    };
    if (document.readyState === 'complete') {
      setTimeout(hide, 600);
    } else {
      window.addEventListener('load', () => setTimeout(hide, 600), { once: true });
    }
  }

  /* ── CONTACT FORM ─────────────────────────────── */
  function initContactForm() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#contact-status');
    const btn = form.querySelector('button[type="submit"]');
    const submitLabel = t('contact.form.submit');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!status || !btn) return;
      status.className = 'cf-status';
      status.textContent = t('contact.form.sending');
      btn.disabled = true;
      btn.firstChild.textContent = t('contact.form.sending') + ' ';

      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await res.json().catch(() => ({}));
        if (!res.ok || !result.ok) {
          throw new Error(result.error || t('contact.form.error.generic'));
        }
        form.reset();
        status.className = 'cf-status ok';
        status.textContent = t('contact.form.ok');
      } catch (err) {
        status.className = 'cf-status error';
        status.textContent = err.message || t('contact.form.error.generic');
      } finally {
        btn.disabled = false;
        btn.firstChild.textContent = submitLabel + ' ';
      }
    });
  }

  /* ── HERO ANIMATIONS ──────────────────────────── */
  function startHeroAnim() {
    if (isReduced) {
      $$('.hero-eyebrow span, .hero-name .line, .hero-desc, .hero-scroll, .hero-cta').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    const eyebrow = $('.hero-eyebrow span');
    if (eyebrow) {
      eyebrow.style.transition = 'transform .7s .1s cubic-bezier(.22,.61,.36,1),opacity .7s .1s';
      eyebrow.style.transform = 'translateY(0)';
      eyebrow.style.opacity = '1';
    }
    $$('.hero-name .line').forEach((l, i) => {
      l.style.transition = `transform .9s ${0.3 + i * 0.15}s cubic-bezier(.22,.61,.36,1),opacity .9s ${0.3 + i * 0.15}s`;
      l.style.transform = 'translateY(0)';
      l.style.opacity = '1';
    });
    setTimeout(() => {
      $$('.hero-desc, .hero-scroll, .hero-cta').forEach((el) => {
        el.style.transition = 'transform .8s cubic-bezier(.22,.61,.36,1),opacity .8s';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });
    }, 800);
  }

  /* ── WEBGL / FALLBACK ─────────────────────────── */
  function initWebgl() {
    const canvas = $('#webgl');
    if (!canvas) return;
    // desactivar em mobile / reduced motion
    if (isCoarse || isReduced) {
      canvas.style.display = 'none';
      return;
    }

    // Fade out canvas on scroll
    const hero = $('.hero');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (hero) {
        const heroHeight = hero.offsetHeight || window.innerHeight;
        const opacity = Math.max(0, 0.7 * (1 - scrollY / (heroHeight * 0.8)));
        canvas.style.opacity = opacity;
        canvas.style.visibility = opacity <= 0 ? 'hidden' : 'visible';
      }
    });

    if (typeof THREE !== 'undefined') {
      try {
        initThreeScene(canvas);
        return;
      } catch (err) {
        console.warn('WebGL indisponível. A usar fallback.', err);
      }
    }
    initFallbackScene(canvas);
  }

  function initThreeScene(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    const geo = new THREE.IcosahedronGeometry(1.8, 1);
    const mat = new THREE.MeshBasicMaterial({
      color: getCssAccent(), wireframe: true, transparent: true, opacity: 0.95,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const geo2 = new THREE.IcosahedronGeometry(2.4, 1);
    const mat2 = new THREE.MeshBasicMaterial({
      color: getCssMuted(), wireframe: true, transparent: true, opacity: 0.55,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    scene.add(mesh2);

    const rg = new THREE.TorusGeometry(1.4, 0.005, 8, 120);
    const rm = new THREE.MeshBasicMaterial({ color: getCssAccent(), transparent: true, opacity: 0.9 });
    const ring = new THREE.Mesh(rg, rm);
    ring.rotation.x = Math.PI * 0.4;
    scene.add(ring);

    const dotGeo = new THREE.BufferGeometry();
    const dpos = new Float32Array(600);
    for (let i = 0; i < 600; i++) dpos[i] = (Math.random() - 0.5) * 8;
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
    const dotMat = new THREE.PointsMaterial({ size: 0.017, color: getCssMuted(), transparent: true, opacity: 0.9 });
    const dots = new THREE.Points(dotGeo, dotMat);
    scene.add(dots);

    let tmx = 0, tmy = 0, t = 0;
    document.addEventListener('mousemove', (e) => {
      tmx = (e.clientX / innerWidth - 0.5) * 2;
      tmy = (e.clientY / innerHeight - 0.5) * 2;
    });

    (function animate() {
      requestAnimationFrame(animate);
      const scrollY = window.scrollY;
      t += 0.004;
      mesh.rotation.x = t * 0.4 + tmy * 0.3;
      mesh.rotation.y = t * 0.6 + tmx * 0.3;
      mesh2.rotation.x = -t * 0.25;
      mesh2.rotation.y = t * 0.35;
      ring.rotation.y = t * 0.5;
      ring.rotation.z = t * 0.3 + tmx * 0.1;
      dots.rotation.y = t * 0.08;
      camera.position.y = -scrollY * 0.002;
      renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
    });
  }

  function initFallbackScene(canvas) {
    const ctx = canvas.getContext('2d');
    const state = { mx: 0, my: 0, w: 0, h: 0, dpr: 1 };
    let angle = 0;
    const points = Array.from({ length: 64 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
    }));
    const wirePoints = [];
    const wireEdges = [];
    const latSteps = 7;
    const lonSteps = 14;
    for (let lat = 1; lat < latSteps; lat++) {
      const phi = -Math.PI / 2 + (Math.PI * lat) / latSteps;
      for (let lon = 0; lon < lonSteps; lon++) {
        const theta = (Math.PI * 2 * lon) / lonSteps;
        wirePoints.push([Math.cos(phi) * Math.cos(theta), Math.sin(phi), Math.cos(phi) * Math.sin(theta)]);
      }
    }
    for (let lat = 0; lat < latSteps - 1; lat++) {
      for (let lon = 0; lon < lonSteps; lon++) {
        const c = lat * lonSteps + lon;
        wireEdges.push([c, lat * lonSteps + ((lon + 1) % lonSteps)]);
        if (lat < latSteps - 2) wireEdges.push([c, (lat + 1) * lonSteps + lon]);
      }
    }
    function project(p, size = 1, sy = 0) {
      const [x, y, z] = p;
      const ay = angle + state.mx * 0.28;
      const ax = angle * 0.55 + state.my * 0.22;
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const depth = 4.2 + z2;
      const scale = (Math.min(state.w, state.h) * 0.16 * size) / depth;
      return { x: state.w * 0.5 + x1 * scale, y: state.h * 0.45 + y1 * scale - sy * 0.12, z: z2 };
    }
    function orbit(cx, cy, rx, ry, r, color) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    function resize() {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.w = canvas.offsetWidth;
      state.h = canvas.offsetHeight;
      canvas.width = Math.max(1, state.w * state.dpr);
      canvas.height = Math.max(1, state.h * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    }
    function draw() {
      angle += 0.01;
      ctx.clearRect(0, 0, state.w, state.h);
      const sy = window.scrollY;
      const cx = state.w * 0.5 + state.mx * 36;
      const cy = state.h * 0.48 + state.my * 36 - sy * 0.18;
      orbit(cx, cy, 190, 88, -Math.PI * 0.15 + angle * 0.18, 'rgba(122,115,104,.26)');
      orbit(cx, cy, 158, 58, Math.PI * 0.55 - angle * 0.22, 'rgba(122,115,104,.28)');
      const o = wirePoints.map((p) => project(p, 1.33, sy));
      ctx.lineWidth = 0.8;
      wireEdges.forEach(([a, b]) => {
        const d = Math.max(0.18, Math.min(0.52, (o[a].z + o[b].z + 2.4) / 4.8));
        ctx.strokeStyle = `rgba(122,115,104,${d})`;
        ctx.beginPath();
        ctx.moveTo(o[a].x, o[a].y);
        ctx.lineTo(o[b].x, o[b].y);
        ctx.stroke();
      });
      const p = wirePoints.map((pp) => project(pp, 1, sy));
      ctx.lineWidth = 1.2;
      wireEdges.forEach(([a, b]) => {
        const d = Math.max(0.34, Math.min(0.95, (p[a].z + p[b].z + 2.4) / 4.8));
        ctx.strokeStyle = `rgba(200,169,110,${d})`;
        ctx.beginPath();
        ctx.moveTo(p[a].x, p[a].y);
        ctx.lineTo(p[b].x, p[b].y);
        ctx.stroke();
      });
      orbit(cx, cy, 122, 27, Math.PI * 0.4 + angle * 0.5 + state.mx * 0.1, 'rgba(200,169,110,.92)');
      points.forEach((pt, i) => {
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < 0 || pt.x > 1) pt.vx *= -1;
        if (pt.y < 0 || pt.y > 1) pt.vy *= -1;
        const x = pt.x * state.w;
        const y = pt.y * state.h - sy * 0.08;
        ctx.fillStyle = 'rgba(122,115,104,.65)';
        ctx.fillRect(x, y, 1.5, 1.5);
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j], qx = q.x * state.w, qy = q.y * state.h - sy * 0.08;
          const dx = x - qx, dy = y - qy, dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(122,115,104,${(1 - dist / 110) * 0.18})`;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(qx, qy); ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    }
    document.addEventListener('mousemove', (e) => {
      state.mx = (e.clientX / innerWidth - 0.5) * 2;
      state.my = (e.clientY / innerHeight - 0.5) * 2;
    });
    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  function getCssAccent() {
    return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#c8a96e');
  }
  function getCssMuted() {
    return new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#7a7368');
  }

  /* ── INIT ─────────────────────────────────────── */
  function init() {
    // Theme
    applyTheme(getInitialTheme());

    // Lang
    const initialLang = getInitialLang();
    setLanguage(initialLang, false);

    // UI
    initNavToggles();
    initSmoothScroll();
    initCursor();
    initReveal();
    initLoader();
    startHeroAnim();
    initWebgl();
    initContactForm();

    // re-render on system theme change (se user não tiver escolhido manualmente)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'light' : 'dark');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
