export default function toggleViews(sectionId) {
  const section = document.getElementById(sectionId);
  const currentlyShown = document.querySelector('.toggle.show');

  if (section.classList.contains('bottom')) {
    currentlyShown.classList.add('top');
    section.classList.remove('bottom');
  } else {
    currentlyShown.classList.add('bottom');
    section.classList.remove('top');
  }

  currentlyShown.classList.add('hidden');
  currentlyShown.classList.remove('show');
  section.classList.add('show');
  section.classList.remove('hidden');
}