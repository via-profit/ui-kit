import React from 'react';
import styled from '@emotion/styled';
import { BORDER_WIDTH } from '../ThemeProvider/tokens';

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

const StyledTableFooter = styled.tfoot`
  vertical-align: middle;

  & > tr > th,
  & > tr > td {
    font-weight: 600;
    border-bottom: none;
  }

  & > tr:first-of-type > th,
  & > tr:first-of-type > td {
    border-top: ${BORDER_WIDTH} solid ${({ theme }) => theme.color.surface.darken(30).toString()};
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
