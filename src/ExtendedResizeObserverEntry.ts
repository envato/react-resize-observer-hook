import { ExtendedElement } from './ExtendedElement';
import { ResizeObserverEntry } from './resize-observer/ResizeObserverEntry';

export interface ExtendedResizeObserverEntry extends ResizeObserverEntry {
  target: ExtendedElement;
}
