import { ResizeObserverEntry } from './resize-observer/ResizeObserverEntry';

export interface ExtendedResizeObserverEntry extends ResizeObserverEntry {
  target: ExtendedElement;
}

export interface ExtendedElement extends Element {
  onResizeObservation?: (resizeObserverEntry: ExtendedResizeObserverEntry) => void;
}
