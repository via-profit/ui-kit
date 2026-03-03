import React from 'react';
import styled from '@emotion/styled';

export interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
}

const StyledMenuList = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  transition: opacity 120ms ease-out;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  box-shadow: 0 0.25em 1.5em ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
  &:focus {
    outline-style: solid;
    outline-width: 0.14em;
    outline-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
  & ::-webkit-scrollbar {
    width: 0.6rem;
    height: 0.6rem;
  }

  & ::-webkit-scrollbar-corner {
    background: none;
  }

  & ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.isDark
        ? theme.color.backgroundPrimary.darken(10).toString()
        : theme.color.backgroundPrimary.darken(5).toString()};
  }

  & ::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.isDark
        ? theme.color.backgroundSecondary.lighten(30).toString()
        : theme.color.backgroundSecondary.darken(30).toString()};
    border-radius: 0.3rem;
  }

  & ::-webkit-scrollbar-thumb:horizontal:hover,
  & ::-webkit-scrollbar-thumb:vertical:hover {
    background: ${({ theme }) => theme.color.accentPrimary.toString()};
  }
  box-sizing: border-box;
  overflow-y: auto;
  padding: 0.4em;
  max-height: 18em;
`;

export const MenuList = React.forwardRef(
  (props: MenuListProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { isOpen, children, ...nativeProps } = props;

    return (
      <StyledMenuList tabIndex={-1} $isOpen={isOpen} {...nativeProps} ref={ref}>
        {children}
      </StyledMenuList>
    );
  },
);

MenuList.displayName = 'MenuList';

export default MenuList;
