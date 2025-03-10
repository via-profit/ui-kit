import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import { CheckboxProps } from './index';
import Color from '../Color';

export type CheckboxCheckProps = React.HTMLAttributes<HTMLSpanElement> & {
  /**
   * This prop allows you to provide checkbox state and control it. This property overrides internal component state
   */
  readonly checked: boolean;

  readonly color?: CheckboxProps['color'];
};
type StyleProps = {
  readonly $color?: Color;
  readonly checked: boolean;
};

const ToggleContainer = styled.span<StyleProps>`
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
`;

const Check = styled.span<StyleProps>`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4px;
  background-color: ${({ $color, checked, theme }) => {
    switch (true) {
      case checked:
        return $color ? $color.toString() : theme.color.accentPrimary.toString();
      default:
        return theme.isDark ? theme.color.textPrimary.toString() : theme.color.surface.toString();
    }
  }};
  /* &:before {
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    transition: all 0.3s ease-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: ${({ $color, checked, theme }) => {
    switch (true) {
      case checked:
        return $color
          ? $color.alpha(0.2).toString()
          : theme.color.accentPrimary.alpha(0.2).toString();
      default:
        return theme.isDark
          ? theme.color.textPrimary.alpha(0.2).toString()
          : theme.color.surface.alpha(0.2).toString();
    }
  }};
  }
  &:after {
    content: '';
    position: absolute;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    transition: all 0.3s ease-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background-color: ${({ $color, checked, theme }) => {
    switch (true) {
      case checked:
        return $color
          ? $color.alpha(0.1).toString()
          : theme.color.accentPrimary.alpha(0.1).toString();
      default:
        return theme.isDark
          ? theme.color.textPrimary.alpha(0.1).toString()
          : theme.color.surface.alpha(0.1).toString();
    }
  }};
  } */
`;

const CheckboxCheck: React.ForwardRefRenderFunction<HTMLSpanElement, CheckboxCheckProps> = (
  props,
  ref,
) => {
  const { children, color, checked, ...nativeProps } = props;
  const theme = useTheme();

  const { $color } = React.useMemo(() => {
    switch (true) {
      case color === 'primary':
        return {
          $color: theme.color.accentPrimary,
        };
      case color === 'secondary':
        return {
          $color: theme.color.accentSecondary,
        };
      case typeof color === 'undefined':
      case color === 'default':
        return {
          $color: theme.color.accentPrimary,
        };

      case typeof color === 'string': {
        let $color = theme.color.surface;
        try {
          if (color) {
            $color = new Color(color);
          }
        } catch (err) {
          console.error(`invalid color value «${color}»`);
        }

        return {
          $color,
        };
      }

      default:
        return {
          $color: theme.color.surface,
        };
    }
  }, [color, theme.color]);

  return (
    <ToggleContainer {...nativeProps} ref={ref} $color={$color} checked={checked}>
      <Check $color={$color} checked={checked}>
        {children}
      </Check>
    </ToggleContainer>
  );
};

export default React.forwardRef(CheckboxCheck);
