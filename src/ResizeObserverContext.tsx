import React, { createContext } from 'react';
import { ResizeObserver } from './resize-observer/ResizeObserver';
import { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

interface ResizeObserverConstructor {
  new (...args: any): ResizeObserver;
}

interface ProviderProps {
  ponyfill?: ResizeObserverConstructor;
  children: React.ReactNode;
}

interface ExtendedWindow extends Window {
  ResizeObserver: ResizeObserverConstructor;
}

declare var window: ExtendedWindow;

const ResizeObserverContext = createContext<ResizeObserver | null>(null);

/**
 * Bootstraps a new ResizeObserver with a callback function used by the `useResizeObserver` hook.
 * @argument {ResizeObserverConstructor} _ResizeObserver - Any ResizeObserver constructor, for example from window.ResizeObserver or a ponyfill.
 * @returns {ResizeObserver} Bootstrapped ResizeObserver instance to assign to `ResizeObserverContext.Provider`'s value.
 */
const createResizeObserver = (_ResizeObserver: ResizeObserverConstructor): ResizeObserver => {
  const handleResizeObserverEntry = (resizeObserverEntry: ExtendedResizeObserverEntry) => {
    const { onResizeObservation } = resizeObserverEntry.target;
    onResizeObservation && onResizeObservation(resizeObserverEntry);
  };

  return new _ResizeObserver((entries: ExtendedResizeObserverEntry[]) => entries.forEach(handleResizeObserverEntry));
};

/**
 * Bootstraps a ResizeObserverContext.Provider with a ResizeObserver instance.
 * @argument {ProviderProps} props
 * @argument {ResizeObserverConstructor} [props.ponyfill=undefined] - Optional `ResizeObserver` constructor, for example from a ponyfill. Defaults to `window.ResizeObserver`. CAUTION: https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver
 * @argument {React.ReactNode} props.children - This component's children.
 * @returns {JSX.Element} Context.Provider bootstrapped with a ResizeObserver instance.
 */
const Provider = ({ ponyfill = undefined, children }: ProviderProps): JSX.Element => {
  const instance = createResizeObserver(ponyfill || window.ResizeObserver);

  return <ResizeObserverContext.Provider value={instance}>{children}</ResizeObserverContext.Provider>;
};

export { ResizeObserverContext, createResizeObserver, Provider };
