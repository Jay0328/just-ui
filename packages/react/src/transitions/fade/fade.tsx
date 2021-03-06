import React, { cloneElement, isValidElement } from 'react';
import Transition, { TransitionProps as _TransitionProps, TransitionStatus } from 'react-transition-group/Transition';
import clsx from 'clsx';
import { reflow } from '@just-ui/core/animation/reflow';
import { TransitionProps } from '../typings';
import { getTransitionDuration } from '../get-transition-duration';

const classes: { [key in TransitionStatus]?: string } = {
  entering: 'just-transition-fade--entering',
  entered: 'just-transition-fade--entered',
  exiting: 'just-transition-fade--exiting'
};

const defaultTimeout = {
  enter: 225,
  exit: 195
};

export type FadeProps = TransitionProps;

function Fade(props: FadeProps) {
  const { children, className, in: inProp, onEnter, onExit, style, timeout = defaultTimeout, ...rest } = props;
  const transitionProps: _TransitionProps = {
    appear: true,
    in: inProp,
    timeout: timeout === 'auto' ? defaultTimeout : timeout,
    onEnter(node, isAppearing) {
      reflow(node);

      node.style.transitionDuration = getTransitionDuration({ style, timeout }, { mode: 'enter' });

      if (onEnter) {
        onEnter(node, isAppearing);
      }
    },
    onExit(node) {
      node.style.transitionDuration = getTransitionDuration({ style, timeout }, { mode: 'exit' });

      if (onExit) {
        onExit(node);
      }
    },
    ...rest
  };

  return (
    <Transition {...transitionProps}>
      {state =>
        isValidElement<FadeProps>(children)
          ? cloneElement(children, {
              className: clsx(
                'just-transition-fade',
                classes[state],
                {
                  'just-transition-fade--hidden': state === 'exited' && !inProp
                },
                className,
                children.props.className
              ),
              style: { ...style, ...children.props.style }
            })
          : null
      }
    </Transition>
  );
}

export default Fade;
