import React from 'react';
import styled from '@emotion/styled';

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

const StyledTableBody = styled.tbody`
  vertical-align: middle;

  /* No line under the last row: the table has its own edge */
  & > tr:last-of-type > th,
  & > tr:last-of-type > td {
    border-bottom: none;
  }
`;

const TableBody: React.ForwardRefRenderFunction<HTMLTableSectionElement, TableBodyProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableBody {...nativeProps} ref={ref}>
      {children}
    </StyledTableBody>
  );
};

export default React.forwardRef(TableBody);
