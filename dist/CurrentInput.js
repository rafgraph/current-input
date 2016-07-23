/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _detectIt = __webpack_require__(1);

	var _detectIt2 = _interopRequireDefault(_detectIt);

	var _theListener = __webpack_require__(6);

	var _theListener2 = _interopRequireDefault(_theListener);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setupCurrentInput() {
	  var body = document.querySelector('body');
	  var currentInput = undefined;

	  function updateCurrentInput(input) {
	    if (input !== currentInput) {
	      body.classList.remove('current-input-' + currentInput);
	      body.classList.add('current-input-' + input);
	      currentInput = input;
	    }
	  }

	  if (_detectIt2.default.deviceType === 'mouseOnly') updateCurrentInput('mouse');else if (_detectIt2.default.deviceType === 'touchOnly') {
	    updateCurrentInput('touch');
	    // add blank touch listener to body to enable :active state when touching the screen
	    (0, _theListener2.default)(body, { 'touchstart passive capture': function touchstartPassiveCapture() {} });
	  } else {
	    // add listeners for hybrid device
	    (0, _theListener2.default)(window, {
	      'touchstart passive capture': function touchstartPassiveCapture() {
	        updateCurrentInput('touch');
	      },
	      'mousedown mouseenter mousemove passive capture': function mousedownMouseenterMousemovePassiveCapture() {
	        updateCurrentInput('mouse');
	      }
	    }, { pointermove: false });
	    /* eslint no-unused-expressions: ["error", { "allowTernary": true }] */
	    _detectIt2.default.primaryHover === 'hover' ? updateCurrentInput('mouse') : updateCurrentInput('touch');
	  }
	}

	(function () {
	  var body = document.querySelector('body');
	  if (body) setupCurrentInput();else document.addEventListener('DOMContentLoaded', setupCurrentInput);
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _detectHover = __webpack_require__(2);

	var _detectHover2 = _interopRequireDefault(_detectHover);

	var _detectPointer = __webpack_require__(3);

	var _detectPointer2 = _interopRequireDefault(_detectPointer);

	var _detectTouchEvents = __webpack_require__(4);

	var _detectTouchEvents2 = _interopRequireDefault(_detectTouchEvents);

	var _detectPointerEvents = __webpack_require__(5);

	var _detectPointerEvents2 = _interopRequireDefault(_detectPointerEvents);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * detectIt object structure
	 * const detectIt = {
	 *   deviceType: 'mouseOnly' / 'touchOnly' / 'hybrid',
	 *   hasTouchEventsApi: boolean,
	 *   hasPointerEventsApi: boolean,
	 *   hasTouch: boolean,
	 *   maxTouchPoints: number,
	 *   primaryHover: 'hover' / 'none',
	 *   primaryPointer: 'fine' / 'coarse' / 'none',
	 *   state: {
	 *     detectHover,
	 *     detectPointer,
	 *     detectTouchEvents,
	 *     detectPointerEvents,
	 *   },
	 *   update() {...},
	 *   pointerEventsPrefix(value) {return value, value will only have prefix if requiresPrefix},
	 * }
	 */

	function robustMax(a, b) {
	  function isNum(value) {
	    return typeof value === 'number';
	  }
	  if (isNum(a) && isNum(b)) return Math.max(a, b);
	  if (isNum(a)) return a;
	  if (isNum(b)) return b;
	  return undefined;
	}

	function determineDeviceType(hasTouch, anyHover, anyFine) {
	  /*
	   * A hybrid device is one that both hasTouch and any input device can hover
	   * or has a fine pointer.
	   */
	  if (hasTouch && (anyHover || anyFine)) return 'hybrid';

	  /*
	   * In almost all cases a device that doesn’t support touch will have a mouse,
	   * but there may be rare exceptions. Note that it doesn’t work to do additional tests
	   * based on hover and pointer media queries as older browsers don’t support these.
	   * Essentially, 'mouseOnly' is the default.
	   */
	  return hasTouch ? 'touchOnly' : 'mouseOnly';
	}

	var detectIt = {
	  state: {
	    detectHover: _detectHover2.default,
	    detectPointer: _detectPointer2.default,
	    detectTouchEvents: _detectTouchEvents2.default,
	    detectPointerEvents: _detectPointerEvents2.default
	  },
	  update: function update() {
	    detectIt.state.detectHover.update();
	    detectIt.state.detectPointer.update();
	    detectIt.state.detectTouchEvents.update();
	    detectIt.state.detectPointerEvents.update();
	    detectIt.updateOnlyOwnProperties();
	  },
	  updateOnlyOwnProperties: function updateOnlyOwnProperties() {
	    if (typeof window !== 'undefined') {
	      detectIt.hasTouch = detectIt.state.detectTouchEvents.hasApi || detectIt.state.detectPointerEvents.hasTouch || false;

	      detectIt.deviceType = determineDeviceType(detectIt.hasTouch, detectIt.state.detectHover.anyHover, detectIt.state.detectPointer.anyFine);

	      detectIt.hasTouchEventsApi = detectIt.state.detectTouchEvents.hasApi;
	      detectIt.hasPointerEventsApi = detectIt.state.detectPointerEvents.hasApi;

	      detectIt.maxTouchPoints = robustMax(detectIt.state.detectTouchEvents.maxTouchPoints, detectIt.state.detectPointerEvents.maxTouchPoints);

	      detectIt.primaryHover = detectIt.state.detectHover.hover && 'hover' || detectIt.state.detectHover.none && 'none' ||
	      // if it's a mouseOnly device that doesn't support level 4 media queries,
	      // then assume it hovers
	      detectIt.deviceType === 'mouseOnly' && 'hover' ||
	      // if it's a touchOnly device that doesn't support level 4 media queries,
	      // then assume it doesn't hover, otherwise it's undefined
	      detectIt.deviceType === 'touchOnly' && 'none' || undefined;

	      detectIt.primaryPointer = detectIt.state.detectPointer.fine && 'fine' || detectIt.state.detectPointer.coarse && 'coarse' || detectIt.state.detectPointer.none && 'none' ||
	      // if it's a mouseOnly device that doesn't support level 4 media queries,
	      // then assume it has a fine pointer
	      detectIt.deviceType === 'mouseOnly' && 'fine' ||
	      // if it's a touchOnly device that doesn't support level 4 media queries,
	      // then assume it has a coarse pointer, otherwise it's undefined
	      detectIt.deviceType === 'touchOnly' && 'coarse' || undefined;
	    }
	  },

	  pointerEventsPrefix: _detectPointerEvents2.default.prefix
	};

	detectIt.updateOnlyOwnProperties();
	exports.default = detectIt;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var detectHover = {
	  update: function update() {
	    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
	      detectHover.hover = window.matchMedia('(hover: hover)').matches;
	      detectHover.none = window.matchMedia('(hover: none)').matches || window.matchMedia('(hover: on-demand)').matches;
	      detectHover.anyHover = window.matchMedia('(any-hover: hover)').matches;
	      detectHover.anyNone = window.matchMedia('(any-hover: none)').matches || window.matchMedia('(any-hover: on-demand)').matches;
	    }
	  }
	};

	detectHover.update();
	exports.default = detectHover;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var detectPointer = {
	  update: function update() {
	    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
	      detectPointer.fine = window.matchMedia('(pointer: fine)').matches;
	      detectPointer.coarse = window.matchMedia('(pointer: coarse)').matches;
	      detectPointer.none = window.matchMedia('(pointer: none)').matches;
	      detectPointer.anyFine = window.matchMedia('(any-pointer: fine)').matches;
	      detectPointer.anyCoarse = window.matchMedia('(any-pointer: coarse)').matches;
	      detectPointer.anyNone = window.matchMedia('(any-pointer: none)').matches;
	    }
	  }
	};

	detectPointer.update();
	exports.default = detectPointer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var detectTouchEvents = {
	  update: function update() {
	    if (typeof window !== 'undefined') {
	      detectTouchEvents.hasApi = 'ontouchstart' in window;
	      detectTouchEvents.maxTouchPoints = detectTouchEvents.hasApi ? window.navigator && window.navigator.maxTouchPoints : undefined;
	    }
	  }
	};

	detectTouchEvents.update();
	exports.default = detectTouchEvents;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var prefixMap = {
	  pointerdown: 'MSPointerDown',
	  pointerup: 'MSPointerUp',
	  pointercancel: 'MSPointerCancel',
	  pointermove: 'MSPointerMove',
	  pointerover: 'MSPointerOver',
	  pointerout: 'MSPointerOut',
	  pointerenter: 'MSPointerEnter',
	  pointerleave: 'MSPointerLeave',
	  gotpointercapture: 'MSGotPointerCapture',
	  lostpointercapture: 'MSLostPointerCapture',
	  maxTouchPoints: 'msMaxTouchPoints'
	};

	/*
	 * detectPointerEvents object structure
	 * const detectPointerEvents = {
	 *   hasApi: boolean,
	 *   requiresPrefix: boolean,
	 *   hasTouch: boolean,
	 *   maxTouchPoints: number,
	 *   update() {...},
	 *   prefix(value) {return value, value will only have prefix if requiresPrefix === true},
	 * }
	 */
	var detectPointerEvents = {
	  update: function update() {
	    if (typeof window !== 'undefined') {
	      // reference for detection https://msdn.microsoft.com/en-us/library/dn433244(v=vs.85).aspx
	      if ('PointerEvent' in window) {
	        detectPointerEvents.hasApi = true;
	        detectPointerEvents.requiresPrefix = false;

	        // reference for detection https://msdn.microsoft.com/library/hh673557(v=vs.85).aspx
	      } else if (window.navigator && 'msPointerEnabled' in window.navigator) {
	        detectPointerEvents.hasApi = true;
	        detectPointerEvents.requiresPrefix = true;
	      } else {
	        detectPointerEvents.hasApi = false;
	        detectPointerEvents.requiresPrefix = undefined;
	      }
	      detectPointerEvents.maxTouchPoints = detectPointerEvents.hasApi && window.navigator && window.navigator[detectPointerEvents.prefix('maxTouchPoints')] || undefined;
	      detectPointerEvents.hasTouch = detectPointerEvents.hasApi ? detectPointerEvents.maxTouchPoints > 0 : undefined;
	    }
	  },
	  prefix: function prefix(value) {
	    return detectPointerEvents.requiresPrefix && prefixMap[value] || value;
	  }
	};

	detectPointerEvents.update();
	exports.default = detectPointerEvents;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addListener;

	var _detectIt = __webpack_require__(1);

	var _detectIt2 = _interopRequireDefault(_detectIt);

	var _eventMaps = __webpack_require__(7);

	var _detectPassiveSupport = __webpack_require__(8);

	var _detectPassiveSupport2 = _interopRequireDefault(_detectPassiveSupport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function TouchState(target) {
	  var _this = this;

	  this.start = undefined;
	  this.end = undefined;
	  this.active = false;
	  var options = _detectPassiveSupport2.default ? { passive: true, capture: true } : true;
	  target.addEventListener('touchstart', function () {
	    _this.start = new Date();_this.active = true;
	  }, options);
	  target.addEventListener('touchend', function () {
	    _this.end = new Date();_this.active = false;
	  }, options);
	  target.addEventListener('touchcancel', function () {
	    _this.end = new Date();_this.active = false;
	  }, options);
	}

	function TouchStartState(target) {
	  var _this2 = this;

	  this.start = undefined;
	  var options = _detectPassiveSupport2.default ? { passive: true, capture: true } : true;
	  target.addEventListener('touchstart', function () {
	    _this2.start = new Date();
	  }, options);
	}

	function setTouchListener(_ref) {
	  var target = _ref.target;
	  var event = _ref.event;
	  var handler = _ref.handler;
	  var listenerOptions = _ref.listenerOptions;
	  var touchState = _ref.touchState;

	  if (_eventMaps.touchEventsMap[event]) target.addEventListener(event, handler, listenerOptions);else if (event === 'click') {
	    (function () {
	      var touch = touchState || new TouchStartState(target);
	      target.addEventListener('touchend', function (e) {
	        if (new Date() - touch.start < 500) handler(e);
	      }, listenerOptions);
	    })();
	  }
	}

	function setMouseListener(_ref2) {
	  var target = _ref2.target;
	  var event = _ref2.event;
	  var handler = _ref2.handler;
	  var listenerOptions = _ref2.listenerOptions;

	  if (_eventMaps.mouseEventsMap[event]) target.addEventListener(event, handler, listenerOptions);
	}

	function setHybridListener(_ref3) {
	  var target = _ref3.target;
	  var event = _ref3.event;
	  var handler = _ref3.handler;
	  var listenerOptions = _ref3.listenerOptions;
	  var touchState = _ref3.touchState;

	  setTouchListener({ target: target, event: event, handler: handler, listenerOptions: listenerOptions, touchState: touchState });
	  if (_eventMaps.mouseEventsMap[event]) {
	    target.addEventListener(event, function (e) {
	      if (!touchState.active && new Date() - touchState.end > 600) handler(e);
	    }, listenerOptions);
	  }
	}

	function setPointerListener(_ref4) {
	  var target = _ref4.target;
	  var event = _ref4.event;
	  var handler = _ref4.handler;
	  var listenerOptions = _ref4.listenerOptions;
	  var pointerOptions = _ref4.pointerOptions;

	  var ptrTouchEvent = _eventMaps.touchEventsMap[event];
	  var ptrMouseEvent = _eventMaps.mouseEventsMap[event];
	  if (pointerOptions && (pointerOptions[ptrTouchEvent] === false || pointerOptions[ptrMouseEvent] === false)) return;
	  function pointerType(e) {
	    if (['touch', 2, 'pen', 3].indexOf(e.pointerType) !== -1) return 'touch';
	    if (['mouse', 4].indexOf(e.pointerType) !== -1) return 'mouse';
	    return undefined;
	  }
	  var pfix = _detectIt2.default.pointerEventsPrefix;
	  if (ptrMouseEvent === 'click' || ptrMouseEvent === 'dblclick') {
	    target.addEventListener(ptrMouseEvent, handler, listenerOptions);
	  } else if (ptrMouseEvent) {
	    target.addEventListener(pfix(ptrMouseEvent), function (e) {
	      if (pointerType(e) === 'mouse') handler(e);
	    }, listenerOptions);
	  } else if (ptrTouchEvent) {
	    target.addEventListener(pfix(ptrTouchEvent), function (e) {
	      if (pointerType(e) === 'touch') handler(e);
	    }, listenerOptions);
	  }
	}

	function getListenerType() {
	  var dIt = _detectIt2.default;
	  if (dIt.deviceType === 'mouseOnly') return setMouseListener;
	  if (dIt.deviceType === 'touchOnly' && dIt.hasTouchEventsApi) return setTouchListener;
	  if (dIt.deviceType === 'hybrid' && dIt.hasTouchEventsApi) return setHybridListener;
	  if (dIt.hasTouch && dIt.hasPointerEventsApi) return setPointerListener;
	  return undefined;
	}

	function getListenerOptions(passive, capture) {
	  if (!passive || !_detectPassiveSupport2.default) return capture;
	  return { capture: capture, passive: passive };
	}

	function parseKey(key) {
	  var eventsAndOptions = key.split(' ');
	  return {
	    events: eventsAndOptions.filter(function (value) {
	      return value !== 'passive' && value !== 'capture';
	    }),
	    listenerOptions: getListenerOptions(eventsAndOptions.indexOf('passive') !== -1, eventsAndOptions.indexOf('capture') !== -1)
	  };
	}

	function addListener(target, eventsAndHandlers, pointerOptions) {
	  var setListener = getListenerType();
	  var touchState = setListener === setHybridListener ? new TouchState(target) : undefined;
	  Object.keys(eventsAndHandlers).forEach(function (key) {
	    var handler = eventsAndHandlers[key];

	    var _parseKey = parseKey(key);

	    var events = _parseKey.events;
	    var listenerOptions = _parseKey.listenerOptions;

	    events.forEach(function (event) {
	      setListener({ target: target, event: event, handler: handler, listenerOptions: listenerOptions, touchState: touchState, pointerOptions: pointerOptions });
	    });
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mouseEventsMap = {
	  click: 'click',
	  dblclick: 'dblclick',
	  mousedown: 'pointerdown',
	  mouseup: 'pointerup',
	  mouseenter: 'pointerenter',
	  mouseleave: 'pointerleave',
	  mouseover: 'pointerover',
	  mouseout: 'pointerout',
	  mousemove: 'pointermove'
	};

	var touchEventsMap = {
	  touchstart: 'pointerdown',
	  touchend: 'pointerup',
	  touchmove: 'pointermove',
	  touchcancel: 'pointercancel'
	};

	exports.mouseEventsMap = mouseEventsMap;
	exports.touchEventsMap = touchEventsMap;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// adapted from https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
	var passive = false;
	try {
	  var options = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      passive = true;
	    }
	  });
	  window.addEventListener('test', null, options);
	} catch (e) {}

	var hasPassive = passive;
	exports.default = hasPassive;

/***/ }
/******/ ]);