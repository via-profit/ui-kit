import React from 'react';
import styled from '@emotion/styled';
import { themePadding, BORDER_WIDTH } from '../ThemeProvider/tokens';

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

const StyledTableCell = styled.td`
  vertical-align: inherit;
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'item');

    return `${y} ${x}`;
  }};
  border-bottom: ${BORDER_WIDTH} solid ${({ theme }) => theme.color.surface.darken(20).toString()};
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
