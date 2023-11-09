import React from 'react';

import { MenuContextProvider } from './context';
import MenuContainer, { MenuProps, MenuRef } from './MenuContainer';
import { AnchorPos as PopperAnchorPos } from '../Popper';

export type AnchorPos = PopperAnchorPos;
export * from './MenuContainer';

const Menu = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuProps<T, Multiple>,
    ref: React.Ref<MenuRef>,
  ) => {
    if (props.anchorPos !== 'static' && typeof props.anchorElement === 'undefined') {
      throw new Error(
        `[@via-profit/ui-kit] You set «anchorPos» property as «static». In this case you should use «anchorElement» property`,
      );
    }

    return (
      <MenuContextProvider>
        <MenuContainer {...props} ref={ref} />
      </MenuContextProvider>
    );
  },
);

Menu.displayName = 'Menu';

export default Menu as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
