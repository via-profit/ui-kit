import React from 'react';
import styled from '@emotion/styled';

export type CalendarEmptyCellProps = React.HTMLAttributes<HTMLSpanElement>;

const Elem = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  user-select: none;
  font-size: 0.8em;
  width: 3em;
  height: 3em;
  margin: 0;
  min-width: 0;
  outline: none;
  position: relative;
  font-weight: 400;
  color: ${({ theme }) => theme.color.textSecondary.alpha(0.5).toString()};
`;

const CalendarEmptyCell: React.ForwardRefRenderFunction<HTMLSpanElement, CalendarEmptyCellProps> = (
  props,
  ref,
) => {
  const { children, ...restProps } = props;

  return (
    <Elem {...restProps} ref={ref}>
      {children}
    </Elem>
  );
};

export default React.forwardRef(CalendarEmptyCell);
