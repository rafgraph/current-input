import * as detectIt from 'detect-it';
import { eventFrom } from 'event-from';

function setupCurrentInput() {
  const body = document.querySelector('body');

  type CurrentInput = 'mouse' | 'touch';

  // set initial state based on primaryInput
  let currentInput: CurrentInput = detectIt.primaryInput;
  body?.classList.add(`current-input-${currentInput}`);

  const eventHandler = (e: any) => {
    const eventFromValue = eventFrom(e);
    if (
      eventFromValue !== currentInput &&
      (eventFromValue === 'mouse' || eventFromValue === 'touch')
    ) {
      body?.classList.remove(`current-input-${currentInput}`);
      body?.classList.add(`current-input-${eventFromValue}`);
      currentInput = eventFromValue;
    }
  };

  const eventListenerOptions = detectIt.supportsPassiveEvents
    ? { passive: true, capture: true }
    : true;

  // set event listeners
  [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'pointerenter',
    'pointerover',
    'pointermove',
    'pointerout',
    'pointerleave',
    'pointerdown',
    'pointerup',
    'pointercancel',
    'mouseenter',
    'mouseover',
    'mousemove',
    'mouseout',
    'mouseleave',
    'mousedown',
    'mouseup',
  ].map((eventType) => {
    document.addEventListener(eventType, eventHandler, eventListenerOptions);
  });

  // remove event listener set by launcher (if no event listener was set this does nothing)
  document.removeEventListener('DOMContentLoaded', setupCurrentInput);
}

(() => {
  const body = document.querySelector('body');
  if (body) setupCurrentInput();
  else document.addEventListener('DOMContentLoaded', setupCurrentInput);
})();
