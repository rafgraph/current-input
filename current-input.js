(function() {
  'use-strict';

  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var currentInput = 'none';
  var touchState = false;
  var touchTime = new Date();

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
    setTouchMouseEventListeners();
    setInitialCurrentInput();
  } else if (touchEventsApi || (pointerEvents && maxTouchPoints &&
    (anyHover === false && anyPointerFine === false))) {
    // required for active state to be enabled when touching the screen
    addBlankTouchListenerToBody();
    // touch only device, don't set listeners
    setCurrentInputClass('touch');
  } else if (pointerEvents && maxTouchPoints){
    // hybrid device with pointer events api
    setPointerEventListeners();
    setInitialCurrentInput();
  } else {
    // mouse only device, don't set listeners
    setCurrentInputClass('mouse');
  }


  // set current input functions
  function setCurrentInputClass(input) {
    body.classList.remove('current-input-' + currentInput);
    body.classList.add('current-input-' + input);
  }

  function checkInputChange(input) {
    if (input !== currentInput) {
      setCurrentInputClass(input);
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


  // touch and mouse event functions
  function handleTouchStart() {
    touchState = true;
    checkInputChange('touch');
  }

  function handleTouchEndCancel() {
    touchState = false;
    touchTime = new Date();
  }

  function handleMouseMoveEnterDown() {
    // set state syncronously, no setTimeouts
    // currentInput !== 'mouse' is redundent with checkInputChange('mouse'),
    // but it short circuts the if clause without calling new Date()
    // on every mousemove event.
    if (!touchState && currentInput !== 'mouse' &&
      new Date() - touchTime > 500) {
        checkInputChange('mouse');
      }
  }

  function setTouchMouseEventListeners() {
    html.addEventListener('touchstart', handleTouchStart, true);
    html.addEventListener('touchend', handleTouchEndCancel, true);
    html.addEventListener('touchcancel', handleTouchEndCancel, true);
    html.addEventListener('mouseenter', handleMouseMoveEnterDown, true);
    html.addEventListener('mousedown', handleMouseMoveEnterDown, true);
    html.addEventListener('mousemove', handleMouseMoveEnterDown, true);
    // have to use mousemove listener because on hybrid chrome
    // touch events cause the mouse to disappear (good), and it doesn't
    // reappear until it's moved (good), but it only fires mousemove
    // events without firing a mouseenter event, despite re-entering the screen.
    // Note that MS Edge fires a pointerenter event when the mouse reappears,
    // so there is no need to set a pointermove listener.
  }

  function addBlankTouchListenerToBody() {
    html.addEventListener('touchstart', function(){}, false);
  }


  // pointer event functions
  function handlePointerEvent(e) {
    var rawType = e.pointerType;
    if (
      rawType === 'touch' ||
      rawType === 2 ||
      rawType === 'pen' ||
      rawType === 3
    ) {
      checkInputChange('touch');
    } else if (rawType === 'mouse' || rawType === 4) {
      checkInputChange('mouse');
    }
  }

  function setPointerEventListeners() {
    if (pointerEvents === 'PointerEvent') {
      html.addEventListener('pointerdown', handlePointerEvent, true);
      html.addEventListener('pointerenter', handlePointerEvent, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      html.addEventListener('MSPointerDown', handlePointerEvent, true);
      html.addEventListener('MSPointerEnter', handlePointerEvent, true);
    }
  }

}());
