import React from 'react';
import styled from '@emotion/styled';

export type RadioLabelPosition = 'start' | 'end' | 'top' | 'bottom';

export type RadioContainerProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * Position of the label relative to the radio button
   * Default: `end`
   */
  readonly labelPosition?: RadioLabelPosition;

  /**
   * If `true` the radio button state can not be changed
   * Default: false;
   */
  readonly disabled?: boolean;
};

type StyledProps = {
  readonly $disabled?: boolean;
  readonly $labelPosition?: RadioLabelPosition;
};

const directions: Record<RadioLabelPosition, string> = {
  start: 'row-reverse',
  end: 'row',
  top: 'column-reverse',
  bottom: 'column',
};

const StyledContainer = styled.label<StyledProps>`
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  font-size: 1em;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  flex-direction: ${({ $labelPosition }) => directions[$labelPosition || 'end']};
`;

const RadioContainer: React.ForwardRefRenderFunction<HTMLLabelElement, RadioContainerProps> = (
  props,
  ref,
) => {
  const { children, labelPosition, disabled, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} $labelPosition={labelPosition} $disabled={disabled} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(RadioContainer);
