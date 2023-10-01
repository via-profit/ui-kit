import React from 'react';
import styled from '@emotion/styled';

export interface MenuWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
  readonly dimensions: {
    readonly width: number;
    readonly height: number;
  };
}

const StyledMenuWrapper = styled.div<{ $isOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  transition:
    visibility 120ms ease-out,
    opacity 120ms ease-out;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  background-color: ${({ theme }) => theme.color.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  box-shadow: 0 4px 24px ${({ theme }) => theme.color.surface.darken(50).alpha(0.6).toString()};
  &:focus {
    outline: none;
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
`;

const MenuWrapperInner = styled.div<Pick<MenuWrapperProps, 'dimensions'>>`
  padding: 0.4em;
  box-sizing: content-box;
  min-width: ${({ dimensions }) => dimensions.width}px;
  min-height: ${({ dimensions }) => dimensions.height}px;
`;

const MenuWrapper: React.ForwardRefRenderFunction<HTMLDivElement, MenuWrapperProps> = (
  props,
  ref,
) => {
  const { isOpen, dimensions, children, ...nativeProps } = props;
  const [isOpenState, setOpenState] = React.useState(false);

  React.useEffect(() => {
    setOpenState(isOpen);
  }, [isOpen]);

  return (
    <StyledMenuWrapper {...nativeProps} ref={ref} $isOpen={isOpenState}>
      <MenuWrapperInner dimensions={dimensions}>{children}</MenuWrapperInner>
    </StyledMenuWrapper>
  );
};

export default React.forwardRef(MenuWrapper);
