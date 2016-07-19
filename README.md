# Current Input

[Live example][liveExample] &#8212; [view on npm][onNpm]

Detects the current input being used (mouse or touch) and adds a class to the body indicating the current input type. Used with the appropriate CSS selectors and styling this will fix the [sticky hover problem][stickyHover] on touch devices and allow you to work with 3 interactive pseudo states in CSS - hover, active, and touch active.

`current-input` is as easy as set it and forget it, and is compatible with all modern browsers (both touch event and pointer event based browsers). It will automatically add the `current-input-mouse` or `current-input-touch` class to the `body` based on the current input type.

#### How it works
`current-input` uses [`detect-it`][detectIt] to determine if the device is `mouseOnly`, `touchOnly`, or `hybrid`. If the device is `mouseOnly` or `touchOnly` it sets the respective class on the `body` and does nothing more. If the device is a `hybrid`, then it uses [`the-listener`][theListener] to set up passive capture phase event listeners on the `html` to determine what input is currently being used and changes the class on the `body` in real time.



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
Alternatively you can add it directly to `index.html` as a script. The version that comes from the below CDN is minified with all dependencies included and will run automatically (or you can download `current-input.min.js` from the `dist` directory in the GitHub repo and serve it from your own server).
```html
<script src="https://npmcdn.com/current-input/dist/current-input.min.js"></script>
```

## Using `current-input`

`current-input` will run automatically and will add the class `current-input-mouse` or `current-input-touch` to the `body`. Use the appropriate CSS selectors to style elements and pseudo states based on the current input class.

#### CSS example
Here is an example using CSS to style links such that it fixes the sticky hover problem on touch devices and provides a unique touch active pseudo state.


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

a:hover {
  color: green;
}

a:active {
  color: red;
}

/* this must match the standard style to fix the sticky hover problem */
.current-input-touch a:hover {
  color: black;
}

/* the touch active pseudo state */
.current-input-touch a:active {
  color: blue;
}
```

Note that the `current-input-mouse` class is not used as a CSS selector. The default state for `:hover` and `:active` assumes that the current input is a mouse, and are overridden when the current input is touch. It is best to style CSS this way (assume mouse, and modify for touch) so that your site works normally on legacy browsers that don't support `current-input`'s detection tests.

## Sticky hover problem
The sticky hover problem on touch devices occurs when you tap something that has a `:hover` state. The `:hover` state sticks until you tap someplace else on the screen (or on another link in some mobile browsers). The reason for this is back in the early days of mobile the web relied heavily on hover menus, so on mobile you could tap to see the hover menu. Sites are (or should) no longer be built this way, so now the sticky hover feature has become a bug that is the cause of some ugliness. `current-input` fixes the problem by allowing you to style the `:hover` state for mouse and touch inputs separately, so when the class `current-input-touch` is present, you can style the `:hover` state for an element the same as when it's not in the `:hover` state, thus fixing the problem.

Test out the [live example][liveExample] on a touch device to see the sticky hover problem and solution for yourself.

[liveExample]: http://current-input.rafrex.com
[onNpm]: https://www.npmjs.com/package/current-input
[detectIt]: https://github.com/rafrex/detect-it
[theListener]: https://github.com/rafrex/the-listener
[stickyHover]: https://github.com/rafrex/current-input#sticky-hover-problem