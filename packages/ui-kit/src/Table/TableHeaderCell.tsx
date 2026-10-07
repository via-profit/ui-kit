import React from 'react';
import styled from '@emotion/styled';
import { themePadding, BORDER_WIDTH } from '../ThemeProvider/tokens';

export type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;

/**
 * The column header inside `<TableHeader>` or the row header (`scope="row"`) inside `<TableBody>`.
 * The role (columnheader/rowheader) is implied by the position, so no explicit role
 */
const StyledTableHeaderCell = styled.th`
  vertical-align: inherit;
  padding: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'item');

    return `${y} ${x}`;
  }};
  text-align: start;
  font-weight: 600;
  border-bottom: ${BORDER_WIDTH} solid ${({ theme }) => theme.color.surface.darken(20).toString()};
`;

const TableHeaderCell: React.ForwardRefRenderFunction<
  HTMLTableCellElement,
  TableHeaderCellProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableHeaderCell {...nativeProps} ref={ref}>
      {children}
    </StyledTableHeaderCell>
  );
};

export default React.forwardRef(TableHeaderCell);
