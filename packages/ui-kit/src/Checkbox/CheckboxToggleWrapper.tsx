import React from 'react';
import styled from '@emotion/styled';

export type CheckboxToggleWrapperProps = React.InputHTMLAttributes<HTMLInputElement>;

const ToggleWrapper = styled.span`
  font-size: 0.86em;
  display: inline-flex;
  align-items: center;
  user-select: none;
  position: relative;
  height: 3rem;
  width: 4.5rem;
  padding: 1.1rem;
  overflow: hidden;
  box-sizing: border-box;
  &:hover span[class*='ToggleContainer'] > span[class*='Dot']:after {
    transform: translate(-50%, -50%) scale(1.7);
  }
`;

const StyledInput = styled.input`
  cursor: inherit;
  position: absolute;
  width: 100%;
  opacity: 0;
  height: 100%;
  top: 0px;
  left: 0px;
  margin: 0px;
  padding: 0px;
  z-index: 1;
  &:focus-visible ~ span[class*='ToggleContainer'] > span[class*='Dot']:before {
    transform: translate(-50%, -50%) scale(1.7);
  }
`;

const CheckboxToggleWrapper: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  CheckboxToggleWrapperProps
> = (props, ref) => {
  const { children, disabled, ...nativeProps } = props;

  return (
    <ToggleWrapper ref={ref}>
      <StyledInput
        {...nativeProps}
        disabled={disabled}
        onChange={e => {
          nativeProps?.onChange && nativeProps.onChange(e);
        }}
        type="checkbox"
      />
      {children}
    </ToggleWrapper>
  );
};

export default React.forwardRef(CheckboxToggleWrapper);
