import type { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

export interface ObservedElement extends Element {
  onResizeObservation?: (resizeObserverEntry: ExtendedResizeObserverEntry) => void;
}
