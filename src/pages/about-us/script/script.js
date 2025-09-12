import { sliderData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-slider]').forEach((slider) => {
    const sliderId = slider.dataset.id;
    const data = sliderData[sliderId];

    if (!data) return;

    const yearsContainer = slider.querySelector('[data-years]');
    const imageElement = slider.querySelector('[data-image]');
    const titleElement = slider.querySelector('[data-title]');
    const descriptionElement = slider.querySelector('[data-description]');
    const leftArrow = slider.querySelector('[data-left]');
    const rightArrow = slider.querySelector('[data-right]');

    let currentIndex = 0;

    function updateSlide(year) {
      const slide = data.find((item) => item.year === year);
      if (!slide) return;

      currentIndex = data.findIndex((item) => item.year === year);

      imageElement.src = slide.image;
      titleElement.textContent = slide.title;
      descriptionElement.textContent = slide.description;

      yearsContainer.querySelectorAll('[data-year]').forEach((el) => {
        el.classList.remove('text-h3', 'leading-h3');
        if (parseInt(el.dataset.year, 10) === year) {
          el.classList.add('text-h3', 'leading-h3');
        }
      });
    }

    yearsContainer.querySelectorAll('[data-year]').forEach((yearEl) => {
      yearEl.addEventListener('click', () => {
        updateSlide(parseInt(yearEl.dataset.year, 10));
      });
    });

    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + data.length) % data.length;
        updateSlide(data[currentIndex].year);
      });
    }

    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % data.length;
        updateSlide(data[currentIndex].year);
      });
    }

    updateSlide(data[0].year);
  });
});
