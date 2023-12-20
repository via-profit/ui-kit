import React from 'react';
import styled from '@emotion/styled';

import Paragraph from '../Typography/Paragraph';

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

const StyledHeading = styled(Paragraph)`
  font-weight: 600;
  font-size: 1.8em;
  margin: 0 0 0.2em 0;
`;

const StyledSubheading = styled(Paragraph)`
  font-weight: 200;
  font-size: 1em;
  opacity: 0.6;
  margin-bottom: 1em;
`;

const CalendarHeader: React.ForwardRefRenderFunction<HTMLDivElement, CalendarHeaderProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarHeader {...restProps} ref={ref}>
      <StyledHeading>Lorem ipsum</StyledHeading>
      <StyledSubheading>Lorem ipsum dolor set amet</StyledSubheading>
      {children}
    </StyledCalendarHeader>
  );
};

export default React.forwardRef(CalendarHeader);
