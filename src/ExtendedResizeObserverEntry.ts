import { ObservedElement } from './ObservedElement';

export interface ExtendedResizeObserverEntry extends ResizeObserverEntry {
  readonly devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>; // https://github.com/w3c/csswg-drafts/pull/4476
  target: ObservedElement;
}
