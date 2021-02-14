import loadOptions from './options.js';
import toggleViews from './toggleViews.js';

window.addEventListener('load', loadOptions);

document.querySelectorAll('.options > .option').forEach(option => option.addEventListener('click', () => {
  option.classList.contains('drive') ? toggleViews('drive') : toggleViews('ride');
}));