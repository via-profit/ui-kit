import React from 'react';
import styled from '@emotion/styled';

export type CheckboxLabelPosition = 'start' | 'end' | 'top' | 'bottom';

export type CheckboxContainerProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * Position of the label relative to the checkbox
   * Default: `end`
   */
  readonly labelPosition?: CheckboxLabelPosition;

  /**
   * If `true` the checkbox state can not be changed
   * Default: false;
   */
  readonly disabled?: boolean;
};

type StyledProps = {
  readonly $disabled?: boolean;
  readonly $labelPosition?: CheckboxLabelPosition;
};

const directions: Record<CheckboxLabelPosition, string> = {
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

const CheckboxContainer: React.ForwardRefRenderFunction<
  HTMLLabelElement,
  CheckboxContainerProps
> = (props, ref) => {
  const { children, labelPosition, disabled, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} $labelPosition={labelPosition} $disabled={disabled} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(CheckboxContainer);
