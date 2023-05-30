# lazyObserver

[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/yoriiis/lazy-observer/build.yml?branch=main&style=for-the-badge)](https://github.com/yoriiis/lazy-observer/actions/workflows/build.yml) [![Coverage Status](https://img.shields.io/coveralls/github/yoriiis/lazy-observer?style=for-the-badge)](https://coveralls.io/github/yoriiis/lazy-observer?branch=main)

`lazy-observer` is a minimalist script to easily execute function when HTML element is intersecting. Callback can be exececuted once or every trigger.

More information about the `IntersectionObserver` API on [MDN](https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserver).

## Installation

### NPM

NPM is the recommended installation method. Install `lazy-observer` in your project with the following command:

```bash
npm install lazy-observer --save-dev
```

```bash
yarn add lazy-observer --dev
```

> **Note** Minimum supported `Node.js` version is `16.20.0`.

### CDN

You can also download it and include it with a script tag. The library will be registered as the global variable `window.LazyObserver`.

```html
<script src="https://cdn.jsdelivr.net/npm/lazy-observer@2" crossorigin></script>
```

> **Note** You can browse the source of the NPM package at [jsdelivr.com/package/npm/lazy-observer](https://www.jsdelivr.com/package/npm/lazy-observer).

## Installation

The library is available as the `lazy-observer` package name on [npm](https://www.npmjs.com/package/lazy-observer) and [Github](https://github.com/yoriiis/lazy-observer).

```bash
npm install lazy-observer --save
```

```bash
yarn add validate-target --dev
```

## How it works

### Initialization

Import `lazy-observer` JavaScript library as an ES6 modules.

```js
import LazyObserver from 'lazy-observer';
```

Initialize the library with the minimal parameters.

```js
new LazyObserver({
  elements: document.querySelector('.footer'),
  onIntersection: () => console.log('Function is triggered')
});
lazyObserver.observe();
```

---

## Configuration

### Options

### Basic usage

The following example display a `console.log` statement when the `.footer` HTML element is positioned at one screen height.

```javascript
new LazyObserver({
  elements: document.querySelector('.footer'),
  onIntersection: () => console.log('Function is triggered')
});

lazyObserver.observe();
```

### Once or not

The following example displays a `console.log` statement each time the HTML `.footer` element is positioned at one screen height.

```javascript
new LazyObserver({
  elements: document.querySelector('.footer'),
  once: false,
  onIntersection: () => {
    console.log('Function is triggered');
  }
});

lazyObserver.observe();
```

### Change the offset

The following example displays a `console.log` statement when the HTML `.footer` element is positioned directly at the bottom of the screen.

```javascript

new LazyObserver({
    elements: document.querySelector('.footer'),
    rootMargin: '0px 0px 0px 0px'
    onIntersection: () => {
        console.log('Function is triggered');
    }
});

lazyObserver.observe();
```

### Example with dynamic import

The following example displays a `console.log` statement when the HTML `.footer` element is positioned directly at the bottom of the screen.

```javascript

new LazyObserver({
    elements: document.querySelector('.footer'),
    rootMargin: '0px 0px 0px 0px'
    onIntersection: () => {
        import(/* webpackChunkName: "footer-video" */ 'footer-video.js'
        ).then(() => {
            console.log('Module footer-video is loaded');
        });
    }
});

lazyObserver.observe();
```

### Parameters

#### `element`

Type:

```ts
type elements = HTMLElement | HTMLElement[];
```

Default: `null`

Tells to the function the target element(s).

#### `onIntersection`

Type:

```ts
type onIntersection = () => void;
```

Default: `() => {}`

Specifies the function to execute when the element is intersecting.

#### `once`

Type:

```ts
type once = boolean;
```

Default: `true`

Specifies the function is the callback is executed once or at every trigger.

#### `rootMargin`

Type:

```ts
type rootMargin = string;
```

Default:

```js
`0px 0px ${window.innerHeight}px 0px`;
```

Specifies the function the offset for the Intersection Observer.

## Licence

lazyObserver is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
