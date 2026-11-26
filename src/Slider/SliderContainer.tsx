import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type SliderOrientation = 'horizontal' | 'vertical';

export type SliderContainerProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly orientation: SliderOrientation;
  readonly disabled: boolean;

  /**
   * True if at least one mark has a label: the container reserves the place for the labels
   */
  readonly hasMarkLabels: boolean;
};

type StyledProps = {
  readonly $orientation: SliderOrientation;
  readonly $disabled: boolean;
  readonly $hasMarkLabels: boolean;
};

const StyledContainer = styled.span<StyledProps>`
  position: relative;
  box-sizing: content-box;
  font-size: 1em;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  /* The browser must not scroll the page while the thumb is dragged by the finger */
  touch-action: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  ${({ $orientation, $hasMarkLabels }) =>
    $orientation === 'vertical'
      ? css`
          display: inline-block;
          vertical-align: top;
          width: 0.25em;
          height: 12em;
          padding: 0 0.7em;
          margin-right: ${$hasMarkLabels ? '2.5em' : 0};
        `
      : css`
          display: block;
          width: 100%;
          height: 0.25em;
          padding: 0.7em 0;
          margin-bottom: ${$hasMarkLabels ? '1.4em' : 0};
        `}
`;

const SliderContainer: React.ForwardRefRenderFunction<HTMLSpanElement, SliderContainerProps> = (
  props,
  ref,
) => {
  const { children, orientation, disabled, hasMarkLabels, ...nativeProps } = props;

  return (
    <StyledContainer
      {...nativeProps}
      $orientation={orientation}
      $disabled={disabled}
      $hasMarkLabels={hasMarkLabels}
      ref={ref}
    >
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(SliderContainer);
