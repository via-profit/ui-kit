import React from 'react';
import styled from '@emotion/styled';

export interface MenuListProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
}

const StyledMenuList = styled.div<{ $isOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: opacity 120ms ease-out;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
  &:focus {
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
`;

const MenuList: React.ForwardRefRenderFunction<HTMLDivElement, MenuListProps> = (props, ref) => {
  const { isOpen, children, ...nativeProps } = props;

  return (
    <StyledMenuList tabIndex={-1} $isOpen={isOpen} {...nativeProps} ref={ref}>
      {children}
    </StyledMenuList>
  );
};

export default React.forwardRef(MenuList);
