import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';

export interface CalendarMonthCellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If month selected, then property will be true
   */
  readonly isSelected?: boolean;

  /**
   * accent color
   */
  readonly accentColor?: 'primary' | 'secondary' | string;
}

const Btn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  margin: 0;
  min-width: 0;
  flex-basis: 50%;
`;

const CalendarMonthCell: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarMonthCellProps
> = (props, ref) => {
  const { children, isSelected, accentColor, ...restProps } = props;

  return (
    <Btn
      {...restProps}
      type="button"
      variant={isSelected ? 'standard' : 'plain'}
      color={isSelected ? accentColor : 'default'}
      ref={ref}
    >
      {children}
    </Btn>
  );
};

export default React.forwardRef(CalendarMonthCell);
