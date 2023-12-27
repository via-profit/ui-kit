import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type MenuItemProps = React.HTMLAttributes<HTMLDivElement> & MenuItemCommonProps;

export type MenuItemCommonProps = {
  readonly selected: boolean;
  readonly hovered: boolean;
  readonly key: React.Key;
  readonly onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  readonly onClick: React.MouseEventHandler<HTMLDivElement>;
};

const InnerContainer = styled.div<{ selected?: boolean; hovered?: boolean }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  padding: 0.4em 0.8em;
  transition: all 240ms ease-out;
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
  background-color: ${({ theme, selected, hovered }) => {
    if (selected && hovered) {
      return theme.color.accentPrimary.darken(0.1).toString();
    }
    if (selected) {
      return theme.color.accentPrimary.toString();
    }
    if (hovered) {
      return theme.color.surface.darken(40).toString();
    }

    return 'inherit';
  }};
  color: ${({ theme, selected }) => {
    if (selected) {
      return theme.color.accentPrimaryContrast.toString();
    }

    return 'inherit';
  }};
  ${({ selected }) =>
    selected &&
    css`
      & mark {
        color: inherit;
      }
    `}
`;

const MenuItem = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, selected, hovered, onMouseEnter, onMouseLeave, onClick, ...nativeProps } =
    props;

  return (
    <InnerContainer
      {...nativeProps}
      ref={ref}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      selected={selected}
      hovered={hovered}
    >
      {children}
    </InnerContainer>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
