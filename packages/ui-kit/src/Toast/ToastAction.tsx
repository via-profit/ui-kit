import React from 'react';
import styled from '@emotion/styled';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type ToastActionProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  margin: 0;
  padding: 0.35em 0.7em;
  border: 0;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.1).toString()};
  color: ${({ theme }) => theme.color.accentPrimary.toString()};
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.18).toString()};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 1px;
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const ToastAction: React.ForwardRefRenderFunction<HTMLButtonElement, ToastActionProps> = (
  props,
  ref,
) => <StyledButton type="button" {...props} ref={ref} />;

export default React.forwardRef(ToastAction);
