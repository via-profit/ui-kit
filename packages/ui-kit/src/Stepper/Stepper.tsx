import React from 'react';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';

import Color from '../Color';
import { StepIndexContext, StepperContext, StepperOrientation } from './context';

export type StepperProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * The current step from 0: the steps before it are completed. `-1` — nothing is started,
   * the number of the steps — everything is completed
   * Default: `0`
   */
  readonly activeStep?: number;

  /**
   * `horizontal` — the steps in a row, `vertical` — in a column
   * Default: `horizontal`
   */
  readonly orientation?: StepperOrientation;

  /**
   * The labels under the icons (the horizontal stepper only): the steps share the width equally
   * Default: false
   */
  readonly alternativeLabel?: boolean;

  /**
   * The color of the completed and the current steps: the primary, secondary name or any CSS color
   * Default: `primary`
   */
  readonly color?: 'primary' | 'secondary' | string;
};

const StyledStepper = styled.div<{
  readonly $orientation: StepperOrientation;
  readonly $alternativeLabel: boolean;
}>`
  display: flex;
  ${({ $orientation, $alternativeLabel }) =>
    $orientation === 'vertical'
      ? css`
          flex-direction: column;
        `
      : css`
          flex-direction: row;
          align-items: ${$alternativeLabel ? 'flex-start' : 'center'};
        `}
`;

/**
 * The steps of a process: done, the current one, ahead. Children — the `<Step>` elements
 */
const Stepper: React.ForwardRefRenderFunction<HTMLDivElement, StepperProps> = (props, ref) => {
  const {
    activeStep = 0,
    orientation = 'horizontal',
    alternativeLabel = false,
    color = 'primary',
    children,
    ...nativeProps
  } = props;
  const theme = useTheme();
  const [resolvedColor, contrastColor] = React.useMemo(() => {
    if (color === 'primary') {
      return [theme.color.accentPrimary, theme.color.accentPrimaryContrast];
    }
    if (color === 'secondary') {
      return [theme.color.accentSecondary, theme.color.accentSecondaryContrast];
    }
    try {
      const own = Color.fromString(color);

      return [own, own.getContrastColor()];
    } catch {
      return [theme.color.accentPrimary, theme.color.accentPrimaryContrast];
    }
  }, [
    color,
    theme.color.accentPrimary,
    theme.color.accentPrimaryContrast,
    theme.color.accentSecondary,
    theme.color.accentSecondaryContrast,
  ]);

  const context = React.useMemo(
    () => ({
      activeStep,
      orientation,
      alternativeLabel: orientation === 'horizontal' && alternativeLabel,
      color: resolvedColor,
      contrastColor,
    }),
    [activeStep, orientation, alternativeLabel, resolvedColor, contrastColor],
  );
  const steps = React.Children.toArray(children).filter(
    React.isValidElement,
  ) as React.ReactElement<{
    readonly completed?: boolean;
  }>[];

  return (
    <StepperContext.Provider value={context}>
      <StyledStepper
        role="list"
        aria-orientation={orientation}
        {...nativeProps}
        $orientation={orientation}
        $alternativeLabel={context.alternativeLabel}
        ref={ref}
      >
        {steps.map((step, index) => (
          <StepIndexContext.Provider
            key={step.key ?? index}
            value={{ index, last: index === steps.length - 1 }}
          >
            {step}
          </StepIndexContext.Provider>
        ))}
      </StyledStepper>
    </StepperContext.Provider>
  );
};

export default React.forwardRef(Stepper);
