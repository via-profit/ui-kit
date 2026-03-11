import React from 'react';

import { MenuContextProvider } from './context';
import MenuContainer, { MenuProps, MenuRef } from './MenuContainer';
import { AnchorPos as PopperAnchorPos } from '../Popper';

export type AnchorPos = PopperAnchorPos;
export * from './MenuContainer';
export * from './MenuItem';
export * from './MenuList';

const Menu = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuProps<T, Multiple>,
    ref: React.Ref<MenuRef>,
  ) => (
    <MenuContextProvider>
      <MenuContainer {...props} ref={ref} />
    </MenuContextProvider>
  ),
);

Menu.displayName = 'Menu';

export default Menu as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => React.ReactElement;
