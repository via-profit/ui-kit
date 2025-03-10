import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type CheckboxContainerProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /**
   * This property changes position of checkbox and its label.
   * Default: `end`
   */
  readonly labelPosition?: 'start' | 'end' | 'top' | 'bottom';

  /**
   * if `true` checkbox state can not be changed
   * Default: false;
   */
  readonly disabled?: boolean;
};

type StyledProps = {
  readonly disabled?: boolean;
  readonly labelPosition?: 'start' | 'end' | 'top' | 'bottom';
};

const StyledContainer = styled.label<StyledProps>`
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  padding-right: 1em;
  display: inline-flex;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  ${({ labelPosition }) => {
    let direction = 'row';

    switch (labelPosition) {
      case 'bottom':
        direction = 'column';
        break;

      case 'start':
        direction = 'row-reverse';
        break;

      case 'top':
        direction = 'column-reverse';
        break;

      default:
        //do nothing
        break;
    }

    return css`
      flex-direction: ${direction};
    `;
  }}
`;

const CheckboxContainer: React.ForwardRefRenderFunction<
  HTMLLabelElement,
  CheckboxContainerProps
> = (props, ref) => {
  const { children, labelPosition, disabled, ...nativeProps } = props;

  return (
    <StyledContainer {...nativeProps} labelPosition={labelPosition} disabled={disabled} ref={ref}>
      {children}
    </StyledContainer>
  );
};

export default React.forwardRef(CheckboxContainer);
