import React from 'react';
import styled from '@emotion/styled';

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

const StyledTableHeader = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  & [role='row'] {
    border-bottom: none;
  }
`;

const TableHeader: React.ForwardRefRenderFunction<HTMLTableSectionElement, TableHeaderProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableHeader {...nativeProps} ref={ref}>
      {children}
    </StyledTableHeader>
  );
};

export default React.forwardRef(TableHeader);
