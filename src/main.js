import './style.css';

const mainHeader = document.getElementById('main-header');
const stickyHeader = document.getElementById('sticky-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function toggleHeaders() {
  if (window.scrollY > mainHeader.offsetHeight) {
    stickyHeader.classList.remove('hidden');
  } else {
    stickyHeader.classList.add('hidden');
  }
}

menuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isMenuHidden = mobileMenu.classList.toggle('hidden');
  closeAllLangMenus();
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  const links = document.querySelectorAll("nav[aria-label='Main navigation'] a");

  links.forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('font-bold');
    }
  });
});

window.addEventListener('scroll', toggleHeaders);

// Language toggle logic
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
        mobileMenu.classList.add('hidden'); // Close mobile menu when language menu opens
      }
    });

    menu.addEventListener('click', (e) => e.stopPropagation());
  });
}

function closeAllLangMenus() {
  document.querySelectorAll('[data-lang-menu]').forEach((m) => {
    if (!m.classList.contains('hidden')) m.classList.add('hidden');
  });
  document.querySelectorAll('[data-lang-toggle]').forEach((t) => {
    t.setAttribute('aria-expanded', 'false');
  });
}

// Close both menus on outside click
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    mobileMenu.classList.add('hidden');
  }
  closeAllLangMenus();
});

// Close both menus on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileMenu.classList.add('hidden');
    closeAllLangMenus();
  }
});

// Initialize language toggles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initLangToggles(document));
} else {
  initLangToggles(document);
}

const mo = new MutationObserver((mutations) => {
  for (const m of mutations) {
    for (const node of m.addedNodes) {
      if (node.nodeType !== 1) continue;
      if (node.matches('[data-lang-root]') || node.querySelector('[data-lang-root]')) {
        initLangToggles(node);
      }
    }
  }
});

mo.observe(document.body, { childList: true, subtree: true });

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
