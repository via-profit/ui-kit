import React from 'react';
import styled from '@emotion/styled';

import { controlHeight } from '../ThemeProvider/tokens';

export type PaginationGapProps = React.HTMLAttributes<HTMLSpanElement>;

const StyledGap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6em;
  height: ${({ theme }) => controlHeight(theme)};
  color: ${({ theme }) => theme.color.textSecondary.toString()};
  user-select: none;
`;

/**
 * The skipped range of the pages
 */
const PaginationGap: React.ForwardRefRenderFunction<HTMLSpanElement, PaginationGapProps> = (
  props,
  ref,
) => (
  <StyledGap aria-hidden {...props} ref={ref}>
    …
  </StyledGap>
);

export default React.forwardRef(PaginationGap);
