import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { elevation } from '../ThemeProvider/tokens';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  /**
   * The table takes the full width of the parent
   */
  readonly fullWidth?: boolean;
};

type StyleProps = {
  readonly $fullWidth?: boolean;
};

/**
 * `border-collapse: separate`: with `collapse` browsers ignore the border-radius of the table.
 * So the row lines are the bottom borders of the cells (the borders of `<tr>` are not drawn in this mode)
 */
const StyledTable = styled.table<StyleProps>`
  box-sizing: border-box;
  border-spacing: 0;
  border-collapse: separate;
  border: none;
  text-align: start;
  overflow: hidden;
  background: ${({ theme }) => theme.color.surface.toString()};
  color: ${({ theme }) => theme.color.textPrimary.toString()};
  box-shadow: ${({ theme }) => elevation(theme, 'surface')};
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
    <StyledTable $fullWidth={fullWidth} {...nativeProps} ref={ref}>
      {children}
    </StyledTable>
  );
};

export default React.forwardRef(Table);
