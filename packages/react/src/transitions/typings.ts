import { CSSProperties, ReactNode } from 'react';
import { TransitionProps as _TransitionProps, TransitionActions } from 'react-transition-group/Transition';

export type TransitionHandlerKeys = 'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited';
export type TransitionHandlerPros = Pick<_TransitionProps, TransitionHandlerKeys>;

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'addEndListener'
  | TransitionHandlerKeys;

export type TransitionTimeout = NonNullable<_TransitionProps['timeout']> | 'auto';

export interface TransitionElementProps {
  className?: string;
  style?: CSSProperties;
}

export interface TransitionProps
  extends Pick<_TransitionProps, Exclude<TransitionKeys, 'timeout'>>,
    TransitionActions,
    TransitionElementProps {
  children?: ReactNode;
  timeout?: TransitionTimeout;
}
