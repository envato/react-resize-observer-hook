import { Context, RefObject } from 'react';

interface ResizeObserverOptions {
  boxModel?: 'contentRect' | 'borderBoxSize' | 'contentBoxSize';
  initialWidth?: number;
  initialHeight?: number;
};

export const ResizeObserverContext: Context<ResizeObserver | null>;

export const createResizeObserver: (ResizeObserver?: typeof ResizeObserver) => ResizeObserver;

export const useResizeObserver: <T>(options?: ResizeObserverOptions) => [RefObject<T>, number, number];
