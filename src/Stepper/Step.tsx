import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Color from '../Color';
import { StepIndexContext, StepperContext, StepperOrientation } from './context';

export type StepState = 'completed' | 'active' | 'pending';

export type StepProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * The label of the step
   */
  readonly children: React.ReactNode;

  /**
   * The small text under the label: «optional», «1 of 2», the time
   */
  readonly caption?: React.ReactNode;

  /**
   * The step is completed regardless of `activeStep` of the stepper
   * (e.g. the payment came before the work)
   */
  readonly completed?: boolean;

  /**
   * The attention on the step: `warning` — something is not finished, `error` — something went wrong.
   * Colors the icon of the step that is not completed
   */
  readonly status?: 'warning' | 'error';

  /**
   * Own icon instead of the number
   */
  readonly icon?: React.ReactNode;
};

type StyleProps = {
  readonly $state: StepState;
  readonly $color: Color;
  readonly $contrastColor: Color;
  readonly $status: 'warning' | 'error' | null;
};

const Container = styled.div<{
  readonly $orientation: StepperOrientation;
  readonly $alternativeLabel: boolean;
  readonly $last: boolean;
}>`
  position: relative;
  display: flex;
  ${({ $orientation, $alternativeLabel, $last }) =>
    $orientation === 'vertical'
      ? css`
          flex-direction: column;
        `
      : $alternativeLabel
        ? css`
            flex: 1 1 0;
            flex-direction: column;
            align-items: center;
            text-align: center;
          `
        : css`
            flex: ${$last ? '0 0 auto' : '1 1 auto'};
            align-items: center;
          `}
`;

const Head = styled.div<{ readonly $alternativeLabel: boolean }>`
  display: flex;
  align-items: ${({ $alternativeLabel }) => ($alternativeLabel ? 'center' : 'flex-start')};
  flex-direction: ${({ $alternativeLabel }) => ($alternativeLabel ? 'column' : 'row')};
  gap: ${({ $alternativeLabel }) => ($alternativeLabel ? '0.35em' : '0.5em')};
  flex-shrink: 0;
`;

/**
 * The circle of the step: the check of the completed one, the number of the others
 */
const Icon = styled.span<StyleProps>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 1.6em;
  height: 1.6em;
  border-radius: 50%;
  font-size: 1em;
  font-weight: 600;
  ${({ theme, $state, $color, $contrastColor, $status }) => {
    // the attention (warning, error) colors the step that is not completed
    const main = $status ? theme.color[$status] : $color;
    switch ($state) {
      // done: the pale plate of the color and the check of the color
      case 'completed':
        return css`
          background-color: ${$color.alpha(0.15).toString()};
          color: ${$color.toString()};
        `;
      // now: the contrast plate of the color, the border and the number of the color
      case 'active':
        return css`
          border: 2px solid ${main.toString()};
          background-color: ${($status ? theme.color.surface : $contrastColor).toString()};
          color: ${main.toString()};
        `;
      // ahead: pale grey
      default:
        return $status
          ? css`
              border: 1.5px solid ${main.toString()};
              background-color: ${theme.color.surface.toString()};
              color: ${main.darken(20).toString()};
            `
          : css`
              background-color: ${theme.color.textPrimary.alpha(0.06).toString()};
              color: ${theme.color.textSecondary.alpha(0.7).toString()};
            `;
    }
  }}
  & > span {
    font-size: 0.75em;
  }
  & > svg {
    width: 0.85em;
    height: 0.85em;
  }
`;

const Label = styled.span<{ readonly $state: StepState }>`
  display: flex;
  flex-direction: column;
  padding-top: 0.15em;
  line-height: 1.3;
  font-size: 0.929em;
  font-weight: ${({ $state }) => ($state === 'active' ? 600 : 400)};
  color: ${({ theme, $state }) =>
    ($state === 'pending' ? theme.color.textSecondary : theme.color.textPrimary).toString()};
`;

const Caption = styled.span`
  font-size: 0.857em;
  font-weight: 400;
  color: ${({ theme }) => theme.color.textSecondary.toString()};
`;

/**
 * The line to the next step: accented after the completed step
 */
const Connector = styled.span<{
  readonly $orientation: StepperOrientation;
  readonly $alternativeLabel: boolean;
  readonly $done: boolean;
  readonly $color: Color;
}>`
  background-color: ${({ theme, $done, $color }) =>
    ($done ? $color : theme.color.textPrimary.alpha(0.15)).toString()};
  ${({ $orientation, $alternativeLabel }) =>
    $orientation === 'vertical'
      ? css`
          width: 1.5px;
          min-height: 0.75em;
          margin: 0.25em 0 0.25em calc(0.8em - 0.75px);
          flex: 1 1 auto;
        `
      : $alternativeLabel
        ? css`
            position: absolute;
            top: calc(0.8em - 0.75px);
            left: calc(50% + 1.1em);
            right: calc(-50% + 1.1em);
            height: 1.5px;
          `
        : css`
            flex: 1 1 auto;
            min-width: 1em;
            height: 1.5px;
            margin: 0 0.5em;
          `}
`;

const Check = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * One step of the `<Stepper>`
 */
const Step: React.ForwardRefRenderFunction<HTMLDivElement, StepProps> = (props, ref) => {
  const { children, caption, completed, status, icon, ...nativeProps } = props;
  const stepper = React.useContext(StepperContext);
  const { index, last } = React.useContext(StepIndexContext);

  if (!stepper) {
    throw new Error('<Step> should be placed inside <Stepper>');
  }

  const { activeStep, orientation, alternativeLabel, color, contrastColor } = stepper;
  const state: StepState =
    completed || (typeof completed === 'undefined' && index < activeStep)
      ? 'completed'
      : index === activeStep
        ? 'active'
        : 'pending';

  return (
    <Container
      role="listitem"
      aria-current={state === 'active' ? 'step' : undefined}
      {...nativeProps}
      $orientation={orientation}
      $alternativeLabel={alternativeLabel}
      $last={last}
      ref={ref}
    >
      <Head $alternativeLabel={alternativeLabel}>
        <Icon $state={state} $color={color} $contrastColor={contrastColor} $status={status ?? null}>
          {state === 'completed' ? <Check /> : (icon ?? <span>{index + 1}</span>)}
        </Icon>
        <Label $state={state}>
          {children}
          {caption && <Caption>{caption}</Caption>}
        </Label>
      </Head>
      {!last && (
        <Connector
          $orientation={orientation}
          $alternativeLabel={alternativeLabel}
          $done={state === 'completed'}
          $color={color}
        />
      )}
    </Container>
  );
};

export default React.forwardRef(Step);
