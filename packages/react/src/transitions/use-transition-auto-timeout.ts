import { useRef, useEffect } from 'react';
import { TransitionTimeout, TransitionProps } from './typings';

export function useTransitionAutoTimeout(timeout?: TransitionTimeout) {
  const timer = useRef(NaN);
  const autoTransitionDuration = useRef(NaN);
  const addEndListener: TransitionProps['addEndListener'] = (_, next) => {
    if (timeout === 'auto') {
      timer.current = window.setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { autoTransitionDuration, addEndListener };
}
