import { useEffect, useRef } from 'react';
import _throttle from 'lodash/throttle';

export function useInterval(fn, delay) {
  const fnRef = useRef();
  fnRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;

    const timer = setInterval(() => {
      fnRef.current();
    }, delay);
    return () => clearInterval(timer);
  }, [delay]);
}
