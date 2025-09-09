import './style.css';

const mainHeader = document.getElementById('main-header');
const stickyHeader = document.getElementById('sticky-header');

function toggleHeaders() {
  if (window.scrollY > mainHeader.offsetHeight) {
    stickyHeader.classList.remove('hidden');
  } else {
    stickyHeader.classList.add('hidden');
  }
}

window.addEventListener('scroll', toggleHeaders);

(function () {
  function initLangToggles(root = document) {
    const roots = root.querySelectorAll('[data-lang-root]');
    roots.forEach((r) => {
      // предотвращаем двойную инициализацию
      if (r.dataset.langInit) return;
      const toggle = r.querySelector('[data-lang-toggle]');
      const menu = r.querySelector('[data-lang-menu]');
      if (!toggle || !menu) return;

      r.dataset.langInit = '1';
      toggle.setAttribute('aria-expanded', 'false');

      // клик по кнопке — переключаем видимость меню
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = menu.classList.toggle('hidden');
        toggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
      });

      // чтобы клик внутри меню не закрывал его
      menu.addEventListener('click', (e) => e.stopPropagation());
    });
  }

  function closeAllMenus() {
    document.querySelectorAll('[data-lang-menu]').forEach((m) => {
      if (!m.classList.contains('hidden')) m.classList.add('hidden');
    });
    document
      .querySelectorAll('[data-lang-toggle]')
      .forEach((t) => t.setAttribute('aria-expanded', 'false'));
  }

  // Закрыть по клику вне
  document.addEventListener('click', (e) => {
    closeAllMenus();
  });

  // Закрыть по Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllMenus();
  });

  // Инициализировать сразу, если DOM уже загружен или по событию
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initLangToggles(document));
  } else {
    initLangToggles(document);
  }

  // Наблюдатель: если компонент подгружается/вставляется поздно (например через include),
  // автоматически инициализируем новые экземпляры
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (
          node.matches('[data-lang-root]') ||
          (node.querySelector && node.querySelector('[data-lang-root]'))
        ) {
          initLangToggles(node);
        }
      }
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
})();

(function () {
  const faqs = document.querySelectorAll('.faq-item');

  faqs.forEach((item) => {
    const btn = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.icon');

    btn.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');

      answer.classList.toggle('hidden', isOpen);
      icon.textContent = isOpen ? '+' : '–';
    });
  });
})();
