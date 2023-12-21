import React from 'react';
import styled from '@emotion/styled';

export type CalendarHeaderProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarHeader = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-bottom: 0.5em;
  padding: 0.8em 0.8em 0.4em 0.8em;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  background-color: ${({ theme }) => theme.color.accentSecondary.toString()};
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
`;

const CalendarHeader: React.ForwardRefRenderFunction<HTMLDivElement, CalendarHeaderProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarHeader {...restProps} ref={ref}>
      {children}
    </StyledCalendarHeader>
  );
};

export default React.forwardRef(CalendarHeader);
