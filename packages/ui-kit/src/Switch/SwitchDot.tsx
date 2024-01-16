import React from 'react';
import styled from '@emotion/styled';

export type SwitchDotProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * This prop allows you to provide switch state and control it. This property overrides internal component state
   */
  readonly checked: boolean;

  /**
   * You can pass the primary, default, secondary name of the colors or your specified color value
   */
  readonly color?: 'default' | 'primary' | 'secondary' | string;
};
type StyleProps = {
  readonly color?: SwitchDotProps['color'];
  readonly checked: boolean;
};

const DotContainer = styled.span<StyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
  vertical-align: middle;
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
  background-color: inherit;
  background-color: ${({ color, checked, theme }) => {
    switch (true) {
      case !checked:
        return theme.isDark ? theme.color.textPrimary.toString() : theme.color.surface.toString();
      case typeof color === 'undefined':
      default:
        return theme.color.accentPrimary.toString();
    }
  }};
`;

const SwitchDot: React.ForwardRefRenderFunction<HTMLSpanElement, SwitchDotProps> = (props, ref) => {
  const { children, color, checked, ...nativeProps } = props;

  return (
    <DotContainer {...nativeProps} ref={ref} color={color} checked={checked}>
      <Dot color={color} checked={checked}>
        {children}
      </Dot>
    </DotContainer>
  );
};

export default React.forwardRef(SwitchDot);
