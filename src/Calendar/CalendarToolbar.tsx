import React from 'react';
import styled from '@emotion/styled';

export type CalendarToolbarProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;
  margin-left: -0.8em;
  margin-right: -0.8em;
`;

const CalendarToolbar: React.ForwardRefRenderFunction<HTMLDivElement, CalendarToolbarProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarToolbar {...restProps} ref={ref}>
      {children}
    </StyledCalendarToolbar>
  );
};

export default React.forwardRef(CalendarToolbar);
