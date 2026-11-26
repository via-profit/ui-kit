import React from 'react';

import Color from '../Color';

export type StepperOrientation = 'horizontal' | 'vertical';

export type StepperContextValue = {
  readonly activeStep: number;
  readonly orientation: StepperOrientation;
  readonly alternativeLabel: boolean;
  readonly color: Color;
  /**
   * The plate of the current step: the contrast color of the theme for the accent
   */
  readonly contrastColor: Color;
};

export const StepperContext = React.createContext<StepperContextValue | null>(null);

/**
 * The place of the step in the stepper: set by the stepper for every child
 */
export const StepIndexContext = React.createContext<{
  readonly index: number;
  readonly last: boolean;
}>({ index: 0, last: true });
