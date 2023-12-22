import React from 'react';
import styled from '@emotion/styled';

export type CalendarPaperProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarPaper = styled.div`
  width: 18em;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: stretch;
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
`;

const CalendarPaper: React.ForwardRefRenderFunction<HTMLDivElement, CalendarPaperProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarPaper {...restProps} ref={ref}>
      {children}
    </StyledCalendarPaper>
  );
};

export default React.forwardRef(CalendarPaper);
