import type { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

/**
 * Creates a new ResizeObserver instance that works with the
 * {@linkcode https://github.com/envato/react-breakpoints/blob/main/docs/api.md#useresizeobserver|useResizeObserver}
 * hook.
 * @example
 * const resizeObserverInstance = createResizeObserver(window.ResizeObserver);
 * return (
 *   <Context.Provider value={resizeObserverInstance}>
 *     ...
 *   </Context.Provider>
 * );
 */
export const createResizeObserver = (Constructor: typeof ResizeObserver) => {
  const handleResizeObserverEntry = (resizeObserverEntry: ExtendedResizeObserverEntry) => {
    const { onResizeObservation } = resizeObserverEntry.target;
    onResizeObservation && onResizeObservation(resizeObserverEntry);
  };

  return new Constructor((entries: ExtendedResizeObserverEntry[]) => entries.forEach(handleResizeObserverEntry));
};
