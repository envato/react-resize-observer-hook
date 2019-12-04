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
 * @argument {ResizeObserver} [props.ponyfill=undefined] - Optional `ResizeObserver` constructor, for example from a ponyfill. Defaults to `window.ResizeObserver`. CAUTION: https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver
 * @argument {JSX} props.children - This component's children.
 * @returns {JSX} Context.Provider bootstrapped with a ResizeObserver instance.
 */
const Provider = ({ ponyfill = undefined, children }) => {
  const instance = createResizeObserver(ponyfill || window.ResizeObserver);

  return (
    <ResizeObserverContext.Provider value={instance}>
      {children}
    </ResizeObserverContext.Provider>
  );
};

export { ResizeObserverContext, createResizeObserver, Provider };
