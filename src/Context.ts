import { createContext } from 'react';

export const Context = createContext<ResizeObserver | null>(null);
