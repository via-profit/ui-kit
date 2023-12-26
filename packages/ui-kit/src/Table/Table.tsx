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
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 1.5em;
  border: none;
  text-align: left;
  overflow: hidden;
  background: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: ${({ theme }) =>
    `0 0.5em 2em -0.8em ${theme.color.surface.darken(100).alpha(0.4).toString()}`};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  font-size: 1em;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `};

  @media only screen and (max-width: 1200px) {
    /* Force table to not be like tables anymore */
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    /* Hide table headers (but not display: none;, for accessibility) */
    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin: 0 0 1rem 0;
      background: ${({ theme }) => theme.color.surface.toString()};
    }

    tr:nth-of-type(odd) {
      background: ${({ theme }) => theme.color.surface.darken(30).toString()};
    }

    td {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid
        ${({ theme }) => theme.color.surface.darken(20).alpha(0.8).toString()};
      position: relative;
      padding-left: 50%;
      text-align: left !important;
    }

    tr:nth-of-type(odd) td {
      border-bottom: 1px solid
        ${({ theme }) => theme.color.surface.darken(50).alpha(0.8).toString()};
    }

    td:before {
      /* Now like a table header */
      position: absolute;
      /* Top/left values mimic padding */
      top: 50%;
      transform: translateY(-50%);
      left: 1em;
      width: 45%;
      padding-right: 1em;
      white-space: nowrap;
    }
  }
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
