import { ExtendedResizeObserverEntry } from './ExtendedResizeObserverEntry';

export interface ExtendedElement extends Element {
  onResizeObservation?: (resizeObserverEntry: ExtendedResizeObserverEntry) => void;
}
