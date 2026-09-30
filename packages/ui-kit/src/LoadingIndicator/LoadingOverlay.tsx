import * as React from 'react';
import styled from '@emotion/styled';

import SpinnerCircle, { DEFAULT_SIZE, toCssSize } from './SpinnerCircle';

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Spinner diameter: a number is in pixels, a string is any CSS length (`'1em'`, `'3rem'`)\
   * \
   * **Default**: `'2.4em'`
   */
  readonly size?: number | string;
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * Covers the nearest positioned ancestor (`position: relative` etc.) and centers the spinner in it
 */
const LoadingOverlay: React.ForwardRefRenderFunction<HTMLDivElement, LoadingOverlayProps> = (
  props,
  ref,
) => {
  const { size = DEFAULT_SIZE, ...nativeProps } = props;

  return (
    // Announced by screen readers; the label can be replaced by the props
    <Container role="status" aria-label="Loading" {...nativeProps} ref={ref}>
      <SpinnerCircle $size={toCssSize(size)} />
    </Container>
  );
};

export default React.forwardRef(LoadingOverlay);
