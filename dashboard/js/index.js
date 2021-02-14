import loadOptions from './options.js';
import toggleViews from './toggleViews.js';

window.addEventListener('load', loadOptions);

//show drive / ride section
document.querySelectorAll('.options > .option').forEach(option => option.addEventListener('click', () => {
  option.classList.contains('drive') ? toggleViews('drive') : toggleViews('ride');
}));

//go back to home section
document.querySelectorAll('i.back-home').forEach(arrow => arrow.addEventListener('click', () => {
  toggleViews('home')
}));