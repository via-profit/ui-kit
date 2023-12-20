import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button, { ButtonProps } from '../Button';

export type CalendarYearButtonProps = ButtonProps;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        color: ${theme.color.accentSecondaryContrast.alpha(0.5).toString()};
        background-color: ${theme.color.accentSecondary.lighten(10).toString()};
      }
      &:active {
        color: ${theme.color.accentSecondaryContrast.alpha(0.9).toString()};
      }
    `}
`;

const CalendarYearButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarYearButtonProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <StyledButton variant="plain" type="button" {...restProps} ref={ref}>
      {children}
    </StyledButton>
  );
};

export default React.forwardRef(CalendarYearButton);
