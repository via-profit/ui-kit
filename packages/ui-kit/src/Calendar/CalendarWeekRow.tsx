import React from 'react';
import styled from '@emotion/styled';

export type CalendarWeekRowProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarWeekRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const CalendarWeekRow: React.ForwardRefRenderFunction<HTMLDivElement, CalendarWeekRowProps> = (
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
