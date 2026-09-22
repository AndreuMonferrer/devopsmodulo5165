// Pestañas accesibles. Enlazar a una sesión concreta con ra3.html#s14
(function () {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  function abrir(id, foco) {
    const t = tabs.find(x => x.dataset.panel === id) || tabs[0];
    tabs.forEach(x => {
      const on = x === t;
      x.setAttribute('aria-selected', on);
      x.tabIndex = on ? 0 : -1;
      document.getElementById('p-' + x.dataset.panel).hidden = !on;
      x.setAttribute('aria-controls', 'p-' + x.dataset.panel);
    });
    if (foco) t.focus();
    const c = t.parentElement; c.scrollLeft = Math.max(0, t.offsetLeft - 40);
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => { history.replaceState(null, '', '#' + t.dataset.panel); abrir(t.dataset.panel); window.scrollTo(0, 0); });
    t.addEventListener('keydown', e => {
      let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); history.replaceState(null, '', '#' + tabs[j].dataset.panel); abrir(tabs[j].dataset.panel, true); }
    });
  });
  // Enlaces internos del tipo <a href="#s3"> dentro de los paneles
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (tabs.some(t => t.dataset.panel === id)) { e.preventDefault(); history.replaceState(null, '', '#' + id); abrir(id); window.scrollTo(0, 0); }
  });
  window.addEventListener('hashchange', () => { abrir(location.hash.slice(1)); window.scrollTo(0, 0); });
  abrir(location.hash.slice(1));
  // El navegador salta al id del panel; volvemos arriba para ver la cabecera
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('load', () => window.scrollTo(0, 0));
  window.scrollTo(0, 0);
})();
