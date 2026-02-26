import React from 'react';
import styled from '@emotion/styled';

import Button from '../Button';
import CalendarWeekRow from './CalendarWeekRow';
import { Week } from './use-calendar';

export type CalendarWeekRowButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  readonly isSelected?: boolean;
  readonly accentColor: string;
  readonly week: Week;
};

const StyleButton = styled(Button)`
  padding: 0.2em 0.5em;
  font-size: 1em;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 3}em;
`;



const CalendarWeekRowButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CalendarWeekRowButtonProps
> = (props, ref) => {
  const { children, isSelected, accentColor, ...restProps } = props;

  return (
    <StyleButton
      type="button"
      variant={isSelected ? 'standard' : 'plain'}
      color={isSelected ? accentColor : 'default'}
      {...restProps}
      ref={ref}
    >
      <CalendarWeekRow>{children}</CalendarWeekRow>
    </StyleButton>
  );
};

export default React.forwardRef(CalendarWeekRowButton);
