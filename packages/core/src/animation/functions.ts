import { ANIMATION_CURVE_TIMING_FUNCTIONS } from './variables';

function addMsSuffix(milliseconds: string | number) {
  return typeof milliseconds === 'string' ? milliseconds : `${Math.round(milliseconds)}ms`;
}

function createTransitionCreator(curveTimingFunctionName: keyof typeof ANIMATION_CURVE_TIMING_FUNCTIONS) {
  function createTransition(name: string, duration: string | number, delay: string | number = 0) {
    const curveTimingFunction = ANIMATION_CURVE_TIMING_FUNCTIONS[curveTimingFunctionName];
    return `${name} ${addMsSuffix(duration)} ${addMsSuffix(delay)} ${curveTimingFunction}`;
  }

  return createTransition;
}

export const enter = createTransitionCreator('DECELERATION');
export const exit = createTransitionCreator('ACCELERATION');
export const sharp = createTransitionCreator('SHARP');
export const standard = createTransitionCreator('STANDARD');
