import { menuItems } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('privacy-menu');
  const contentBox = document.getElementById('privacy-content');

  menu.innerHTML = '';

  menuItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.className = 'hover:text-primary cursor-pointer';

    li.addEventListener('click', () => {
      [...menu.children].forEach((i) => i.classList.remove('text-primary'));
      li.classList.add('text-primary');
      contentBox.innerHTML = item.description;
    });

    if (index === 0) {
      li.classList.add('text-primary');
      contentBox.innerHTML = item.description;
    }

    menu.appendChild(li);
  });
});
