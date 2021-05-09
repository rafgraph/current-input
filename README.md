# Current Input

[![npm bundle size (version)](https://img.shields.io/bundlephobia/minzip/current-input?color=purple)](https://bundlephobia.com/result?p=event-from) ![npm type definitions](https://img.shields.io/npm/types/current-input?color=blue)

- Detects the current input being used (mouse or touch) and adds a `current-input-mouse` or `current-input-touch` class to the `body` indicating the current input type.
- Used with the appropriate CSS selectors this will fix the [sticky `:hover` bug](#sticky-hover-bug) on touch devices and allow you to work with 3 interactive states in CSS: hover, active, and touch active.
- `current-input` is as easy as set it and forget it, and is compatible with all modern browsers. It will automatically add the `current-input-mouse` or `current-input-touch` class to the `body`.
---

[Demo website](https://current-input.rafgraph.dev) &#8212; demo code in the [`/docs` folder](/docs)

---

## Installing `current-input`

#### Install it in your app:

```shell
npm install --save current-input
```

And then import it in your app (it will run automatically on import).

```js
import 'current-input';
```

---

#### Or add the script to `index.html`:

Alternatively you can add the script directly to your `index.html`. The version that comes from the Unpkg CDN is minified and gziped with all dependencies included and will run automatically.

```html
<script src="https://unpkg.com/current-input@2/dist/current-input.umd.production.js"></script>
```

---

## Using `current-input`

`current-input` will run automatically and will add the class `current-input-mouse` or `current-input-touch` to the `body`. Use the appropriate CSS selectors to style elements based on the current input class.

#### CSS example

Here is an example using CSS to style links such that it fixes the sticky hover problem on touch devices and provides a unique touch active state. See the [demo website](https://current-input.rafgraph.dev) for a live version of this example (demo code in the [`/docs` folder](/docs)).

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

## Sticky `:hover` bug

The sticky `:hover` bug on touch devices occurs when you tap something that has a `:hover` state. The `:hover` state sticks until you tap someplace else on the screen. The reason for this is back in the early days of mobile, the web relied heavily on hover menus, so on mobile you could tap to see the hover menu. Sites are generally no longer be built this way, so now the sticky hover feature has become a bug. `current-input` fixes the problem by allowing you to style the `:hover` state for mouse and touch inputs separately. Now you can only style the `:hover` state when the `current-input-mouse` class is present, and do nothing when the `current-input-touch` class is present, which fixes this bug.
