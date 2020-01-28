import { TransitionProps, TransitionTimeout } from './typings';

export interface GetTransitionDurationsOptions {
  mode: keyof NonNullable<Exclude<TransitionProps['timeout'], number | 'auto'>>;
}

export interface GetTransitionDurationProps {
  style?: TransitionProps['style'];
  timeout: TransitionTimeout;
}

export function getTransitionDuration(props: GetTransitionDurationProps, options: GetTransitionDurationsOptions) {
  const { style = {}, timeout } = props;
  const { mode } = options;
  return timeout === 'auto'
    ? 'auto'
    : style.transitionDuration || `${typeof timeout === 'number' ? timeout : timeout[mode] || 0}ms`;
}
