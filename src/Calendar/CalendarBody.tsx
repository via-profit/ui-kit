import React from 'react';
import styled from '@emotion/styled';

export type CalendarBodyProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 15em;
`;

const CalendarBody: React.ForwardRefRenderFunction<HTMLDivElement, CalendarBodyProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarBody {...restProps} ref={ref}>
      {children}
    </StyledCalendarBody>
  );
};

export default React.forwardRef(CalendarBody);
