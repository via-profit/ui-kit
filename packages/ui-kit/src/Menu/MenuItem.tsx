import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type MenuItemProps = React.HTMLAttributes<HTMLDivElement> & MenuItemCommonProps;

export type MenuItemCommonProps = {
  /**
   * Selected flag
   */
  readonly selected: boolean;

  /**
   * Hovered flag
   */
  readonly hovered: boolean;

  /**
   * React key
   */
  readonly key: React.Key;
  readonly onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  readonly onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
  readonly onClick: React.MouseEventHandler<HTMLDivElement>;

  /**
   * Icon or another JSX element placed before button label
   */
  readonly startIcon?: JSX.Element;
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

    return theme.color.textPrimary.toString();
  }};
  ${({ selected }) =>
    selected &&
    css`
      & mark {
        color: inherit;
      }
    `}
`;

const ItemIconWrapper = styled.span`
  margin-right: 0.5em;
`;

const MenuItem = React.forwardRef((props: MenuItemProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    children,
    selected,
    hovered,
    onMouseEnter,
    onMouseLeave,
    onClick,
    startIcon,
    ...nativeProps
  } = props;

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
      {typeof startIcon !== 'undefined' && startIcon !== null && (
        <ItemIconWrapper>{startIcon}</ItemIconWrapper>
      )}
      {children}
    </InnerContainer>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
