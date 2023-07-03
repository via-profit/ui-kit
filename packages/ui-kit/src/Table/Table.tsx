import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  readonly fullWidth?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
};

const StyledTable = styled.table<StyleProps>`
  display: table;
  width: 100%;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 1.5em;
  border: none;
  text-align: left;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface.toString()};
  color: ${({ theme }) => theme.colors.textPrimary.toString()};
  box-shadow: ${({ theme }) =>
    `0 0.5em 2em -0.8em ${theme.colors.surface.darken(100).alpha(0.4).toString()}`};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 1em;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `};
`;

const Table: React.ForwardRefRenderFunction<HTMLTableElement, TableProps> = (props, ref) => {
  const { children, fullWidth, ...nativeProps } = props;

  return (
    <StyledTable role="table" $fullWidth={fullWidth} {...nativeProps} ref={ref}>
      {children}
    </StyledTable>
  );
};

export default React.forwardRef(Table);
