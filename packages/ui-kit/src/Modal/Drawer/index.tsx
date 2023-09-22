import * as React from 'react';
import { Global, css, useTheme } from '@emotion/react';
import ReactModal from 'react-modal';

import Container, { DrawerContainerProps } from './DrawerContainer';
import Header, { DrawerHeaderProps } from './DrawerHeader';
import Content, { DrawerContentProps } from './DrawerContent';
import Footer, { DrawerFooterProps } from './DrawerFooter';

export interface DrawerProps extends ReactModal.Props {
  /**
   * Drawer content
   */
  readonly children: React.ReactNode | React.ReactNode[];

  /**
   * Drawer title
   */
  readonly title?: React.ReactNode;

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

const Drawer: React.ForwardRefRenderFunction<ReactModal, DrawerProps> = (props, ref) => {
  const {
    children,
    onRequestClose,
    showCloseButton,
    title,
    toolbar,
    footer,
    overrides,
    ...otherProps
  } = props;
  const theme = useTheme();
  const hasFooter = React.useMemo(() => typeof footer !== 'undefined' && footer !== null, [footer]);
  const hasHeader = React.useMemo(
    () =>
      typeof title === 'string' ||
      typeof toolbar !== 'undefined' ||
      typeof onRequestClose === 'function',
    [onRequestClose, title, toolbar],
  );

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
      <ReactModal
        ref={ref}
        closeTimeoutMS={300}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        portalClassName="modal-drawer"
        onRequestClose={onRequestClose}
        {...otherProps}
      >
        <overridesMap.Container>
          {hasHeader && (
            <overridesMap.Header
              showCloseButton={showCloseButton}
              title={title}
              onRequestClose={onRequestClose}
            >
              {toolbar}
            </overridesMap.Header>
          )}

          <overridesMap.Content>{children}</overridesMap.Content>
          {hasFooter && <overridesMap.Footer>{footer}</overridesMap.Footer>}
        </overridesMap.Container>
      </ReactModal>

      <Global
        styles={css`
          .modal-drawer .ReactModal__Overlay {
            position: fixed;
            inset: 0;
            z-index: ${theme.zIndex.modal}!important;
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
            transition: background-color 240ms ease-out;
          }

          .modal-drawer .ReactModal__Overlay--after-open {
            background-color: ${theme.color.textPrimary.alpha(0.5).toString()}!important;
          }

          .modal-drawer .ReactModal__Overlay--before-close {
            background-color: ${theme.color.textPrimary.alpha(0).toString()}!important;
          }

          .modal-drawer .ReactModal__Content {
            border: none !important;
            position: absolute !important;
            bottom: 0 !important;
            padding: 0 !important;
            left: 0 !important;
            right: 0 !important;
            overflow: auto !important;
            -webkit-overflow-scrolling: touch !important;
            outline: none !important;
            background: ${theme.color.surface.toString()}!important;
            border-radius: 1em 1em 0 0 !important;
            transform: translate(0, 100%) !important;
            transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
          }

          .modal-drawer .ReactModal__Content--after-open {
            transform: translate(0, 0) !important;
          }

          .modal-drawer .ReactModal__Content--before-close {
            transform: translate(0, 100%) !important;
            transition-duration: 160ms !important;
          }
        `}
      />
    </>
  );
};

export default React.forwardRef(Drawer);
