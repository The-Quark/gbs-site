document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const hash = anchor.getAttribute('href');
    const target = document.querySelector(hash);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const targetHeight = rect.height;
    const viewportHeight = window.innerHeight;

    let desiredTop = window.scrollY + rect.top - (viewportHeight - targetHeight) / 2;

    const maxScroll = document.documentElement.scrollHeight - viewportHeight;
    if (desiredTop < 0) desiredTop = 0;
    if (desiredTop > maxScroll) desiredTop = maxScroll;

    window.scrollTo({ top: Math.round(desiredTop), behavior: 'smooth' });

    history.pushState(null, '', hash);

    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });

    // 👉 сбрасываем у всех ссылок стили активного состояния
    document
      .querySelectorAll('nav a')
      .forEach((a) => a.classList.remove('text-primary', 'font-bold'));

    // 👉 сбрасываем у всех параграфов стили активного состояния
    document
      .querySelectorAll('[id]')
      .forEach((p) => p.classList.remove('text-primary', 'font-bold'));

    // 👉 выделяем активную ссылку
    anchor.classList.add('text-primary', 'font-bold');

    // 👉 выделяем активный параграф
    target.classList.add('text-primary', 'font-bold');
  });
});
