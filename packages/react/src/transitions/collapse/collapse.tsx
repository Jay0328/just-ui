import React, { HTMLAttributes, forwardRef, useRef } from 'react';
import clsx from 'clsx';
import Transition, { TransitionProps as _TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
import { ANIMATION_DURATIONS } from '@just-ui/core/animation/variables';
import { getAutoHeightDuration } from '@just-ui/core/animation/get-auto-height-duration';
import { TransitionProps, TransitionElementProps } from '../typings';
import { GetTransitionDurationsOptions, getTransitionDuration } from '../get-transition-duration';
import { useTransitionAutoTimeout } from '../use-transition-auto-timeout';

export interface CollapseElementProps extends TransitionElementProps, HTMLAttributes<HTMLElement> {
  collapsedHeight?: string | number;
}

export type CollapseProps = TransitionProps & CollapseElementProps;

const Collapse = forwardRef<HTMLElement, CollapseProps>(function Collapse(props, ref) {
  const {
    children,
    className,
    collapsedHeight: collapsedHeightProp = '0px',
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExiting,
    style,
    timeout = ANIMATION_DURATIONS.STANDARD,
    ...rest
  } = props;
  const { autoTransitionDuration, addEndListener } = useTransitionAutoTimeout(timeout);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const collapsedHeight = typeof collapsedHeightProp === 'number' ? `${collapsedHeightProp}px` : collapsedHeightProp;
  const getWrapperHeight = () => wrapperRef.current?.clientHeight || 0;
  const setNodeTransition = (node: HTMLElement, wrapperHeight: number, options: GetTransitionDurationsOptions) => {
    let transitionDuration = getTransitionDuration({ style, timeout }, options);

    if (timeout === 'auto') {
      autoTransitionDuration.current = getAutoHeightDuration(wrapperHeight);
      transitionDuration = `${autoTransitionDuration.current}ms`;
    }

    node.style.transitionDuration = transitionDuration;
  };
  const transitionProps: _TransitionProps = {
    in: inProp,
    timeout: (timeout === 'auto' ? null : timeout) as _TransitionProps['timeout'],
    onEnter(node, isAppearing) {
      node.style.height = collapsedHeight;

      if (onEnter) {
        onEnter(node, isAppearing);
      }
    },
    onEntering(node, isAppearing) {
      const wrapperHeight = getWrapperHeight();
      setNodeTransition(node, wrapperHeight, { mode: 'enter' });
      node.style.height = `${wrapperHeight}px`;

      if (onEntering) {
        onEntering(node, isAppearing);
      }
    },
    onEntered(node, isAppearing) {
      node.style.height = 'auto';

      if (onEntered) {
        onEntered(node, isAppearing);
      }
    },
    onExit(node) {
      node.style.height = `${getWrapperHeight()}px`;

      if (onExit) {
        onExit(node);
      }
    },
    onExiting(node) {
      setNodeTransition(node, getWrapperHeight(), { mode: 'exit' });
      node.style.height = collapsedHeight;

      if (onExiting) {
        onExiting(node);
      }
    },
    addEndListener,
    ...rest
  };

  return (
    <Transition {...transitionProps}>
      {(state: TransitionStatus, collapseProps: CollapseElementProps) => (
        <div
          ref={ref as any}
          className={clsx(
            'just-transition-collapse',
            {
              'just-transition-collapse--entered': state === 'entered',
              'just-transition-collapse--hidden': state === 'exited' && !inProp && collapsedHeight === '0px'
            },
            className
          )}
          style={{ minHeight: collapsedHeight, ...style }}
          {...collapseProps}
        >
          <div className="just-transition-collapse__wrapper" ref={wrapperRef}>
            <div className="just-transition-collapse__inner">{children}</div>
          </div>
        </div>
      )}
    </Transition>
  );
});

export default Collapse;
