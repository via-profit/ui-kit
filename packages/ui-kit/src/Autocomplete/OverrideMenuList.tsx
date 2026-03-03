import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { MenuList, MenuListProps } from '../Menu';

const StyledMenuList = styled(MenuList)`
  &:focus {
    outline: none;
  }

  --border-color: ${({ theme }) =>
    theme.isDark
      ? theme.color.textPrimary.darken(100).toString()
      : theme.color.textPrimary.lighten(150).toString()};

  ${({ anchorPos, theme }) =>
    anchorPos === 'top-fill' &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border: 1px solid var(--border-color);
      border-bottom: 0;
      box-shadow: 0 1em -1.5em ${theme.color.surface.darken(50).alpha(0.6).toString()};
    `};

  ${({ anchorPos, theme }) =>
    anchorPos === 'bottom-fill' &&
    css`
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border: 1px solid var(--border-color);
      border-top: 0;
      box-shadow: 0 1em 1.5em ${theme.color.surface.darken(50).alpha(0.6).toString()};
    `};
`;

const OverrideMenuList = React.forwardRef(
  (props: MenuListProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <StyledMenuList data-anch-po={props.anchorPos} {...props} ref={ref} />
  ),
);

OverrideMenuList.displayName = 'OverrideMenuList';

export default OverrideMenuList;
