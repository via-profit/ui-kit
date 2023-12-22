import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';

export interface CalendarCellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * if cell day is today, then property will be true
   */
  readonly isToday?: boolean;

  /**
   * if cell day is selected, then property will be true
   */
  readonly isSelected?: boolean;

  /**
   * if cell day is disabled, then property will be true
   */
  readonly isDisabled?: boolean;

  /**
   * Cell accent color\
   * Possibility variants: `primary` `secondary` or custom color string like hex or rgb format
   */
  readonly accentColor?: 'primary' | 'secondary' | string;
}

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  width: 3em;
  height: 3em;
  margin: 0;
  min-width: 0;
  outline: none;
  position: relative;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 3}em;
`;

const CalendarCell: React.ForwardRefRenderFunction<HTMLButtonElement, CalendarCellProps> = (
  props,
  ref,
) => {
  const { isToday, children, isSelected, isDisabled, accentColor, ...restProps } = props;

  return (
    <Btn
      iconOnly
      type="button"
      variant={isSelected ? 'standard' : isToday ? 'outlined' : 'plain'}
      color={isSelected || isToday ? accentColor : 'default'}
      tabIndex={isDisabled ? -1 : restProps.tabIndex}
      disabled={isDisabled}
      {...restProps}
      ref={ref}
    >
      {children}
    </Btn>
  );
};

export default React.forwardRef(CalendarCell);
