import { Ref, useMemo } from 'react';
import { composeRefs } from '../utils/compose-refs';

export function useComposeRefs<T>(refs: (Ref<T> | undefined)[]) {
  return useMemo(() => composeRefs(refs), refs);
}
