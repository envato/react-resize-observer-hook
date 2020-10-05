import { useContext, useCallback, useRef, useState } from 'react';
import { ResizeObserverContext } from './ResizeObserverContext';
import { ExtendedElement } from './ExtendedElement';
import { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';
import { ResizeObserver } from './resize-observer/ResizeObserver';
import { ResizeObserverOptions } from './resize-observer/ResizeObserverOptions';

/**
 * Observe an element's size.
 * @argument {ResizeObserverOptions} [options] - Options object for `ResizeObserver.observe()`.
 * @returns {Array} Array with: a reference to observed element, a ResizeObserverEntry.
 */
const useResizeObserver = (
  options: ResizeObserverOptions = {}
): [React.RefCallback<ExtendedElement | null>, ExtendedResizeObserverEntry | null] => {
  const resizeObserver = useContext<ResizeObserver | null>(ResizeObserverContext);

  const [observedEntry, setObservedEntry] = useState<ExtendedResizeObserverEntry | null>(null);

  const handleResizeObservation = (resizeObserverEntry: ExtendedResizeObserverEntry) =>
    setObservedEntry(resizeObserverEntry);

  const ref = useRef<ExtendedElement | null>(null);

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

export { useResizeObserver };
