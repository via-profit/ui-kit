import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import SpinnerCircle, { DEFAULT_SIZE, toCssSize } from './SpinnerCircle';
import LoadingOverlay, { LoadingOverlayProps } from './LoadingOverlay';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Spinner diameter: a number is in pixels, a string is any CSS length (`'1em'`, `'3rem'`)\
   * \
   * **Default**: `'2.4em'`
   */
  readonly size?: number | string;

  /**
   * If `true`, the spinner takes all the free space of a flex parent and is centered in it
   * (e.g. in place of an empty list). If `false`, it takes only its own size\
   * \
   * **Default**: `true`
   */
  readonly fill?: boolean;
}

const Container = styled.span<{ readonly $fill: boolean }>`
  justify-content: center;
  align-items: center;
  ${({ $fill }) =>
    $fill
      ? css`
          height: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
        `
      : css`
          display: inline-flex;
          vertical-align: middle;
        `}
`;

/**
 * Inline loading spinner: takes place in the layout, e.g. inside a button, a field or a list
 */
const Spinner: React.ForwardRefRenderFunction<HTMLSpanElement, SpinnerProps> = (props, ref) => {
  const { size = DEFAULT_SIZE, fill = true, ...nativeProps } = props;

  return (
    // Announced by screen readers; the label can be replaced by the props
    <Container role="status" aria-label="Loading" {...nativeProps} $fill={fill} ref={ref}>
      <SpinnerCircle $size={toCssSize(size)} />
    </Container>
  );
};

const SpinnerWithRef = React.forwardRef(Spinner);
SpinnerWithRef.displayName = 'Spinner';

/**
 * @deprecated Use `Spinner` instead
 */
export const StaticLoadingIndicator = SpinnerWithRef;

/**
 * @deprecated Use `SpinnerProps` instead
 */
export type StaticLoadingIndicatorProps = SpinnerProps;

/**
 * @deprecated Use `LoadingOverlay` from `@via-profit/ui-kit/LoadingIndicator` instead
 */
export const LoadingIndicator = LoadingOverlay;

/**
 * @deprecated Use `LoadingOverlayProps` instead
 */
export type LoadingIndicatorProps = LoadingOverlayProps;

export default SpinnerWithRef;
