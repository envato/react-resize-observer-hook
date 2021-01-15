import { createResizeObserver } from './createResizeObserver';
import { Context } from './Context';

interface ProviderProps {
  ponyfill?: typeof ResizeObserver;
  children: React.ReactNode;
}

/**
 * See API Docs: {@linkcode https://github.com/envato/react-breakpoints/blob/master/docs/api.md#provider|Provider}
 *
 * Returns a React context provider with a ResizeObserver instance as its value.
 * Uses `window.ResizeObserver` to construct the instance if no `ponyfill` prop is provided.
 * @example
 * return (
 *   <Provider ponyfill={ResizeObserver}>
 *     ...
 *   </Provider>
 * );
 */
export const Provider = ({ ponyfill = undefined, children }: ProviderProps) => {
  const instance = createResizeObserver(ponyfill || window.ResizeObserver);

  return <Context.Provider value={instance}>{children}</Context.Provider>;
};
