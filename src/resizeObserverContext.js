import { createContext } from 'react';

const ResizeObserverContext = createContext(null);

/**
 * Bootstraps a new ResizeObserver with a callback function used by the `useResizeObserver` hook.
 * @argument {ResizeObserver} [ResizeObserver] - Any ResizeObserver constructor, for example from window.ResizeObserver or a ponyfill.
 * @returns {ResizeObserver} Bootstrapped ResizeObserver instance to assign to `ResizeObserverContext.Provider`'s value.
 */
const createResizeObserver = ResizeObserver => {
  const handleEntry = entry => {
    const { handleResizeObservation } = entry.target;
    handleResizeObservation && handleResizeObservation(entry);
  };

  return new ResizeObserver(entries => entries.forEach(handleEntry));
};

/**
 * Bootstraps a ResizeObserverContext.Provider with a ResizeObserver instance.
 * @argument {Object} props
 * @argument {JSX} props.children - This component's children.
 * @argument {ResizeObserver} props.resizeObserver - Optional `ResizeObserver` constructor, for example from a ponyfill. Defaults to `window.ResizeObserver`. CAUTION: https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver
 * @returns {JSX} Context.Provider bootstrapped with a ResizeObserver instance.
 */
const Provider = ({ resizeObserver = window.ResizeObserver, children }) => {
  const instance = createResizeObserver(resizeObserver);

  return (
    <ResizeObserverContext.Provider value={instance}>
      {children}
    </ResizeObserverContext.Provider>
  );
};

export { ResizeObserverContext, createResizeObserver, Provider };
