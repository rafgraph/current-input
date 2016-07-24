import detectIt from 'detect-it';
import addListener from 'the-listener';

function setupCurrentInput() {
  const body = document.querySelector('body');
  let currentInput = undefined;

  // set current input class on body
  function updateCurrentInput(input) {
    if (input !== currentInput) {
      body.classList.remove(`current-input-${currentInput}`);
      body.classList.add(`current-input-${input}`);
      currentInput = input;
    }
  }

  // setup based on device type
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

        /**
         * Have to use mousemove listener because on hybrid chrome
         * touch events cause the mouse to disappear (good), and it doesn't
         * reappear until it's moved (good), but it only fires mousemove
         * events without firing a mouseenter event, despite re-entering the screen.
         * Note that MS Edge fires a pointerenter event when the mouse reappears,
         * so there is no need to set a pointermove listener.
         */
        'mousedown mouseenter mousemove passive capture': () => { updateCurrentInput('mouse'); },
      },
      { pointermove: false }
    );

    // set initial current input state based on if the primary input can hover
    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
    detectIt.primaryHover === 'hover' ? updateCurrentInput('mouse') : updateCurrentInput('touch');
  }

  // remove event listener set by launcher (if no event listener was set this does nothing)
  document.removeEventListener('DOMContentLoaded', setupCurrentInput);
}

// launcher - calls setupCurrentInput() only after have access to the body
(() => {
  const body = document.querySelector('body');
  if (body) setupCurrentInput();
  else document.addEventListener('DOMContentLoaded', setupCurrentInput);
})();
