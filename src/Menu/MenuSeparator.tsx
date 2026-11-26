import React from 'react';
import styled from '@emotion/styled';

import { themePadding } from '../ThemeProvider/tokens';

export type MenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * The line between the groups of the items. The space around it separates the groups:
 * a line flush with the items is not seen
 */
const StyledMenuSeparator = styled.div`
  flex: none;
  height: 1px;
  margin: ${({ theme }) => {
    const { y, x } = themePadding(theme, 'item');

    return `${y} ${x}`;
  }};
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.12).toString()};
`;

/**
 * The separator of the menu: not an option — it is not highlighted, selected or announced
 * (a listbox may contain the options only, so it is hidden from the screen readers)
 */
export const MenuSeparator = React.forwardRef(
  (props: MenuSeparatorProps, ref: React.Ref<HTMLDivElement>) => (
    <StyledMenuSeparator role="presentation" aria-hidden {...props} ref={ref} />
  ),
);

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
