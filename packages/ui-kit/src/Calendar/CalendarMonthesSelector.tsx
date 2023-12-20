import React from 'react';
import styled from '@emotion/styled';

const SelectorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
`;

export type CalendarMonthesSelectorProps = React.HTMLAttributes<HTMLDivElement>;

const CalendarMonthesSelector: React.ForwardRefRenderFunction<
  HTMLDivElement,
  CalendarMonthesSelectorProps
> = (props, ref) => {
  const { children, ...restProps } = props;

  return (
    <SelectorContainer {...restProps} ref={ref}>
      {children}
    </SelectorContainer>
  );
};

export default React.forwardRef(CalendarMonthesSelector);
