import detectIt from 'detect-it';
import addListener from 'the-listener';

function setupCurrentInput() {

}

(() => {
  const body = document.querySelector('body');
  if (body) setupCurrentInput();
  else document.addEventListener('DOMContentLoaded', setupCurrentInput);
})();
