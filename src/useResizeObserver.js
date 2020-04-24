import { useContext, useCallback, useRef, useState } from 'react';
import { ResizeObserverContext } from './resizeObserverContext';

/**
 * Observe an element's size.
 * @argument {Object} [options] - Options object for `ResizeObserver.observe()`.
 * @argument {String} [options.box] - The element's box to observe.
 * @returns {Array} Array with: a reference to observed element, a ResizeObserverEntry.
 */
const useResizeObserver = (options = {}) => {
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
      resizeObserver.observe(node, options);
    }

    ref.current = node;
  }, [resizeObserver]);

  return [setRef, observedEntry];
};

export { useResizeObserver };
