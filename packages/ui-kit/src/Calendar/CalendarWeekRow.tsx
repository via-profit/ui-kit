import React from 'react';
import styled from '@emotion/styled';

export type CalendarWeekRowProps = React.HTMLAttributes<HTMLSpanElement>;

const StyledCalendarWeekRow = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  color: inherit;
`;

const CalendarWeekRow: React.ForwardRefRenderFunction<HTMLSpanElement, CalendarWeekRowProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarWeekRow {...restProps} ref={ref}>
      {children}
    </StyledCalendarWeekRow>
  );
};

export default React.forwardRef(CalendarWeekRow);
