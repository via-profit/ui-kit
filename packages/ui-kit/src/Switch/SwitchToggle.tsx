import React from 'react';
import styled from '@emotion/styled';

export type SwitchToggleProps = React.HTMLAttributes<HTMLSpanElement> & {
  readonly checked: boolean;
  readonly disabled?: boolean;
  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
};

type StyleProps = {
  readonly color?: SwitchToggleProps['color'];
  readonly disabled?: boolean;
  readonly checked: boolean;
};

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
`;

const Switch = styled.span<StyleProps>`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  padding: 0.8rem;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1;
  color: rgb(255, 255, 255);
  transition:
    left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform: ${({ checked }) => (checked ? 'translateX(1.5rem)' : 'translateX(0)')};
`;

const Dot = styled.span<StyleProps>`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 2px 1px -1px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
  background-color: ${({ color, checked, disabled, theme }) => {
    switch (true) {
      case !checked:
        return theme.color.accentPrimaryContrast.toString();

      case disabled:
        return theme.color.accentPrimary.alpha(0.8).toString();
      case !disabled && typeof color === 'undefined':
      default:
        return theme.color.accentPrimary.toString();
    }
  }};
`;

const Track = styled.span<StyleProps>`
  height: 100%;
  width: 100%;
  border-radius: 7px;
  transition:
    opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: ${({ color, disabled, checked, theme }) => {
    switch (true) {
      case !checked:
        return theme.color.backgroundSecondary.toString();
      case disabled:
        return theme.color.accentPrimary.alpha(0.8).toString();
      case !disabled && typeof color === 'undefined':
      default:
        return theme.color.accentPrimary.toString();
    }
  }};
  opacity: 0.5;
`;

const SwitchToggle: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchToggleProps> = (
  props,
  ref,
) => {
  const { disabled, color, checked, ...nativeProps } = props;

  return (
    <ToggleWrapper ref={ref}>
      <StyledInput {...nativeProps} type="checkbox" />
      <Track color={color} disabled={disabled} checked={checked} />
      <Switch color={color} disabled={disabled} checked={checked}>
        <Dot color={color} disabled={disabled} checked={checked} />
      </Switch>
    </ToggleWrapper>
  );
};

export default React.forwardRef(SwitchToggle);
