# React `ResizeObserver` Hook &amp; Context &middot; [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](CODE-OF-CONDUCT.md)

> Observe multiple React components with a single ResizeObserver.

This package provides you with:

* a single `ResizeObserver` instance placed inside a React Context;
* a React Hook to observe any element's changes in size.

This allow you to know the size of each observed element.

# Developer status

While this package has seen little action "in the wild", it has first been developed and groomed elsewhere. As such, I don't expect a lot of changes conceptually. However, the API of this hook is not finalised and may change at any given time.

# Usage

```console
npm install --save @envato/react-resize-observer-hook
```

## Set up ResizeObserverContext.Provider

```javascript
import { ResizeObserverContext, createResizeObserver } from '@envato/react-resize-observer-hook';

const resizeObserver = createResizeObserver();

const App = () => (
  <ResizeObserverContext.Provider value={resizeObserver}>
    ...
  </ResizeObserverContext.Provider>
)
```
**Caution**: [`ResizeObserver` currently has weak browser support](https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver). You may pass a `ResizeObserver` constructor to `createResizeObserver` to use instead of `window.ResizeObserver`. I recommend this ponyfill:

```javascript
import { ResizeObserverContext, createResizeObserver } from '@envato/react-resize-observer-hook';
import ResizeObserver from '@juggle/resize-observer'; // Ponyfill

const resizeObserver = createResizeObserver(ResizeObserver);

const App = () => (
  <ResizeObserverContext.Provider value={resizeObserver}>
    ...
  </ResizeObserverContext.Provider>
)
```

## Observe an element

```javascript
import { useResizeObserver } from '@envato/react-resize-observer-hook';

const ObservedDiv = () => {
  const [ref, width, height] = useResizeObserver();

  return <div ref={ref}>This element is {width}px wide and {height}px high.</div>
}
```
