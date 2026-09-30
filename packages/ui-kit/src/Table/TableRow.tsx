import React from 'react';
import styled from '@emotion/styled';

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

const StyledTableRow = styled.tr`
  vertical-align: inherit;
`;

const TableRow: React.ForwardRefRenderFunction<HTMLTableRowElement, TableRowProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableRow {...nativeProps} ref={ref}>
      {children}
    </StyledTableRow>
  );
};

export default React.forwardRef(TableRow);
