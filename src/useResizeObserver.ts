import { useContext, useCallback, useRef, useState } from 'react';
import { Context } from './Context';
import { ObservedElement } from './ObservedElement';
import { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

/**
 * See API Docs: {@linkcode https://github.com/envato/react-breakpoints/blob/master/docs/api.md#useresizeobserver|useResizeObserver}
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

  const handleResizeObservation = (resizeObserverEntry: ExtendedResizeObserverEntry) =>
    setObservedEntry(resizeObserverEntry);

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
    [resizeObserver, options]
  );

  return [setRef, observedEntry];
};
