import React, { ReactElement, isValidElement, cloneElement } from 'react';
import Transition, { TransitionProps as _TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
import clsx from 'clsx';
import * as animationFunctions from '@just-ui/core/animation/functions';
import { reflow } from '@just-ui/core/animation/reflow';
import { getAutoHeightDuration } from '@just-ui/core/animation/get-auto-height-duration';
import { TransitionProps, TransitionElementProps } from '../typings';
import { useTransitionAutoTimeout } from '../use-transition-auto-timeout';
import { getTransitionDuration } from '../get-transition-duration';

const classes: { [key in TransitionStatus]?: string } = {
  entering: 'just-transition-grow--entering',
  entered: 'just-transition-grow--entered',
  exiting: 'just-transition-grow--exiting'
};

export interface GrowProps extends TransitionProps {
  children?: ReactElement<TransitionElementProps>;
}

function Grow(props: GrowProps) {
  const { children, in: inProp, onEnter, onExit, style = {}, timeout = 'auto', ...rest } = props;
  const { autoTransitionDuration, addEndListener } = useTransitionAutoTimeout(timeout);
  const setTransition = (node: HTMLElement, mode: 'enter' | 'exit') => {
    let transitionDuration = getTransitionDuration({ style, timeout }, { mode });

    if (timeout === 'auto') {
      autoTransitionDuration.current = getAutoHeightDuration(node.clientHeight);
      transitionDuration = `${autoTransitionDuration.current}ms`;
    }

    const durationNumber = parseInt(transitionDuration);

    node.style.transition = [
      animationFunctions.enter('opacity', transitionDuration, style.transitionDelay),
      animationFunctions.enter(
        'transform',
        durationNumber * 0.666,
        style.transitionDelay || (mode === 'exit' ? durationNumber * 0.333 : undefined)
      )
    ].join(',');
  };
  const transitionProps: _TransitionProps = {
    appear: true,
    in: inProp,
    timeout: (timeout === 'auto' ? null : timeout) as _TransitionProps['timeout'],
    onEnter(node, isAppearing) {
      reflow(node);

      setTransition(node, 'enter');

      if (onEnter) {
        onEnter(node, isAppearing);
      }
    },
    onExit(node) {
      setTransition(node, 'exit');

      if (onExit) {
        onExit(node);
      }
    },
    addEndListener,
    ...rest
  };

  return (
    <Transition {...transitionProps}>
      {state =>
        isValidElement(children)
          ? cloneElement(children, {
              className: clsx(
                'just-transition-grow',
                classes[state],
                {
                  'just-transition-grow--hidden': state === 'exited' && !inProp
                },
                children.props.className
              ),
              style: { ...style, ...children.props.style }
            })
          : null
      }
    </Transition>
  );
}

export default Grow;
