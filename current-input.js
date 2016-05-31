(function() {
  'use-strict';

  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var currentInput = '';
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

  function setDataAttribute(input) {
    // body.dataset.currentinput = input;

    if (currentInput !== '') body.classList.remove(currentInput);
    body.classList.add(input);
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

  function handleTouchStart() {
    touchState = true;
    checkInputChange('touch');
  }

  function handleTouchEndCancel() {
    touchState = false;
    touchTime = new Date();
  }

  function handleMouseMoveEnterDown() {
    if (!touchState && new Date() - touchTime > 500) checkInputChange('mouse');
  }

  function setTouchMouseEventListeners() {
    html.addEventListener('touchstart', handleTouchStart, true);
    html.addEventListener('touchend', handleTouchEndCancel, true);
    html.addEventListener('touchcancel', handleTouchEndCancel, true);
    html.addEventListener('mouseenter', handleMouseMoveEnterDown, true);
    html.addEventListener('mousedown', handleMouseMoveEnterDown, true);
    html.addEventListener('mousemove', handleMouseMoveEnterDown, true);
  }

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
      // html.addEventListener('pointermove', handlePointerEvent, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      html.addEventListener('MSPointerDown', handlePointerEvent, true);
      html.addEventListener('MSPointerEnter', handlePointerEvent, true);
      // html.addEventListener('MSPointerMove', handlePointerEvent, true);
    }
  }


  function addBlankTouchListenerToBody() {
    html.addEventListener('touchstart', function(){}, false);
  }


  if (touchEventsApi && (anyHover || anyPointerFine)) {
    // hybrid device with touch events api
    setTouchMouseEventListeners();
    setInitialCurrentInput();
    // body.dataset.test = 'hybrid';
    body.classList.add('hybrid');

  } else if (pointerEvents && maxTouchPoints &&
    (anyHover === false && anyPointerFine === false)) {
    // touch only device, don't set listeners
    addBlankTouchListenerToBody();
    setDataAttribute('touch');
    // body.dataset.test = 'touch-only';
    body.classList.add('touch-only');

  } else if (pointerEvents && maxTouchPoints){
    setPointerEventListeners();
    setInitialCurrentInput();
    // body.dataset.test = 'hybrid';
    body.classList.add('hybrid');

  } else if (touchEventsApi) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
    // required for active state to be enabled when touching the screen
    addBlankTouchListenerToBody();
    // body.dataset.test = 'touch-only';
    body.classList.add('touch-only');

  } else {
    // mouse only device, don't set listeners
    setDataAttribute('mouse');
    // body.dataset.test = 'mouse-only';
    body.classList.add('mouse-only');

  }

}());
