import React from 'react';
import styled from '@emotion/styled';

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

const StyledTableFooter = styled.tfoot`
  display: table-footer-group;
  vertical-align: middle;
  border-top-width: 0.1em;
  border-top-style: solid;
  border-top-color: ${({ theme }) => theme.color.surface.darken(30).toString()};
  & [role='cell'] {
    font-weight: 600;
  }
  & [role='row'] {
    border-bottom: none;
  }
`;

const TableFooter: React.ForwardRefRenderFunction<HTMLTableSectionElement, TableFooterProps> = (
  props,
  ref,
) => {
  const { children, ...nativeProps } = props;

  return (
    <StyledTableFooter {...nativeProps} ref={ref}>
      {children}
    </StyledTableFooter>
  );
};

export default React.forwardRef(TableFooter);
