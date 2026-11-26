import React from 'react';
import styled from '@emotion/styled';

export interface CalendarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode | readonly React.ReactNode[];
}

const StyledCalendarFooter = styled.div`
  display: flex;
  padding: 0.8em;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
  background-color: ${({ theme }) => theme.color.accentSecondary.toString()};
  color: ${({ theme }) => theme.color.accentSecondaryContrast.toString()};
`;

const CalendarFooterInner = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 -0.8em;
  & > * {
    margin: 0 0.4em;
  }
`;

const CalendarFooter: React.ForwardRefRenderFunction<HTMLDivElement, CalendarFooterProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <StyledCalendarFooter {...restProps} ref={ref}>
      <CalendarFooterInner>{children}</CalendarFooterInner>
    </StyledCalendarFooter>
  );
};

export default React.forwardRef(CalendarFooter);
