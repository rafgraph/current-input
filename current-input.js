(function() {
  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var currentInput = '';
  var touchState = false;
  var touchTime = new Date();

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

  // if ('ontouchstart' in window) {
    html.addEventListener('touchstart', handleTouchStart, true);
    html.addEventListener('touchend', handleTouchEndCancel, true);
    html.addEventListener('touchcancel', handleTouchEndCancel, true);
  // }

  html.addEventListener('mouseenter', handleMouseEnterDown, true);
  html.addEventListener('mousedown', handleMouseEnterDown, true);

}())
