import React from 'react';
import styled from '@emotion/styled';

export type TableBodyProps = React.TableHTMLAttributes<HTMLTableSectionElement>;

const StyledTableBody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
  & > [role='row']:last-of-type {
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
