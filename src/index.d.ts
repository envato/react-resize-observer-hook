import React from 'react';

interface ProviderProps {
  ponyfill?: ResizeObserver;
  children: React.ReactNode;
}

export const ResizeObserverContext: React.Context<ResizeObserver | null>;

export const Provider: (props: ProviderProps) => React.ReactNode;

export const createResizeObserver: (ResizeObserver: ResizeObserver) => ResizeObserver;

export const useResizeObserver: (options?: ResizeObserverObserveOptions) => [React.RefObject, ResizeObserverEntry];
