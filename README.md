# Current Input

Detects the current input being used (mouse or touch) and adds a class to the body indicating the current input type. Used with the proper CSS styling this will fix the sticky hover problem on touch devices and allow you to work with 3 interactive pseudo states in CSS - hover, active, and touch active.

`current-input` is as easy as set it and forget it, and is compatible with all modern browsers (both touch event and pointer event based browsers). It will automatically add the `current-input-mouse` or `current-input-touch` class to the `body` based on the current input being used.

#### How it works
`current-input` uses [`detect-it`](todo) to determine if the device is `mouseOnly`, `touchOnly`, or `hybrid`. If the device is `mouseOnly` or `touchOnly` it sets the respective class on the `body` and does nothing more. If the device is a `hybrid`, then it uses [`the-listener`](todo) to set up listeners on the `html` to determine what input is currently being used.



## Installing `current-input`
#### Add it to your app
```terminal
$ npm install current-input
```
...and then import or require it in your app (it will run automatically on import or require).
```javascript
import 'current-input';
// OR
require('current-input');
```
#### Or add it to `index.html`
Alternatively you can add it directly to `index.html` as a script. The version that comes from the cdn is minified with all dependencies included and will run automatically.
```html
<script src="https://npmcdn.com/current-input/dist/current-input.min.js"></script>
```

## Using `current-input`

`current-input` will add the class `current-input-mouse` or `current-input-touch` to the body based on the current input being used. Use the appropriate CSS selectors to style elements and pseudo states based on the current input type.

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

Note that the `current-input-mouse` class was not used as a CSS selector. The default state of `hover` and `active` assumed that the input is a mouse, and are only overridden when the input is touch. It is best to style CSS this way (assume mouse, and modify for touch) so that your site works normally on legacy browsers that don't support `current-input`'s detection tests.

## Sticky hover problem
The sticky hover problem on touch devices occurs when you tap something that has a `:hover` state. The `:hover` state sticks until you tap someplace else on the screen (or on another link in some mobile browsers). The reason for this is back in the early days of mobile, the web relied heavily on hover menus, so on mobile you could tap to see the hover menu. Sites are (or should) no longer be built this way, so now the sticky hover feature has become a bug that is the cause of some ugliness. `current-input` fixes the problem by allowing you to style the `:hover` state for mouse and touch inputs separately, so when the class `current-input-touch` is present, you can style the `:hover` state for an element the same as when it's not in the `:hover` state, thus fixing the problem.
