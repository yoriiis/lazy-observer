# lazyObserver

![lazyObserver](https://img.shields.io/badge/lazy--observer-v1.0.1-546e7a.svg?style=for-the-badge) [![TravisCI](https://img.shields.io/travis/com/yoriiis/lazy-observer/master?style=for-the-badge)](https://travis-ci.com/yoriiis/lazy-observer) ![Node.js](https://img.shields.io/node/v/lazy-observer?style=for-the-badge) [![Bundlephobia](https://img.shields.io/bundlephobia/minzip/lazy-observer?style=for-the-badge)](https://bundlephobia.com/result?p=lazy-observer@latest)

`lazyObserver` is a minimalist script to easily execute function when HTML element is intersecting. Callback can be exececuted once or every trigger.

More information about the `IntersectionObserver` API on [MDN](https://developer.mozilla.org/fr/docs/Web/API/IntersectionObserver).

## Installation

The plugin is available as the `lazy-observer` package name on [npm](https://www.npmjs.com/package/lazy-observer) and [Github](https://github.com/yoriiis/lazy-observer).

```bash
npm i --save-dev lazy-observer
```

```bash
yarn add --dev lazy-observer
```

## Environment

`lazyObserver` was built for Node.js `>=8.11.2`.

## Usage

### Basic usage

The following example display a `console.log` statement when the `.footer` HTML element is positioned at one screen height.

```javascript
const LazyObserver = require('lazy-observer');

const lazyObserver = new LazyObserver({
    element: document.querySelector('.footer'),
    onIntersection: () => {
        console.log('Function is triggered');
    }
});

lazyObserver.observe();
```

### Once or not

The following example displays a `console.log` statement each time the HTML `.footer` element is positioned at one screen height.

```javascript
const LazyObserver = require('lazy-observer');

const lazyObserver = new LazyObserver({
    element: document.querySelector('.footer'),
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
const LazyObserver = require('lazy-observer');

const lazyObserver = new LazyObserver({
    element: document.querySelector('.footer'),
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
const LazyObserver = require('lazy-observer');

const lazyObserver = new LazyObserver({
    element: document.querySelector('.footer'),
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

`HTMLElement`

Tells to the function the target element.

#### `onIntersection`

`function`

Specifies the function to execute when the element is intersecting.

#### `once`

`boolean = true`

Specifies the function is the callback is executed once or at every trigger.

#### `rootMargin`

`string = 0px 0px ${window.innerHeight}px 0px`

Specifies the function the offset for the Intersection Observer.

## Licence

lazyObserver is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
