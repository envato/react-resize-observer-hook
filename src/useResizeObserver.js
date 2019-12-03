import { useContext, useCallback, useRef, useState } from 'react';
import { ResizeObserverContext } from './resizeObserverContext';

/**
 * Observe an element's width and height.
 * @argument {Object} [options] - Options to initialise this observed element with.
 * @argument {String} [options.boxModel] - The observed box model. One of: 'contentRect', 'borderBoxSize', 'contentBoxSize'.
 * @argument {Number} [options.initialWidth] - Sets element's initial width. Useful for server-side rendering.
 * @argument {Number} [options.initialHeight] - Sets element's initial height. Useful for server-side rendering.
 * @returns {Array} Array with a reference to observed element, the observed width, and the observed height.
 */
const useResizeObserver = ({
  initialWidth = 1,
  initialHeight = 1,
  boxModel = 'contentRect' // https://caniuse.com/#feat=mdn-api_resizeobserverentry_contentrect
} = {}) => {
  const resizeObserver = useContext(ResizeObserverContext);

  const [width, changeWidth] = useState(initialWidth);
  const [height, changeHeight] = useState(initialHeight);

  const handleResizeObservation = resizeObserverEntry => {
    switch (boxModel) {
      case 'borderBoxSize': // https://caniuse.com/#feat=mdn-api_resizeobserverentry_borderboxsize
      case 'contentBoxSize': // https://caniuse.com/#feat=mdn-api_resizeobserverentry_contentboxsize
        changeWidth(resizeObserverEntry[boxModel].inlineSize);
        changeHeight(resizeObserverEntry[boxModel].blockSize);
        break;

      default:
        changeWidth(resizeObserverEntry.contentRect.width);
        changeHeight(resizeObserverEntry.contentRect.height);
    }
  };

  const ref = useRef(null);

  const setRef = useCallback(node => {
    if (ref.current) {
      resizeObserver.unobserve(ref.current);
      delete ref.current.handleResizeObservation;
    }

    if (node) {
      node.handleResizeObservation = handleResizeObservation;
      resizeObserver.observe(node);
    }

    ref.current = node;
  }, [resizeObserver]);

  return [setRef, width, height];
};

export { useResizeObserver };
