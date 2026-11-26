import React from 'react';
import styled from '@emotion/styled';
import { themeFocusRing } from '../ThemeProvider/tokens';

export type ToastCloseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.75em;
  height: 1.75em;
  margin: -0.25em -0.5em -0.25em 0;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  color: inherit;
  opacity: 0.55;
  cursor: pointer;
  transition:
    opacity 150ms ease-out,
    background-color 150ms ease-out;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.08).toString()};
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid ${({ theme }) => theme.color.accentPrimary.toString()};
    outline-offset: 0;
  }

  & svg {
    width: 0.85em;
    height: 0.85em;
  }
  ${({ theme }) => themeFocusRing(theme)}
`;

const ToastCloseButton: React.ForwardRefRenderFunction<HTMLButtonElement, ToastCloseButtonProps> = (
  props,
  ref,
) => (
  <StyledButton type="button" {...props} ref={ref}>
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  </StyledButton>
);

export default React.forwardRef(ToastCloseButton);
