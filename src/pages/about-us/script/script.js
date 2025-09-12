import { sliderData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const yearsContainer = document.getElementById('years-container');
  const imageElement = document.getElementById('slider-image');
  const titleElement = document.getElementById('slider-title');
  const descriptionElement = document.getElementById('slider-description');
  const leftArrow = document.querySelector('img[alt="Left Arrow"]');
  const rightArrow = document.querySelector('img[alt="Right Arrow"]');

  let currentIndex = 0;

  function updateSlide(year) {
    const slide = sliderData.find((item) => item.year === year);
    if (!slide) return;

    currentIndex = sliderData.findIndex((item) => item.year === year);

    imageElement.src = slide.image;
    titleElement.textContent = slide.title;
    descriptionElement.textContent = slide.description;

    // подсветка выбранного года
    yearsContainer.querySelectorAll('[data-year]').forEach((el) => {
      el.classList.remove('text-h3', 'leading-h3'); // убираем активный стиль
      if (parseInt(el.dataset.year, 10) === year) {
        el.classList.add('text-h3', 'leading-h3'); // добавляем активный стиль
      }
    });
  }

  // события по клику на год
  yearsContainer.querySelectorAll('[data-year]').forEach((yearEl) => {
    yearEl.addEventListener('click', () => {
      updateSlide(parseInt(yearEl.dataset.year, 10));
    });
  });

  // стрелка влево
  leftArrow.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sliderData.length) % sliderData.length;
    updateSlide(sliderData[currentIndex].year);
  });

  // стрелка вправо
  rightArrow.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sliderData.length;
    updateSlide(sliderData[currentIndex].year);
  });

  // дефолт — первый слайд
  updateSlide(sliderData[0].year);
});
