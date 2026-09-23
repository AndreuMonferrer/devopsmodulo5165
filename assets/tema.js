// Modo claro / oscuro. Se carga en <head> para aplicar el tema antes de pintar la página.
(function () {
  const raiz = document.documentElement;
  let guardado = null;
  try { guardado = localStorage.getItem('tema'); } catch (e) {}
  const oscuroSistema = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  raiz.dataset.tema = guardado || (oscuroSistema ? 'oscuro' : 'claro');

  function rotular(boton) {
    const oscuro = raiz.dataset.tema === 'oscuro';
    boton.textContent = oscuro ? '☀ Modo claro' : '☾ Modo oscuro';
    boton.setAttribute('aria-pressed', oscuro);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById('cambiar-tema');
    if (!boton) return;
    rotular(boton);
    boton.addEventListener('click', function () {
      raiz.dataset.tema = raiz.dataset.tema === 'oscuro' ? 'claro' : 'oscuro';
      try { localStorage.setItem('tema', raiz.dataset.tema); } catch (e) {}
      rotular(boton);
    });
  });
})();
