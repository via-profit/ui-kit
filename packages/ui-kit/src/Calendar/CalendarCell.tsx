import React from 'react';
import styled from '@emotion/styled';

export interface CalendarCellProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly isToday?: boolean;
  readonly isSelected?: boolean;
  readonly isDisabled?: boolean;
}

const Btn = styled.button<{
  $isToday: boolean;
  $isSelected: boolean;
  $isDisabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  width: 3em;
  height: 3em;
  margin: 0;
  min-width: 0;
  outline: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  border: 1px solid transparent;
  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.color.accentPrimary.toString() : theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 3}em;
  color: ${({ $isToday, theme, $isSelected, $isDisabled }) => {
    if ($isDisabled) {
      return theme.color.textSecondary.toString();
    }
    if ($isSelected) {
      return theme.color.accentPrimaryContrast.toString();
    }
    if ($isToday) {
      return theme.color.accentPrimary.toString();
    }

    return theme.color.textPrimary.toString();
  }};
  &:hover {
    background-color: ${({ theme, $isSelected }) =>
      $isSelected
        ? theme.color.accentPrimary.darken(10).toString()
        : theme.color.surface.darken(10).toString()};
  }
  &:focus-visible {
    border-color: ${({ theme, $isDisabled }) =>
      $isDisabled ? 'transparent' : theme.color.accentPrimary.toString()};
  }
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.4 : 1)};
`;

const CalendarCell: React.ForwardRefRenderFunction<HTMLButtonElement, CalendarCellProps> = (
  props,
  ref,
) => {
  const { isToday, children, isSelected, isDisabled, ...restProps } = props;

  return (
    <Btn
      type="button"
      {...restProps}
      ref={ref}
      tabIndex={isDisabled ? -1 : restProps.tabIndex}
      $isToday={Boolean(isToday)}
      $isSelected={Boolean(isSelected)}
      $isDisabled={Boolean(isDisabled)}
    >
      {children}
    </Btn>
  );
};

export default React.forwardRef(CalendarCell);
