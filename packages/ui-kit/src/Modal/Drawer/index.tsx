import * as React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import DrawerInner, { AnchorVariant } from './DrawerInner';
import Container, { DrawerContainerProps } from './DrawerContainer';
import Header, { DrawerHeaderProps } from './DrawerHeader';
import Content, { DrawerContentProps } from './DrawerContent';
import Footer, { DrawerFooterProps } from './DrawerFooter';

export interface DrawerProps extends Omit<BaseModalProps, 'overrides'> {
  readonly variant: 'drawer';

  /**
   * Drawer position\
   * \
   * **Varians:** `bottom` `right` `left` `top`\
   * **Default:** `bottom`
   */
  readonly anchor: AnchorVariant;
  /**
   * Drawer content
   */
  readonly children: React.ReactNode | React.ReactNode[];

  /**
   * Drawer header
   */
  readonly header?: React.ReactNode;

  /**
   * Drawer toolbar
   */
  readonly toolbar?: React.ReactNode | React.ReactNode[] | null;

  /**
   * Drawer footer
   */
  readonly footer?: React.ReactNode | React.ReactNode[] | null;

  /**
   * Display close button in the header
   */
  readonly showCloseButton?: boolean;

  /**
   * Overridable components map
   */
  readonly overrides?: DrawerOverrides;
}

export interface DrawerOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ForwardRefExoticComponent<
    DrawerContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Element ontent
   */
  readonly Content?: React.ForwardRefExoticComponent<
    DrawerContentProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element footer
   */
  readonly Footer?: React.ForwardRefExoticComponent<
    DrawerFooterProps & React.RefAttributes<HTMLDivElement>
  >;

  /**
   * Element header
   */
  readonly Header?: React.ForwardRefExoticComponent<
    DrawerHeaderProps & React.RefAttributes<HTMLDivElement>
  >;
}

const Drawer: React.FC<DrawerProps> = props => {
  const {
    children,
    onRequestClose,
    showCloseButton,
    header,
    anchor,
    toolbar,
    footer,
    overrides,
    ...otherProps
  } = props;
  const hasFooter = React.useMemo(() => typeof footer !== 'undefined' && footer !== null, [footer]);
  const hasHeader = React.useMemo(
    () =>
      typeof header !== 'undefined' ||
      typeof toolbar !== 'undefined' ||
      typeof showCloseButton !== 'undefined',
    [showCloseButton, header, toolbar],
  );

  const dialogID = React.useMemo(() => `drawer-confirm-${new Date().getTime()}`, []);

  const overridesMap = React.useMemo(
    () => ({
      Container,
      Header,
      Content,
      Footer,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <>
      <BaseModal
        onRequestClose={onRequestClose}
        {...otherProps}
        overrides={{
          Inner: React.forwardRef(function Inner(props, ref) {
            const { children } = props;

            return (
              <DrawerInner anchor={anchor} dialogID={dialogID} ref={ref} {...props}>
                {children}
              </DrawerInner>
            );
          }),
        }}
      >
        <overridesMap.Container>
          {hasHeader && (
            <overridesMap.Header
              showCloseButton={showCloseButton}
              header={header}
              onRequestClose={onRequestClose}
            >
              {toolbar}
            </overridesMap.Header>
          )}

          <overridesMap.Content>{children}</overridesMap.Content>
          {hasFooter && <overridesMap.Footer>{footer}</overridesMap.Footer>}
        </overridesMap.Container>
      </BaseModal>
    </>
  );
};

export default Drawer;
