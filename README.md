# React `ResizeObserver` Hook &amp; Context &middot; [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE-OF-CONDUCT.md)

> Observe multiple React components with a single ResizeObserver.

This package provides you with:

* a context `<Provider>` with a `ResizeObserver` instance;
* a `useResizeObserver()` hook to observe any element's changes in size.

This allows you to know the size of each observed element.

# Developer status

While this package has seen little action "in the wild", it has first been developed and groomed elsewhere. As such, I don't expect a lot of changes conceptually. However, the API of this hook is not finalised and may change at any given time.

# Usage

```shell
npm install @envato/react-resize-observer-hook
```

## Set up the Provider

```javascript
import { Provider as ResizeObserverProvider } from '@envato/react-resize-observer-hook';

const App = () => (
  <ResizeObserverProvider>
    ...
  </ResizeObserverProvider>
);
```

⚠️ **Caution**: `Provider` instantiates a `window.ResizeObserver` by default. [`window.ResizeObserver` currently has weak browser support](https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver). You may pass a `ResizeObserver` constructor to `Provider` to use instead of `window.ResizeObserver`. I recommend [ponyfilling](https://github.com/sindresorhus/ponyfill) using [`@juggle/resize-observer`](https://github.com/juggle/resize-observer). You can also [monkey patch](https://en.wikipedia.org/wiki/Monkey_patch) `window.ResizeObserver` and use `Provider` without the `ponyfill` prop.

```javascript
import { Provider as ResizeObserverProvider } from '@envato/react-resize-observer-hook';
import ResizeObserver from '@juggle/resize-observer'; // Ponyfill

const App = () => (
  <ResizeObserverProvider ponyfill={ResizeObserver}>
    ...
  </ResizeObserverProvider>
);
```

## Observe an element

```javascript
import { useResizeObserver } from '@envato/react-resize-observer-hook';

const ObservedDiv = () => {
  const [ref, observedEntry] = useResizeObserver();
  const { width, height } = observedEntry.contentRect;

  return <div ref={ref}>This element is {width}px wide and {height}px high.</div>
};
```

Depending on your implementation of `ResizeObserver`, the internal `ResizeObserverEntry` can contain size information about multiple "boxes" of the observed element. Observing these boxes instead of `contentRect` (default) can be done by passing an options object to the hook:

```javascript
const options = {
  box: 'border-box'
};

const [ref, observedEntry] = useResizeObserver(options);
```

See [MDN reference guide](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) for further information.

# Maintainers

* [Marc Dingena](https://github.com/mdingena) (owner)

# Contributing

For bug fixes, documentation changes, and small features:

1. Fork this repository.
1. Create your feature branch (git checkout -b my-new-feature).
1. Commit your changes (git commit -am 'Add some feature').
1. Push to the branch (git push origin my-new-feature).
1. Create a new Pull Request.

**For larger new features**: Do everything as above, but first also make contact with the project maintainers to be sure your change fits with the project direction and you won't be wasting effort going in the wrong direction.
