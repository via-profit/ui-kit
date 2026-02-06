import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';
import { css } from '@emotion/react';

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

  readonly fill?: boolean;
}

const Btn = styled(Button)<{ $fill?: boolean; $isSelected?: boolean }>`
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
  ${({ $fill, theme, $isSelected }) =>
    $fill &&
    !$isSelected &&
    css`
      background-color: none;
      position: relative;

      &:before {
        position: absolute;
        border-radius: ${theme.shape.radiusFactor * 0.8}em;
        inset: 0.6em;
        content: '';
        background-color: ${theme.color.accentPrimary.alpha(0.9).toString()};
      }
      & > span {
        position: relative;
        color: ${theme.color.accentPrimaryContrast.toString()};
      }
    `};
`;

const CalendarCell: React.ForwardRefRenderFunction<HTMLButtonElement, CalendarCellProps> = (
  props,
  ref,
) => {
  const { isToday, children, isSelected, isDisabled, accentColor, fill, ...restProps } = props;

  return (
    <Btn
      iconOnly
      type="button"
      $fill={fill}
      $isSelected={isSelected}
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
