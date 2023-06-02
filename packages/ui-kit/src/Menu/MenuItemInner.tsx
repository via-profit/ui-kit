import React from 'react';
import styled from '@emotion/styled';

export interface MenuItemInnerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly selected: boolean;
  readonly hovered: boolean;
}

const InnerContainer = styled.div<{ selected?: boolean; hovered?: boolean }>`
  cursor: pointer;
  user-select: none;
  padding: 0.4em 0.8em;
  transition: all 240ms ease-out;
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 1}em;
  background-color: ${({ theme, selected, hovered }) => {
    if (selected && hovered) {
      return theme.colors.accentPrimary().darken(0.1).toString();
    }
    if (selected) {
      return theme.colors.accentPrimary().toString();
    }
    if (hovered) {
      return theme.colors.backgroundGrey().darken(0.04).toString();
    }

    return 'inherit';
  }};
  color: ${({ theme, selected }) => {
    if (selected) {
      return theme.colors.accentPrimaryContrast().toString();
    }

    return 'inherit';
  }};
`;

const MenuItemInner: React.ForwardRefRenderFunction<HTMLDivElement, MenuItemInnerProps> = (
  props,
  ref,
) => {
  const { children, selected, hovered, ...nativeProps } = props;

  return (
    <InnerContainer {...nativeProps} selected={selected} hovered={hovered} ref={ref}>
      {children}
    </InnerContainer>
  );
};

export default React.forwardRef(MenuItemInner);
