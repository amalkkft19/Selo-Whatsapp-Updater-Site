/* Selo site script. Progressive enhancement only: every page reads fine without it. */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var CFG = window.SELO || {};
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var locale = (navigator.languages && navigator.languages[0]) || navigator.language || 'en';

  var store = {
    get: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- Analytics (only after consent) ---------- */
  var queue = [];
  function track(name, props) {
    props = props || {};
    props.page = props.page || CFG.route || location.pathname;
    if (window.plausible) window.plausible(name, { props: props });
    else if (window.gtag) window.gtag('event', name, props);
    else queue.push([name, props]);
  }
  window.seloTrack = track;
  function loadAnalytics() {
    var a = CFG.analytics || {};
    if (window.__seloAnalytics || !a.provider || a.provider === 'none') return;
    window.__seloAnalytics = true;
    var s = d.createElement('script'); s.defer = true;
    if (a.provider === 'plausible') {
      window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
      s.setAttribute('data-domain', a.domain); s.src = 'https://plausible.io/js/script.tagged-events.js';
    } else if (a.provider === 'ga4' && a.measurementId) {
      window.dataLayer = window.dataLayer || []; window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', a.measurementId, { anonymize_ip: true });
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(a.measurementId);
    } else return;
    d.head.appendChild(s);
    queue.splice(0).forEach(function (e) { track(e[0], e[1]); });
  }
  d.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-event]');
    if (el) track(el.getAttribute('data-event'));
  });

  /* ---------- Cookie consent ---------- */
  var CONSENT_KEY = 'selo-consent', YEAR = 365 * 24 * 3600 * 1000;
  var banner = $('[data-cookie]');
  function getConsent() {
    var c = store.get(CONSENT_KEY);
    if (!c || !c.ts || Date.now() - c.ts > YEAR) return null;
    return c;
  }
  function applyConsent(c) { if (c && c.analytics) loadAnalytics(); }
  function saveConsent(analytics, marketing) {
    var c = { analytics: !!analytics, marketing: !!marketing, ts: Date.now() };
    store.set(CONSENT_KEY, c); applyConsent(c);
    if (banner) banner.hidden = true;
  }
  if (banner) {
    var form = $('[data-cookie-form]', banner), actions = $('[data-cookie-actions]', banner);
    $('[data-cookie-accept]', banner).addEventListener('click', function () { saveConsent(true, true); });
    $('[data-cookie-reject]', banner).addEventListener('click', function () { saveConsent(false, false); });
    $('[data-cookie-settings]', banner).addEventListener('click', function () {
      var c = getConsent() || {};
      form.analytics.checked = !!c.analytics; form.marketing.checked = !!c.marketing;
      form.hidden = false; $('[data-cookie-settings]', banner).hidden = true;
      form.analytics.focus();
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); saveConsent(form.analytics.checked, form.marketing.checked); });
    $$('[data-cookie-open]').forEach(function (b) {
      b.addEventListener('click', function () { banner.hidden = false; form.hidden = true; $('[data-cookie-settings]', banner).hidden = false; $('[data-cookie-accept]', banner).focus(); });
    });
    var existing = getConsent();
    if (existing) applyConsent(existing); else banner.hidden = false;
  }

  /* ---------- Theme ---------- */
  var THEME_KEY = 'selo-theme';
  function setTheme(v) {
    if (v === 'light' || v === 'dark') root.setAttribute('data-theme', v); else root.removeAttribute('data-theme');
    $$('[data-theme-value]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-value') === (v || 'auto'))); });
  }
  setTheme(store.get(THEME_KEY) || 'auto');
  $$('[data-theme-value]').forEach(function (b) {
    b.addEventListener('click', function () { var v = b.getAttribute('data-theme-value'); store.set(THEME_KEY, v); setTheme(v); });
  });

  /* ---------- Announcement bar ---------- */
  var ann = $('[data-announce]');
  if (ann) {
    var id = ann.getAttribute('data-announce'), dismissed = store.get('selo-announce-dismissed');
    if (dismissed === id) ann.remove();
    else {
      var close = $('.announce__close', ann); close.hidden = false;
      close.addEventListener('click', function () { store.set('selo-announce-dismissed', id); ann.remove(); setHeaderVar(); });
    }
  }

  /* ---------- Header menus ---------- */
  var header = $('.site-header');
  function setHeaderVar() { if (header) root.style.setProperty('--header-bottom', Math.max(0, header.getBoundingClientRect().bottom) + 'px'); }
  var mnav = $('.mnav');
  if (mnav) {
    mnav.addEventListener('toggle', function () {
      setHeaderVar();
      d.body.classList.toggle('menu-open', mnav.open);
      $('summary', mnav).setAttribute('aria-expanded', String(mnav.open));
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { mnav.open = false; }); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 1100 && mnav.open) mnav.open = false; setHeaderVar(); });
  }
  var dds = $$('.dd');
  dds.forEach(function (dd) {
    var sum = $('summary', dd);
    sum.setAttribute('aria-expanded', 'false');
    dd.addEventListener('toggle', function () {
      sum.setAttribute('aria-expanded', String(dd.open));
      if (dd.open) dds.forEach(function (o) { if (o !== dd) o.open = false; });
    });
  });
  d.addEventListener('click', function (e) { dds.forEach(function (dd) { if (dd.open && !dd.contains(e.target)) dd.open = false; }); });
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    dds.forEach(function (dd) { if (dd.open) { dd.open = false; $('summary', dd).focus(); } });
    if (mnav && mnav.open) { mnav.open = false; $('summary', mnav).focus(); }
  });

  /* ---------- Locale formatting for sample numbers, money and times ---------- */
  $$('[data-money]').forEach(function (el) {
    try {
      var digits = +el.getAttribute('data-digits');
      el.textContent = new Intl.NumberFormat(locale, { style: 'currency', currency: el.getAttribute('data-currency'), minimumFractionDigits: digits, maximumFractionDigits: digits, currencyDisplay: el.getAttribute('data-display') || 'symbol' }).format(+el.getAttribute('data-money'));
    } catch (e) {}
  });
  $$('[data-num]').forEach(function (el) { try { el.textContent = new Intl.NumberFormat(locale).format(+el.getAttribute('data-num')); } catch (e) {} });
  $$('time[data-time]').forEach(function (el) {
    try { var p = el.getAttribute('data-time').split(':'); var dt = new Date(2026, 0, 1, +p[0], +p[1]); el.textContent = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(dt); } catch (e) {}
  });
  $$('time[data-date]').forEach(function (el) {
    try { var dt = new Date(el.getAttribute('data-date') + 'T12:00:00Z'); el.textContent = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(dt); } catch (e) {}
  });

  /* ---------- Reveal on scroll + chat playback ---------- */
  function playChat(list) {
    var items = $$('.msg, .chat__system', list);
    if (reduce) { items.forEach(function (i) { i.classList.add('is-shown'); }); return; }
    items.forEach(function (it, n) { setTimeout(function () { it.classList.add('is-shown'); }, 250 + n * 650); });
  }
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        if (en.target.classList.contains('chat')) playChat(en.target); else en.target.classList.add('in');
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('.reveal, .chat[data-animate]').forEach(function (el) { io.observe(el); });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    $$('.chat[data-animate]').forEach(function (c) { $$('.msg, .chat__system', c).forEach(function (i) { i.classList.add('is-shown'); }); });
  }

  /* ---------- Pricing toggle ---------- */
  var toggle = $('[data-billing-toggle]');
  if (toggle) {
    toggle.hidden = false;
    $$('button', toggle).forEach(function (b) {
      b.addEventListener('click', function () {
        var mode = b.getAttribute('data-billing');
        $$('button', toggle).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $$('[data-price-monthly]').forEach(function (el) { el.textContent = el.getAttribute(mode === 'annual' ? 'data-price-annual' : 'data-price-monthly'); });
        $$('[data-billed-monthly]').forEach(function (el) { el.textContent = el.getAttribute(mode === 'annual' ? 'data-billed-annual' : 'data-billed-monthly'); });
        track('pricing_toggle', { billing: mode });
      });
    });
  }

  /* ---------- Contact form ---------- */
  var cf = $('[data-contact-form]');
  if (cf) {
    var status = $('[data-form-status]', cf.parentNode);
    var topicMap = { demo: 'demo', press: 'press', partnerships: 'partnerships', support: 'support', sales: 'sales' };
    var preset = function () {
      var hash = (location.hash || '').slice(1);
      if (topicMap[hash]) cf.topic.value = topicMap[hash];
      if (hash.indexOf('notify-') === 0) {
        var feat = (CFG.upcomingNames || {})[hash.slice(7)];
        if (feat) { cf.topic.value = 'other'; cf.message.value = 'Tell me when ' + feat + ' is available'; }
      }
    };
    preset();
    window.addEventListener('hashchange', preset);
    $$('[data-demo-preset]').forEach(function (a) { a.addEventListener('click', function () { cf.topic.value = 'demo'; setTimeout(function () { cf.name.focus(); }, 50); }); });
    function fieldError(input, msg) {
      var err = d.getElementById(input.id + '-error');
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) { err.textContent = msg || ''; err.hidden = !msg; }
    }
    function check(input) {
      var msg = '';
      var v = input.type === 'checkbox' ? input.checked : input.value.trim();
      if (input.required && !v) msg = input.getAttribute('data-required-msg');
      else if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = input.getAttribute('data-invalid-msg');
      fieldError(input, msg);
      return msg;
    }
    function validate() {
      var first = null;
      $$('[data-validate]', cf).forEach(function (input) { if (check(input) && !first) first = input; });
      return first;
    }
    // Clear an error as soon as the field is fixed (while typing), so the layout never shifts mid-click.
    $$('[data-validate]', cf).forEach(function (input) {
      var recheck = function () { if (input.getAttribute('aria-invalid') === 'true') check(input); };
      input.addEventListener('input', recheck); input.addEventListener('change', recheck);
    });
    cf.setAttribute('novalidate', '');
    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = validate();
      if (first) { first.focus(); status.className = 'form-status form-status--err'; status.textContent = cf.getAttribute('data-error-summary'); status.hidden = false; return; }
      if (cf.website && cf.website.value) return; // honeypot
      var data = {}; new FormData(cf).forEach(function (v, k) { data[k] = v; });
      var btn = $('button[type=submit]', cf); btn.disabled = true;
      var done = function (ok) {
        btn.disabled = false;
        status.hidden = false;
        status.className = 'form-status ' + (ok ? 'form-status--ok' : 'form-status--err');
        status.textContent = ok ? cf.getAttribute('data-success') : cf.getAttribute('data-failure');
        if (ok) { track(data.topic === 'demo' ? 'demo_request' : 'contact_submit', { topic: data.topic }); cf.reset(); }
        status.focus();
      };
      var endpoint = cf.getAttribute('data-endpoint');
      if (!endpoint) { setTimeout(function () { done(true); }, 400); return; } // demo mode: nothing is sent
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { done(r.ok); })
        .catch(function () { done(false); });
    });
  }

  setHeaderVar();
})();
