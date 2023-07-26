import React from 'react';
import styled from '@emotion/styled';

export type TableHeaderCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;

const StyledTableHeaderCell = styled.th`
  display: table-cell;
  vertical-align: inherit;
  padding: 0.8em;
  background-color: ${({ theme }) => theme.color.accentPrimary.darken(10).toString()};
  color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
  word-break: break-all;
  font-weight: 500;
  @media all and (max-width: 1200px) {
    padding: 0.4em;
  }
`;

const TableHeaderCell: React.ForwardRefRenderFunction<
  HTMLTableCellElement,
  TableHeaderCellProps
> = (props, ref) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableHeaderCell role="rowheader" {...nativeProps} ref={ref}>
      {children}
    </StyledTableHeaderCell>
  );
};

export default React.forwardRef(TableHeaderCell);
