import * as React from 'react';

import BaseModal, { BaseModalProps } from '../BaseModal';
import DrawerInner, { AnchorVariant } from './DrawerInner';
import Container, { DrawerContainerProps } from './DrawerContainer';
import Header, { DrawerHeaderProps } from './DrawerHeader';
import Content, { DrawerContentProps } from './DrawerContent';
import Footer, { DrawerFooterProps } from './DrawerFooter';
import Overlay, { ModalOverlayProps } from '../BaseModal/ModalOverlay';
import type { ModalInnerProps } from '../BaseModal/ModalInner';
import useDialogID from '../BaseModal/useDialogID';
import useThemeProps from '../../ThemeProvider/useThemeProps';

export type { AnchorVariant } from './DrawerInner';

export interface DrawerProps extends Omit<BaseModalProps, 'overrides'> {
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
   * Accessible label of the close button (it contains only an icon)\
   * \
   * **Default**: `'Close'`
   */
  readonly closeButtonLabel?: string;

  /**
   * Overridable components map
   */
  readonly overrides?: DrawerOverrides;
}

export interface DrawerOverrides {
  /**
   * Element container
   */
  readonly Container?: React.ComponentType<
    DrawerContainerProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * Element ontent
   */
  readonly Content?: React.ComponentType<DrawerContentProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Element footer
   */
  readonly Footer?: React.ComponentType<DrawerFooterProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Element header
   */
  readonly Header?: React.ComponentType<DrawerHeaderProps & React.RefAttributes<HTMLDivElement>>;

  /**
   * Overlay element
   */
  readonly Overlay?: React.ComponentType<ModalOverlayProps & React.RefAttributes<HTMLDivElement>>;
}

const Drawer: React.FC<DrawerProps> = props => {
  const {
    children,
    onRequestClose,
    showCloseButton,
    header,
    closeButtonLabel,
    anchor,
    toolbar,
    footer,
    overrides,
    ...otherProps
  } = useThemeProps('Drawer', props);
  const hasFooter = React.useMemo(() => typeof footer !== 'undefined' && footer !== null, [footer]);
  const hasHeader = React.useMemo(
    () =>
      typeof header !== 'undefined' ||
      typeof toolbar !== 'undefined' ||
      typeof showCloseButton !== 'undefined',
    [showCloseButton, header, toolbar],
  );

  const dialogID = useDialogID('drawer');
  const hasTitle = typeof header !== 'undefined' && header !== null;

  // Created once: a component created during the render is a new type on every render,
  // so React would remount the whole drawer content (inputs lose the focus and the state)
  const Inner = React.useMemo(
    () =>
      React.forwardRef<HTMLDivElement, ModalInnerProps>(function Inner(innerProps, ref) {
        return (
          <DrawerInner
            anchor={anchor}
            dialogID={dialogID}
            aria-labelledby={hasTitle ? `${dialogID}-title` : undefined}
            ref={ref}
            {...innerProps}
          />
        );
      }),
    [anchor, dialogID, hasTitle],
  );

  const overridesMap = React.useMemo(
    () => ({
      Container: overrides?.Container || Container,
      Header: overrides?.Header || Header,
      Content: overrides?.Content || Content,
      Footer: overrides?.Footer || Footer,
      Overlay: overrides?.Overlay || Overlay,
    }),
    [overrides],
  );

  const modalOverrides = React.useMemo(
    () => ({ Overlay: overridesMap.Overlay, Inner }),
    [overridesMap.Overlay, Inner],
  );

  return (
    <>
      <BaseModal onRequestClose={onRequestClose} {...otherProps} overrides={modalOverrides}>
        <overridesMap.Container anchor={anchor}>
          {hasHeader && (
            <overridesMap.Header
              showCloseButton={showCloseButton}
              closeButtonLabel={closeButtonLabel}
              dialogID={dialogID}
              header={header}
              onRequestClose={onRequestClose}
            >
              {toolbar}
            </overridesMap.Header>
          )}

          <overridesMap.Content anchor={anchor}>{children}</overridesMap.Content>
          {hasFooter && <overridesMap.Footer anchor={anchor}>{footer}</overridesMap.Footer>}
        </overridesMap.Container>
      </BaseModal>
    </>
  );
};

export default Drawer;
