import React from 'react';
import styled from '@emotion/styled';

import StartIconWrapper from './components/StartIconWrapper';
import EndIconWrapper from './components/EndIconWrapper';
import TextWrapper from './components/TextWrapper';

import type { ButtonBaseProps } from '@via-profit/ui-kit/Button/ButtonBase';

const Button = styled.button`
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  padding: 0.8em 1em;
  font-size: 0.8rem;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-size: 1em;
  border: 0;
  outline: transparent;
  transition: all 180ms ease-out 0s;
  background: none;
  color: currentColor;
  display: inline-flex;
  align-items: center;
`;

const ButtonBase: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonBaseProps> = (
  props,
  ref,
) => {
  const { children, startIcon, endIcon, ...otherProps } = props;

  return (
    <Button {...otherProps} ref={ref}>
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <StartIconWrapper>{startIcon}</StartIconWrapper>
      )}

      <TextWrapper>{children}</TextWrapper>
      {typeof endIcon !== 'undefined' && endIcon !== null && (
        <EndIconWrapper>{endIcon}</EndIconWrapper>
      )}
    </Button>
  );
};

export default React.forwardRef(ButtonBase);
