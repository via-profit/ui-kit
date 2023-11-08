import React from 'react';
// import ReactDOM from 'react-dom';

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

    if (props.anchorPos === 'static' && Boolean(props.disablePortal) === false) {
      throw new Error(
        `[@via-profit/ui-kit] You set «anchorPos» property as «static» with the portal. Please, pass the property «disablePortal» as true`,
      );
    }

    // const [domLoaded, setDomLoaded] = React.useState(false);
    // /**
    //  * Client render detection
    //  */
    // React.useEffect(() => {
    //   if (!props.disablePortal) {
    //     setDomLoaded(true);
    //   }
    // }, [props.disablePortal]);

    // const portalEl = React.useMemo(() => {
    //   if (typeof window === 'undefined') {
    //     return undefined;
    //   }

    //   const node = window.document.body.querySelector(`#${PORTAL_ID}`);
    //   if (node) {
    //     return node;
    //   }

    //   const newNode = window.document.createElement('div');
    //   newNode.setAttribute('id', PORTAL_ID);

    //   window.document.body.appendChild(newNode);

    //   return newNode;
    // }, []);

    return (
      <MenuContextProvider>
        <MenuContainer {...props} ref={ref} />
      </MenuContextProvider>
    );
    // if (props.disablePortal) {
    //   return (
    //     <MenuContextProvider>
    //       <MenuContainer {...props} ref={ref} />
    //     </MenuContextProvider>
    //   );
    // }

    // return domLoaded && portalEl
    //   ? ReactDOM.createPortal(
    //       <MenuContextProvider>
    //         <MenuContainer {...props} ref={ref} />
    //       </MenuContextProvider>,
    //       portalEl,
    //       PORTAL_ID,
    //     )
    //   : null;
  },
);

Menu.displayName = 'Menu';

export default Menu as <T, Multiple extends boolean | undefined = undefined>(
  props: MenuProps<T, Multiple> & { ref?: React.Ref<MenuRef> },
) => JSX.Element;
