import React from 'react';
import styled from '@emotion/styled';

const SelectorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  padding: 0.8em;
`;

export type CalendarMonthsSelectorProps = React.HTMLAttributes<HTMLDivElement>;

const CalendarMonthsSelector: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarMonthsSelectorProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <SelectorContainer {...restProps} ref={ref}>
      {children}
    </SelectorContainer>
  );
};

export default React.forwardRef(CalendarMonthsSelector);
