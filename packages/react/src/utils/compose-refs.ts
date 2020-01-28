import { Ref, MutableRefObject } from 'react';

export function composeRefs<T>(refs: (Ref<T> | undefined)[]) {
  return (element: T) => {
    refs.forEach(ref => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        return ref(element);
      }

      (ref as MutableRefObject<T>).current = element;
    });
  };
}
