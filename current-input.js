(function() {
  'use-strict';

  var body = document.querySelector('body');
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
    setMouseEventListeners();
    setInitialCurrentInput();
  } else if (pointerEvents && maxTouchPoints &&
    (anyHover === false && anyPointerFine === false)) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
  } else if (pointerEvents && maxTouchPoints){
    setPointerDownUpCancelEventListeners();
    setPointerMoveEventListener();
    setInitialCurrentInput();
  } else if (touchEventsApi) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
    // required for active state to be enabled when touching the screen
    addBlankTouchListenerToBody();
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
    body.addEventListener('touchstart', handleTouchStart, true);
    body.addEventListener('touchend', handleTouchEndCancel, true);
    body.addEventListener('touchcancel', handleTouchEndCancel, true);
  }

  function setMouseEventListeners() {
    body.addEventListener('mousemove', handleMouseMoveDown, true);
    body.addEventListener('mousedown', handleMouseMoveDown, true);
  }

  function removeMouseEventListeners() {
    body.removeEventListener('mousemove', handleMouseMoveDown, true);
    body.removeEventListener('mousedown', handleMouseMoveDown, true);
  }

  function addBlankTouchListenerToBody() {
    body.addEventListener('touchstart', function(){}, false);
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
    removePointerMoveEventListner();
  }

  function handlePointerUpCancel(e) {
    if (mapPointerType(e.pointerType) === 'touch') {
      setPointerMoveEventListener();
    }
  }

  function handlePointerMove(e) {
    if (mapPointerType(e.pointerType) === 'mouse') {
      checkInputChange('mouse');
      removePointerMoveEventListner();
    }
  }

  function setPointerDownUpCancelEventListeners() {
    if (pointerEvents === 'PointerEvent') {
      body.addEventListener('pointerdown', handlePointerDown, true);
      body.addEventListener('pointerup', handlePointerUpCancel, true);
      body.addEventListener('pointercancel', handlePointerUpCancel, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      body.addEventListener('MSPointerDown', handlePointerDown, true);
      body.addEventListener('MSPointerUp', handlePointerUpCancel, true);
      body.addEventListener('MSPointerCancel', handlePointerUpCancel, true);
    }
  }

  function setPointerMoveEventListener() {
    if (pointerEvents === 'PointerEvent') {
      body.addEventListener('pointermove', handlePointerMove, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      body.addEventListener('MSPointerMove', handlePointerMove, true);
    }
  }

  function removePointerMoveEventListner() {
    if (pointerEvents === 'PointerEvent') {
      body.removeEventListener('pointermove', handlePointerMove, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      body.removeEventListener('MSPointerMove', handlePointerMove, true);
    }
  }

}());
