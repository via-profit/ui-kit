import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import MenuItem, { MenuItemProps } from '../Menu/MenuItem';

export interface AutocompleteItemProps extends MenuItemProps {
  readonly variant?: 'standard' | 'virtual';
  readonly startIcon?: JSX.Element;
}

type StyeldMenuItemProps = {
  readonly $variant: NonNullable<AutocompleteItemProps['variant']>;
};
const StyeldMenuItem = styled(MenuItem, {
  shouldForwardProp: p => !['$vatiant'].includes(p),
})<StyeldMenuItemProps>`
  ${({ $variant, theme }) =>
    $variant === 'virtual' &&
    css`
      background-color: ${theme.color.accentPrimary.alpha(0.1).toString()};
      border-color: ${theme.color.accentPrimary.toString()};
      color: ${theme.color.textPrimary.toString()};
      border-style: dashed;
      border-width: 0.02em;

      :hover {
        background-color: ${theme.color.accentPrimary.toString()};
        color: ${theme.color.accentPrimaryContrast.toString()};
      }
    `}
`;

const AutocompleteItemWithRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AutocompleteItemProps
> = (props, ref) => {
  const { variant = 'standard', children, ...restMenuItemProps } = props;

  return (
    <StyeldMenuItem {...restMenuItemProps} $variant={variant} ref={ref}>
      {children}
    </StyeldMenuItem>
  );
};

export const AutocompleteItem = React.forwardRef(AutocompleteItemWithRef);

export default AutocompleteItem;
