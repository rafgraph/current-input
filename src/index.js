import detectIt from 'detect-it';
import addListener from 'the-listener';

function setupCurrentInput() {
  const body = document.querySelector('body');
  let currentInput = undefined;

  function updateCurrentInput(input) {
    if (input !== currentInput) {
      body.classList.remove(`current-input-${currentInput}`);
      body.classList.add(`current-input-${input}`);
      currentInput = input;
    }
  }

  if (detectIt.deviceType === 'mouseOnly') updateCurrentInput('mouse');
  else if (detectIt.deviceType === 'touchOnly') {
    updateCurrentInput('touch');
    // add blank touch listener to body to enable :active state when touching the screen
    addListener(body, { 'touchstart passive capture': () => {} });
  } else {
    // add listeners for hybrid device
    addListener(window,
      {
        'touchstart passive capture': () => { updateCurrentInput('touch'); },
        'mousedown mouseenter mousemove passive capture': () => { updateCurrentInput('mouse'); },
      },
      { pointermove: false }
    );
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
    detectIt.primaryHover === 'hover' ? updateCurrentInput('mouse') : updateCurrentInput('touch');
  }

  document.removeEventListener('DOMContentLoaded', setupCurrentInput);
}

(() => {
  const body = document.querySelector('body');
  if (body) setupCurrentInput();
  else document.addEventListener('DOMContentLoaded', setupCurrentInput);
})();
