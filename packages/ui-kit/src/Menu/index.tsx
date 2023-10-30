import React from 'react';
import ReactDOM from 'react-dom';

import { MenuContextProvider, PORTAL_ID } from './context';
import MenuContainer, { MenuContainerProps, MenuContainerRef } from './MenuContainer';

export * from './MenuContainer';

export type MenuProps<T, Multiple extends boolean | undefined = undefined> = MenuContainerProps<
  T,
  Multiple
>;

export type MenuRef<T> = MenuContainerRef<T>;

const Menu = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: MenuProps<T, Multiple>,
    ref: React.Ref<MenuRef<T>>,
  ) => {
    const { ...restProps } = props;
    const [domLoaded, setDomLoaded] = React.useState(false);

    /**
     * Client render detection
     */
    React.useEffect(() => {
      setDomLoaded(true);
    }, []);

    const portalEl = React.useMemo(() => {
      if (typeof window === 'undefined') {
        return undefined;
      }

      const node = window.document.body.querySelector(`#${PORTAL_ID}`);
      if (node) {
        return node;
      }

      const newNode = window.document.createElement('div');
      newNode.setAttribute('id', PORTAL_ID);

      window.document.body.appendChild(newNode);

      return newNode;
    }, []);

    return domLoaded && portalEl
      ? ReactDOM.createPortal(
          <MenuContextProvider>
            <MenuContainer {...restProps} ref={ref} />
          </MenuContextProvider>,
          portalEl,
          PORTAL_ID,
        )
      : null;
  },
);

Menu.displayName = 'Menu';

export default Menu as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef<T>> },
) => JSX.Element;
