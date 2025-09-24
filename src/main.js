import './style.css';

const mainHeader = document.getElementById('main-header');
const stickyHeader = document.getElementById('sticky-header');

function toggleHeaders() {
  if (!mainHeader || !stickyHeader) return;
  if (window.scrollY > mainHeader.offsetHeight) {
    stickyHeader.classList.remove('hidden');
  } else {
    stickyHeader.classList.add('hidden');
  }
}

// --- helpers ---
function closeAllLangMenus() {
  document.querySelectorAll('[data-lang-menu]').forEach((m) => m.classList.add('hidden'));
  document
    .querySelectorAll('[data-lang-toggle]')
    .forEach((t) => t.setAttribute('aria-expanded', 'false'));
}

function closeAllMobileMenus() {
  document.querySelectorAll('[data-mobile-menu]').forEach((m) => m.classList.add('hidden'));
}

// Инициализация языковых переключателей (можно вызывать для части DOM)
function initLangToggles(root = document) {
  const roots = root.querySelectorAll('[data-lang-root]');
  roots.forEach((r) => {
    if (r.dataset.langInit) return;
    const toggle = r.querySelector('[data-lang-toggle]');
    const menu = r.querySelector('[data-lang-menu]');
    if (!toggle || !menu) return;

    r.dataset.langInit = '1';
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', isHidden ? 'false' : 'true');

      if (!isHidden) {
        // при открытии языкового меню — закрываем все mobile menus (бургер)
        closeAllMobileMenus();
      }
    });

    // чтобы клик внутри меню не закрывал его
    menu.addEventListener('click', (e) => e.stopPropagation());
  });
}

// --- main init (выполняется после загрузки DOM) ---
function init() {
  // Burger: для каждого toggle ищем своё menu внутри nav
  document.querySelectorAll('[data-menu-toggle]').forEach((toggle) => {
    const nav = toggle.closest('nav');
    const menu = nav && nav.querySelector('[data-mobile-menu]');
    if (!menu) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = menu.classList.toggle('hidden');
      // при открытии бургера — закрываем все языковые менюшки
      if (!isHidden) closeAllLangMenus();
    });
  });

  // подсветка активной ссылки
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("nav[aria-label='Main navigation'] a");
  links.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('font-bold');
    }
  });

  // Инициализируем языковые переключатели по всему документу
  initLangToggles(document);

  // Закрытие при клике вне элементов:
  document.addEventListener('click', (e) => {
    // mobile menus: если клик вне самого menu и вне соответствующего toggle — закрыть
    document.querySelectorAll('[data-mobile-menu]').forEach((mm) => {
      const nav = mm.closest('nav');
      const toggle = nav && nav.querySelector('[data-menu-toggle]');
      if (mm && toggle && !mm.contains(e.target) && !toggle.contains(e.target)) {
        mm.classList.add('hidden');
      }
    });

    // lang menus: если клик вне menu и вне соответствующего toggle — закрыть
    document.querySelectorAll('[data-lang-menu]').forEach((lm) => {
      const root = lm.closest('[data-lang-root]');
      const toggle = root && root.querySelector('[data-lang-toggle]');
      if (lm && toggle && !lm.contains(e.target) && !toggle.contains(e.target)) {
        lm.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Esc — закрыть всё
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllMobileMenus();
      closeAllLangMenus();
    }
  });

  // FAQ (как было)
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('button');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.icon');
    if (!btn || !answer || !icon) return;

    btn.addEventListener('click', () => {
      const isOpen = !answer.classList.contains('hidden');
      answer.classList.toggle('hidden', isOpen);
      icon.src = isOpen ? '/src/assets/img/icon/plus.svg' : '/src/assets/img/icon/minus.svg';
    });
  });

  // Наблюдатель для динамически добавляемых языковых блоков
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (
          node.matches &&
          (node.matches('[data-lang-root]') || node.querySelector('[data-lang-root]'))
        ) {
          initLangToggles(node);
        }
      }
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // начальная проверка header (чтобы sticky корректно отобразился сразу)
  toggleHeaders();
}

// запуск
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
window.addEventListener('scroll', toggleHeaders);
