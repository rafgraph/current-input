# Current Input (and the touch active state)

[Live example site][liveExampleSite] &#8212; [view on npm][onNpm]

Detects the current input being used (mouse or touch) and adds a class to the body indicating the current input type. Used with the appropriate CSS selectors and styling this will fix the [sticky hover problem][stickyHover] on touch devices and allow you to work with 3 interactive states in CSS - hover, active, and touch active.

`current-input` is as easy as set it and forget it, and is compatible with all modern browsers (both touch event and pointer event based browsers). It will automatically add the `current-input-mouse` or `current-input-touch` class to the `body` based on the current input type.

#### How it works
`current-input` uses [`detect-it`][detectIt] to determine if the device is `mouseOnly`, `touchOnly`, or `hybrid`. If the device is `mouseOnly` or `touchOnly` it sets the respective class on the `body` and does nothing more. If the device is a `hybrid`, then it uses [`the-listener`][theListener] to set up passive capture phase event listeners on the `window` to determine what input is currently being used and changes the class on the `body` in real time.



## Installing `current-input`
#### Add it to your app
```terminal
$ npm install current-input
```
And then import or require it in your app (it will run automatically on import or require).
```javascript
import 'current-input';
// OR
require('current-input');
```
#### Or add it to `index.html`
Alternatively you can add it directly to `index.html` as a script. The version that comes from the below CDN is minified and gziped with all dependencies included and will run automatically (or you can manually download `CurrentInput.min.js` from the CDN and serve it from your own server).
```html
<script src="https://unpkg.com/current-input@1.1.1/dist/CurrentInput.min.js"></script>
```

## Using `current-input`

`current-input` will run automatically and will add the class `current-input-mouse` or `current-input-touch` to the `body`. Use the appropriate CSS selectors to style elements based on the current input class.

#### CSS example
Here is an example using CSS to style links such that it fixes the sticky hover problem on touch devices and provides a unique touch active state. See the [live example site][liveExampleSite] for a live version of this example.


```CSS
/*
In this example, links will be:
- Black normally
- Green on hover
- Red on active
- Blue on touch active
*/

a {
  color: black;
}

.current-input-mouse a:hover {
  color: green;
}

.current-input-mouse a:active {
  color: red;
}

/* the touch active state */
.current-input-touch a:active {
  color: blue;
}
```

## Sticky hover problem
The sticky hover problem on touch devices occurs when you tap something that has a `:hover` state. The `:hover` state sticks until you tap someplace else on the screen. The reason for this is back in the early days of mobile, the web relied heavily on hover menus, so on mobile you could tap to see the hover menu. Sites are (or should) no longer be built this way, so now the sticky hover feature has become a bug that is the cause of some ugliness. `current-input` fixes the problem by allowing you to style the `:hover` state for mouse and touch inputs separately, so now you can only style the `:hover` state when the `current-input-mouse` class is present, and do nothing when the `current-input-touch` class is present, thus fixing the problem.

#### Thank you
The work put into `current-input` was made much easier by the excellent suite of [touch/pointer tests and demos][touchTests] put together by [Patrick H. Lauke][patrickHLauke]


[detectIt]: https://github.com/rafrex/detect-it
[theListener]: https://github.com/rafrex/the-listener
[stickyHover]: https://github.com/rafrex/current-input#sticky-hover-problem

[liveExampleSite]: http://current-input.rafrex.com
[onNpm]: https://www.npmjs.com/package/current-input/

[touchTests]: https://patrickhlauke.github.io/touch/
[patrickHLauke]: https://github.com/patrickhlauke
