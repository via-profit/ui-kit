import React from 'react';
import styled from '@emotion/styled';

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const StyledTableRow = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-bottom-width: 0.1em;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.color.surface.darken(20).toString()};
`;

const TableRow: React.ForwardRefRenderFunction<HTMLTableRowElement, TableRowProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableRow role="row" {...nativeProps} ref={ref}>
      {children}
    </StyledTableRow>
  );
};

export default React.forwardRef(TableRow);
