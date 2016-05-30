(function() {
  'use-strict';

  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var currentInput = '';

  var touchEventsApi = 'ontouchstart' in window;
  var anyHover = window.matchMedia("(any-hover: hover)").matches;
  var anyPointerFine = window.matchMedia("(any-pointer: fine)").matches;
  var pointerEvents = (function() {
    if ('PointerEvent' in window) return 'PointerEvent';
    if ('MSPointerEvent' in window) return 'MSPointerEvent';
  }());
  var maxTouchPoints = (function() {
    if (window.navigator.maxTouchPoints > 0) return 'maxTouchPoints';
    if (window.navigator.msMaxTouchPoints > 0) return 'msMaxTouchPoints';
  }());

  // set up based on device type
  if (touchEventsApi && (anyHover || anyPointerFine)) {
    // hybrid device with touch events api
    setTouchEventListeners();
    setInitialCurrentInput();
  } else if (pointerEvents && maxTouchPoints &&
    (anyHover === false && anyPointerFine === false)) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
  } else if (pointerEvents && maxTouchPoints){
    addPointerEventListeners();
    setInitialCurrentInput();
  } else if (touchEventsApi) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
  } else {
    // mouse only device, don't set listeners
    setDataAttribute('mouse');
  }

  // set current input functions
  function setDataAttribute(input) {
    body.dataset.currentinput = input;
  }

  function checkInputChange(input) {
    if (input !== currentInput) {
      setDataAttribute(input);
      currentInput = input;
    }
  }

  function setInitialCurrentInput() {
    // set initial current input based on primary input;
    if (window.matchMedia("(hover: hover)").matches) {
      checkInputChange('mouse');
    } else {
      checkInputChange('touch');
    }
  }

  // touch and mouse events functions
  function handleTouchStart() {
    checkInputChange('touch');
    removeMouseEventListeners();
  }

  function handleTouchEndCancel() {
    setTimeout(function() {
      setMouseEventListeners();
    }, 500);
  }

  function handleMouseMoveDown() {
    checkInputChange('mouse');
    removeMouseEventListeners();
  }

  function setTouchEventListeners() {
    html.addEventListener('touchstart', handleTouchStart, true);
    html.addEventListener('touchend', handleTouchEndCancel, true);
    html.addEventListener('touchcancel', handleTouchEndCancel, true);
  }

  function setMouseEventListeners() {
    html.addEventListener('mousemove', handleMouseMoveDown, true);
    html.addEventListener('mousedown', handleMouseMoveDown, true);
  }

  function removeMouseEventListeners() {
    html.removeEventListener('mousemove', handleMouseMoveDown, true);
    html.removeEventListener('mousedown', handleMouseMoveDown, true);
  }

  // pointer events functions
  function mapPointerType(rawType) {
    if (
      rawType === 'touch' || rawType === 2 ||
      rawType === 'pen' || rawType === 3
    ) {
      return 'touch';
    } else if (rawType === 'mouse' || rawType === 4) {
      return 'mouse';
    }
  }

  function handlePointerDown(e) {
    checkInputChange(mapPointerType(e.pointerType));
  }

  function handlePointerUpCancel(e) {
    if (mapPointerType(e.pointerType) === 'touch') {
      if (pointerEvents === 'PointerEvent') {
        html.addEventListener('pointermove', handlePointerMove, true);
      } else if (pointerEvents === 'MSPointerEvent') {
        html.addEventListener('MSPointerMove', handlePointerMove, true);
      }
    }
  }

  function handlePointerMove(e) {
    if (mapPointerType(e.pointerType) === 'mouse') {
      checkInputChange('mouse');
      if (pointerEvents === 'PointerEvent') {
        html.removeEventListener('pointermove', handlePointerMove, true);
      } else if (pointerEvents === 'MSPointerEvent') {
        html.removeEventListener('MSPointerMove', handlePointerMove, true);
      }
    }
  }

  function addPointerEventListeners() {
    if (pointerEvents === 'PointerEvent') {
      html.addEventListener('pointerdown', handlePointerDown, true);
      html.addEventListener('pointerup', handlePointerUpCancel, true);
      html.addEventListener('pointercancel', handlePointerUpCancel, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      html.addEventListener('MSPointerDown', handlePointerDown, true);
      html.addEventListener('MSPointerUp', handlePointerUpCancel, true);
      html.addEventListener('MSPointerCancel', handlePointerUpCancel, true);
    }
  }

}());
