(function() {
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

  function setPointerEventListeners() {

  }

  if (touchEventsApi && anyHover) {
    setTouchMouseEventListeners();
  } else if (pointerEvents && maxTouchPoints){
    setPointerEventListeners();
  } else if (touchEventsApi) {
    setDataAttribute('touch');
  } else {
    setDataAttribute('mouse');
  }

}());
