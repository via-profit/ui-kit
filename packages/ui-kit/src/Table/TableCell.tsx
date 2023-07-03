import React from 'react';
import styled from '@emotion/styled';

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

const StyledTableCell = styled.td`
  display: table-cell;
  vertical-align: inherit;
  padding: 0.8em;
  @media all and (max-width: 1200px) {
    padding: 0.4em;
  }
`;

const TableCell: React.ForwardRefRenderFunction<HTMLTableCellElement, TableCellProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableCell role="cell" {...nativeProps} ref={ref}>
      {children}
    </StyledTableCell>
  );
};

export default React.forwardRef(TableCell);
