import React from 'react';
import styled from '@emotion/styled';

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

const StyledTableHeader = styled.thead`
  vertical-align: middle;

  & > tr > th,
  & > tr > td {
    border-bottom: none;
    font-weight: 500;
    background-color: ${({ theme }) => theme.color.accentPrimary.darken(10).toString()};
    color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
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
