import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Color from '../Color';

export interface CalendarDayBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly accentColor?: 'primary' | 'secondary' | string;
  readonly isToday: boolean;
  readonly badgeContent: React.ReactNode;
}

type BadgeContentStyles = {
  readonly $color: string;
  readonly $backgroundColor: string;
};

const StyledBadge = styled.span<BadgeContentStyles>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $color }) => $color};
  position: absolute;
  top: -0.5em;
  left: 55%;
  border-radius: 20px;
  padding: 4px;
  box-sizing: border-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 0.8em;
  min-width: 1.8em;
  min-height: 0.8em;
  max-width: 4em;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
`;

const CalendarDayBadge: React.ForwardRefRenderFunction<HTMLButtonElement, CalendarDayBadgeProps> = (
  props,
  ref,
) => {
  const { isToday, children, accentColor = 'secondary', badgeContent, ...restProps } = props;
  const theme = useTheme();

  const { $color, $backgroundColor } = React.useMemo(() => {
    if (!badgeContent) {
      return {
        $color: 'transparent',
        $backgroundColor: 'transparent',
      };
    }
    if (accentColor === 'primary') {
      return {
        $color: theme.color.accentPrimaryContrast.toString(),
        $backgroundColor: theme.color.accentPrimary.toString(),
      };
    }

    if (accentColor === 'secondary') {
      return {
        $color: theme.color.accentSecondaryContrast.toString(),
        $backgroundColor: theme.color.accentSecondary.toString(),
      };
    }

    const clr = new Color(accentColor);

    return {
      $backgroundColor: accentColor,
      $color:
        clr.getContrast(accentColor) > 5
          ? theme.color.textPrimary.toString()
          : theme.color.surface.toString(),
    };
  }, [accentColor, theme, badgeContent]);

  if (!badgeContent) {
    return children;
  }

  return (
    <StyledBadge $color={$color} $backgroundColor={$backgroundColor} {...restProps} ref={ref}>
      {badgeContent}
    </StyledBadge>
  );
};

export default React.forwardRef(CalendarDayBadge);
