import { useContext, useCallback, useRef, useState } from 'react';
import { ResizeObserverContext } from './resizeObserverContext';

/**
 * Observe an element's size.
 * @returns {Array} Array with: a reference to observed element, a ResizeObserverEntry.
 */
const useResizeObserver = () => {
  const resizeObserver = useContext(ResizeObserverContext);

  const [observedEntry, setObservedEntry] = useState(null);

  const handleResizeObservation = resizeObserverEntry => setObservedEntry(resizeObserverEntry);

  const ref = useRef(null);

  const setRef = useCallback(node => {
    if (ref.current) {
      resizeObserver.unobserve(ref.current);
      delete ref.current.handleResizeObservation;
    }

    if (node) {
      node.handleResizeObservation = handleResizeObservation;
      resizeObserver.observe(node);
    }

    ref.current = node;
  }, [resizeObserver]);

  return [setRef, observedEntry];
};

export { useResizeObserver };
