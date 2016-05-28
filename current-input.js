(function() {
  'use-strict';

  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var currentInput = '';
  var touchState = false;
  var touchTime = new Date();

  var touchEventsApi = 'ontouchstart' in window;
  var anyHover = window.matchMedia("(any-hover: hover)").matches;
  var pointerEvents = (function() {
    if ('PointerEvent' in window) return 'PointerEvent';
    if ('MSPointerEvent' in window) return 'MSPointerEvent';
  }());
  var maxTouchPoints = (function() {
    if (window.navigator.maxTouchPoints > 0) return 'maxTouchPoints';
    if (window.navigator.msMaxTouchPoints > 0) return 'msMaxTouchPoints';
  }());

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

  function handleTouchStart() {
    touchState = true;
    checkInputChange('touch');
  }

  function handleTouchEndCancel() {
    touchState = false;
    touchTime = new Date();
  }

  function handleMouseEnterDown() {
    if (!touchState && new Date() - touchTime > 500) checkInputChange('mouse');
  }

  function setTouchMouseEventListeners() {
    html.addEventListener('touchstart', handleTouchStart, true);
    html.addEventListener('touchend', handleTouchEndCancel, true);
    html.addEventListener('touchcancel', handleTouchEndCancel, true);
    html.addEventListener('mouseenter', handleMouseEnterDown, true);
    html.addEventListener('mousedown', handleMouseEnterDown, true);
  }

  function pointerTypeMap(rawType) {
    if (
      rawType === 'touch' ||
      rawType === 2 ||
      rawType === 'pen' ||
      rawType === 3
    ) {
      return 'touch';
    } else if (rawType === 'mouse' || rawType === 4) {
      return 'mouse';
    }
  }

  function handlePointerDown(e) {
    var pointerType = pointerTypeMap(e.pointerType);
    if (pointerType === 'touch') {
      handleTouchStart();
    } else if (pointerType === 'mouse') {
      handleMouseEnterDown();
    }
  }

  function handlePointerUpCancel(e) {
    if (pointerTypeMap(e.pointerType) === 'touch') handleTouchEndCancel();
  }

  function handlePointerEnter(e) {
    if (pointerTypeMap(e.pointerType) === 'mouse') handleMouseEnterDown();
  }

  function setPointerEventListeners() {
    if (pointerEvents === 'PointerEvent') {
      html.addEventListener('pointerdown', handlePointerDown, true);
      html.addEventListener('pointerup', handlePointerUpCancel, true);
      html.addEventListener('pointercancel', handlePointerUpCancel, true);
      html.addEventListener('pointerenter', handlePointerEnter, true);
    } else if (pointerEvents === 'MSPointerEvent') {
      html.addEventListener('MSPointerDown', handlePointerDown, true);
      html.addEventListener('MSPointerUp', handlePointerUpCancel, true);
      html.addEventListener('MSPointerCancel', handlePointerUpCancel, true);
      html.addEventListener('MSPointerEnter', handlePointerEnter, true);
    }
  }

  if (touchEventsApi && anyHover) {
    setTouchMouseEventListeners();
    setInitialCurrentInput();
  } else if (pointerEvents && maxTouchPoints && (anyHover === false)) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
  } else if (pointerEvents && maxTouchPoints){
    setPointerEventListeners();
    setInitialCurrentInput();
  } else if (touchEventsApi) {
    // touch only device, don't set listeners
    setDataAttribute('touch');
  } else {
    // mouse only device, don't set listeners
    setDataAttribute('mouse');
  }

}());
