import React from 'react';
import styled from '@emotion/styled';

const SelectorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 0.8em;
`;

export type CalendarYearsSelectorProps = React.HTMLAttributes<HTMLDivElement>;

const CalendarYearsSelector: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarYearsSelectorProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <SelectorContainer {...restProps} ref={ref}>
      {children}
    </SelectorContainer>
  );
};

export default React.forwardRef(CalendarYearsSelector);
