import type { ObservedElement } from './ObservedElement';
import type { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';
import { useContext, useCallback, useRef, useState } from 'react';
import { Context } from './Context';

const boxOptions = {
  BORDER_BOX: 'border-box', // https://caniuse.com/mdn-api_resizeobserverentry_borderboxsize
  CONTENT_BOX: 'content-box', // https://caniuse.com/mdn-api_resizeobserverentry_contentboxsize
  DEVICE_PIXEL_CONTENT_BOX: 'device-pixel-content-box' // https://caniuse.com/mdn-api_resizeobserverentry_devicepixelcontentboxsize
};

/**
 * See API Docs: {@linkcode https://github.com/envato/react-breakpoints/blob/main/docs/api.md#useresizeobserver|useResizeObserver}
 *
 * Returns a React callback ref to attach to a DOM element. It also returns
 * a resize observation entry every time the observed element changes size.
 * This causes the component that uses `useResizeObserver` to rerender.
 * @example
 * const [ref, observedEntry] = useResizeObserver(options);
 * const observedWidth = observedEntry.borderBoxSize[0].inlineSize;
 * return (
 *   <div ref={ref}>
 *     This container is {observedWidth}px wide.
 *   </div>
 * );
 */
export const useResizeObserver = (
  options: ResizeObserverOptions = {}
): [React.RefCallback<ObservedElement | null>, ExtendedResizeObserverEntry | null] => {
  const resizeObserver = useContext<ResizeObserver | null>(Context);

  const [observedEntry, setObservedEntry] = useState<ExtendedResizeObserverEntry | null>(null);

  const handleResizeObservation = useCallback(
    (resizeObserverEntry: ExtendedResizeObserverEntry) => {
      if (!observedEntry) return setObservedEntry(resizeObserverEntry);

      let isIdentical = true;

      switch (options.box) {
        case boxOptions.BORDER_BOX:
          isIdentical = resizeObserverEntry.borderBoxSize.every(
            (boxSize, index) =>
              boxSize.inlineSize === observedEntry.borderBoxSize[index].inlineSize &&
              boxSize.blockSize === observedEntry.borderBoxSize[index].blockSize
          );
          break;

        case boxOptions.CONTENT_BOX:
          isIdentical = resizeObserverEntry.contentBoxSize.every(
            (boxSize, index) =>
              boxSize.inlineSize === observedEntry.contentBoxSize[index].inlineSize &&
              boxSize.blockSize === observedEntry.contentBoxSize[index].blockSize
          );
          break;

        case boxOptions.DEVICE_PIXEL_CONTENT_BOX:
          isIdentical = resizeObserverEntry.devicePixelContentBoxSize.every(
            (boxSize, index) =>
              boxSize.inlineSize === observedEntry.devicePixelContentBoxSize[index].inlineSize &&
              boxSize.blockSize === observedEntry.devicePixelContentBoxSize[index].blockSize
          );
          break;

        default:
          if (
            resizeObserverEntry.contentRect.width !== observedEntry.contentRect.width ||
            resizeObserverEntry.contentRect.height !== observedEntry.contentRect.height
          ) {
            isIdentical = false;
          }
      }

      if (!isIdentical) setObservedEntry(resizeObserverEntry);
    },
    [options.box, observedEntry]
  );

  const ref = useRef<ObservedElement | null>(null);

  const setRef = useCallback(
    node => {
      if (ref.current) {
        resizeObserver?.unobserve(ref.current);
        delete ref.current.onResizeObservation;
      }

      if (node) {
        node.onResizeObservation = handleResizeObservation;
        resizeObserver?.observe(node, options);
      }

      ref.current = node;
    },
    [resizeObserver, handleResizeObservation, options]
  );

  return [setRef, observedEntry];
};
