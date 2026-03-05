import React from 'react';
import styled from '@emotion/styled';

export type CalendarHeadingProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarHeading = styled.div`
  font-weight: 600;
  font-size: 1.2em;
  margin: 0 0 0.2em 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

const CalendarHeading: React.ForwardRefRenderFunction<HTMLDivElement, CalendarHeadingProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarHeading {...restProps} ref={ref}>
      {children}
    </StyledCalendarHeading>
  );
};

export default React.forwardRef(CalendarHeading);
