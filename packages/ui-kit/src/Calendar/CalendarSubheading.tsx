import React from 'react';
import styled from '@emotion/styled';

export type CalendarSubheadingProps = React.HTMLAttributes<HTMLDivElement>;

const StyledCalendarSubheading = styled.div`
  font-weight: 200;
  font-size: 1em;
  opacity: 0.6;
  margin-bottom: 1em;
`;

const CalendarSubheading: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarSubheadingProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarSubheading {...restProps} ref={ref}>
      {children}
    </StyledCalendarSubheading>
  );
};

export default React.forwardRef(CalendarSubheading);
