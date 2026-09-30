const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  links.classList.toggle('open', !expanded);
});
