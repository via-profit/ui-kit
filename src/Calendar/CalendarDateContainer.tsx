import React from 'react';
import styled from '@emotion/styled';

export type CalendarDateContainerProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 0.4em;
`;

const CalendarDateContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarDateContainerProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarDateContainer {...restProps} ref={ref}>
      {children}
    </StyledCalendarDateContainer>
  );
};

export default React.forwardRef(CalendarDateContainer);
