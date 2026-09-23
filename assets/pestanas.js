// Pestañas accesibles e índice de la sesión. Enlazar a una sesión concreta con ra3.html#s14
(function () {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (!tabs.length) return;
  const indice = document.getElementById('indice');
  let titulos = [];

  // Índice con los apartados (h3) y subapartados (h4) del panel visible
  function construirIndice(panel) {
    if (!indice) return;
    const lista = indice.querySelector('ol');
    lista.innerHTML = '';
    titulos = Array.from(panel.querySelectorAll('h3, h4')).filter(h => !h.closest('.actividad, details'));
    let sub = null;
    titulos.forEach((h, i) => {
      if (!h.id) h.id = panel.id + '-t' + i;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + h.id; a.textContent = h.textContent; a.dataset.destino = h.id;
      li.appendChild(a);
      if (h.tagName === 'H4' && sub) { sub.appendChild(li); }
      else {
        li.className = h.tagName === 'H2' ? 'nivel-titulo' : '';
        lista.appendChild(li);
        if (h.tagName !== 'H2') { sub = document.createElement('ol'); li.appendChild(sub); } else { sub = null; }
      }
    });
    // Actividades de la sesión, como una sola entrada con sus actividades debajo
    const acts = Array.from(panel.querySelectorAll('.actividad > h4'));
    const cab = titulos.find(h => h.textContent.trim() === 'Actividades');
    if (cab && acts.length) {
      const ol = lista.querySelector(`a[data-destino="${cab.id}"]`).parentElement.querySelector('ol');
      acts.forEach((h, i) => {
        if (!h.id) h.id = panel.id + '-a' + i;
        const li = document.createElement('li'), a = document.createElement('a');
        a.href = '#' + h.id; a.dataset.destino = h.id;
        a.textContent = h.firstChild.textContent.trim();
        li.appendChild(a); ol.appendChild(li);
        titulos.push(h);
      });
      titulos.sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
    }
    indice.querySelectorAll('ol ol:empty').forEach(o => o.remove());
    marcarActual();
  }

  function marcarActual() {
    if (!indice || !titulos.length) return;
    let actual = titulos[0];
    for (const h of titulos) { if (h.getBoundingClientRect().top < 130) actual = h; else break; }
    indice.querySelectorAll('a').forEach(a => a.classList.toggle('actual', a.dataset.destino === actual.id));
  }

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
    construirIndice(document.getElementById('p-' + t.dataset.panel));
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

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    // Enlaces del índice: desplazarse sin cambiar de pestaña
    if (a.dataset.destino) {
      e.preventDefault();
      document.getElementById(a.dataset.destino).scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.matchMedia('(max-width: 1099px)').matches) indice.open = false;
      return;
    }
    // Enlaces internos del tipo <a href="#s3"> dentro de los paneles
    const id = a.getAttribute('href').slice(1);
    if (tabs.some(t => t.dataset.panel === id)) { e.preventDefault(); history.replaceState(null, '', '#' + id); abrir(id); window.scrollTo(0, 0); }
  });

  window.addEventListener('scroll', marcarActual, { passive: true });
  window.addEventListener('hashchange', () => { abrir(location.hash.slice(1)); window.scrollTo(0, 0); });
  if (indice) indice.open = !window.matchMedia('(max-width: 1099px)').matches;
  abrir(location.hash.slice(1));
  // El navegador salta al id del panel; volvemos arriba para ver la cabecera
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('load', () => window.scrollTo(0, 0));
  window.scrollTo(0, 0);
})();
