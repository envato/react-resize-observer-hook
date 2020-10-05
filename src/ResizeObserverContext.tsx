import React, { createContext } from 'react';
import { ResizeObserver } from './resize-observer/ResizeObserver';
import { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

interface Constructable<T> {
  new (...args: any): T;
}

interface ProviderProps {
  ponyfill?: Constructable<ResizeObserver>;
  children: React.ReactNode;
}

interface ExtendedWindow extends Window {
  ResizeObserver: Constructable<ResizeObserver>;
}

declare var window: ExtendedWindow;

const ResizeObserverContext: React.Context<ResizeObserver> = createContext(
  new ResizeObserver(() => {
    throw Error(
      "Please instantiate the ResizeObserverContext.Provider value by using this package's <Provider> component."
    );
  })
);

/**
 * Bootstraps a new ResizeObserver with a callback function used by the `useResizeObserver` hook.
 * @argument {Constructable<ResizeObserver>} _ResizeObserver - Any ResizeObserver constructor, for example from window.ResizeObserver or a ponyfill.
 * @returns {ResizeObserver} Bootstrapped ResizeObserver instance to assign to `ResizeObserverContext.Provider`'s value.
 */
const createResizeObserver = (_ResizeObserver: Constructable<ResizeObserver>): ResizeObserver => {
  const handleResizeObserverEntry = (resizeObserverEntry: ExtendedResizeObserverEntry) => {
    const { onResizeObservation } = resizeObserverEntry.target;
    onResizeObservation && onResizeObservation(resizeObserverEntry);
  };

  return new _ResizeObserver((entries: ExtendedResizeObserverEntry[]) => entries.forEach(handleResizeObserverEntry));
};

/**
 * Bootstraps a ResizeObserverContext.Provider with a ResizeObserver instance.
 * @argument {ProviderProps} props
 * @argument {Constructable<ResizeObserver>} [props.ponyfill=undefined] - Optional `ResizeObserver` constructor, for example from a ponyfill. Defaults to `window.ResizeObserver`. CAUTION: https://caniuse.com/#feat=mdn-api_resizeobserver_resizeobserver
 * @argument {React.ReactNode} props.children - This component's children.
 * @returns {React.ReactNode} Context.Provider bootstrapped with a ResizeObserver instance.
 */
const Provider = ({ ponyfill = undefined, children }: ProviderProps): React.ReactNode => {
  const instance = createResizeObserver(ponyfill || window.ResizeObserver);

  return <ResizeObserverContext.Provider value={instance}>{children}</ResizeObserverContext.Provider>;
};

export { ResizeObserverContext, createResizeObserver, Provider };
