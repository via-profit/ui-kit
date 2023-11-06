import React from 'react';
import styled from '@emotion/styled';

import ButtonBase from '../Button/ButtonBase';

export type BadgeDeleteButtonProps = Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'>;

const StyledButton = styled(ButtonBase)`
  display: flex;
  padding: 0.3em;
  align-items: center;
  justify-content: center;
  margin-left: 0.1em;
  margin-right: 0.14em;
  color: currentColor;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 100ms ease-out;
  }
  &:hover:before {
    opacity: 0.2;
  }
`;

const BadgeDeleteButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  BadgeDeleteButtonProps
> = (props, ref) => (
  <StyledButton {...props} ref={ref}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
    >
      <path
        d="m139.86 128.54a16 16 0 0 0-7.1738 4.1406 16 16 0 0 0 0 22.629l100.69 100.69-100.69 100.69a16 16 0 0 0 0 22.629 16 16 0 0 0 22.629 0l100.69-100.69 100.69 100.69a16 16 0 0 0 22.629 0 16 16 0 0 0 0-22.629l-100.69-100.69 100.69-100.69a16 16 0 0 0 0-22.629 16 16 0 0 0-22.629 0l-100.69 100.69-100.69-100.69a16 16 0 0 0-15.455-4.1406z"
        fill="currentColor"
      />
    </svg>
  </StyledButton>
);

export default React.forwardRef(BadgeDeleteButton);
