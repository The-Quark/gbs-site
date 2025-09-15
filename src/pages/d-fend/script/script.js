document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('[data-logistic-cards]');
  if (!container) return;

  const activeClasses = 'h-[520px] w-[720px] cursor-default';
  const inactiveClasses = 'h-[520px] w-[192px] cursor-pointer';
  const activeImgClasses = 'mask-b-from-80%';
  const inactiveImgClasses = 'brightness-75';

  const cards = container.querySelectorAll('div.relative');

  // проставляем начальные состояния по атрибутам
  cards.forEach((card) => {
    const img = card.querySelector('img');

    if (card.hasAttribute('active')) {
      card.classList.add(...activeClasses.split(' '));
      card.classList.remove(...inactiveClasses.split(' '));
      img.classList.add(...activeImgClasses.split(' '));
      img.classList.remove(...inactiveImgClasses.split(' '));
      toggleText(card, true);
    } else {
      card.classList.add(...inactiveClasses.split(' '));
      card.classList.remove(...activeClasses.split(' '));
      img.classList.add(...inactiveImgClasses.split(' '));
      img.classList.remove(...activeImgClasses.split(' '));
      toggleText(card, false);
    }
  });

  cards.forEach((card) => {
    const img = card.querySelector('img');

    card.addEventListener('click', () => {
      // сбросим все карточки
      cards.forEach((c) => {
        c.removeAttribute('active');
        c.setAttribute('inActive', '');
        c.classList.remove(...activeClasses.split(' '));
        c.classList.add(...inactiveClasses.split(' '));

        const cImg = c.querySelector('img');
        cImg.classList.remove(...activeImgClasses.split(' '));
        cImg.classList.add(...inactiveImgClasses.split(' '));

        toggleText(c, false);
      });

      // активируем текущую
      card.removeAttribute('inActive');
      card.setAttribute('active', '');
      card.classList.remove(...inactiveClasses.split(' '));
      card.classList.add(...activeClasses.split(' '));

      img.classList.remove(...inactiveImgClasses.split(' '));
      img.classList.add(...activeImgClasses.split(' '));

      toggleText(card, true);
    });
  });

  function toggleText(card, isActive) {
    const h4 = card.querySelector('h4');
    const p = card.querySelector('p');
    const dev = card.querySelector('[dev]');

    if (isActive) {
      if (dev) dev.classList.remove('top-0', 'justify-center', 'items-center', 'w-[192px]');
      if (dev) dev.classList.add('bottom-0', 'w-[660px]');
      if (h4) h4.classList.remove('[writing-mode:vertical-rl]', 'text-lg');
      if (h4) h4.classList.add('text-h3', 'font-medium');
      if (p) p.classList.remove('hidden');
    } else {
      if (dev) dev.classList.remove('bottom-0', 'w-[660px]');
      if (dev) dev.classList.add('top-0', 'justify-center', 'items-center', 'w-[192px]');
      if (h4) h4.classList.add('[writing-mode:vertical-rl]', 'text-lg');
      if (h4) h4.classList.remove('text-h3', 'font-medium');
      if (p) p.classList.add('hidden');
    }
  }
});
