import React from 'react';
import styled from '@emotion/styled';

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

const StyledTableCell = styled.td`
  vertical-align: inherit;
  padding: 0.8em;
  border-bottom: 0.1em solid ${({ theme }) => theme.color.surface.darken(20).toString()};
`;

const TableCell: React.ForwardRefRenderFunction<HTMLTableCellElement, TableCellProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableCell {...nativeProps} ref={ref}>
      {children}
    </StyledTableCell>
  );
};

export default React.forwardRef(TableCell);
