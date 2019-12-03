import { createContext } from 'react';

const ResizeObserverContext = createContext(null);

/**
 * Bootstraps a new ResizeObserver with a callback function used by the `useResizeObserver` hook.
 * @argument {ResizeObserver} [ResizeObserver] - Optional `ResizeObserver` constructor, for example from a ponyfill. Defaults to `window.ResizeObserver`. CAUTION: https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver
 * @returns {ResizeObserver} Bootstrapped ResizeObserver to assign to `ResizeObserverContext.Provider`'s value.
 */
const createResizeObserver = (ResizeObserver = window.ResizeObserver) => {
  const handleEntry = entry => {
    const { handleResizeObservation } = entry.target;
    handleResizeObservation && handleResizeObservation(entry);
  };

  return new ResizeObserver(entries => entries.forEach(handleEntry));
};

export { ResizeObserverContext, createResizeObserver };
