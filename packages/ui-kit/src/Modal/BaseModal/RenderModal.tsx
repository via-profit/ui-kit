import React from 'react';

import { useContext } from './context';
import Overlay, { ModalOverlayProps } from './ModalOverlay';
import Inner, { ModalInnerProps } from './ModalInner';

interface RenderModalProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly overrides: {
    readonly Overlay?: React.ForwardRefExoticComponent<
      ModalOverlayProps & React.RefAttributes<HTMLDivElement>
    >;
    readonly Inner?: React.ForwardRefExoticComponent<
      ModalInnerProps & React.RefAttributes<HTMLDivElement>
    >;
  };
}

const RenderModal: React.FC<RenderModalProps> = props => {
  const { children, overrides } = props;
  const { state } = useContext();
  const { isOpen, closeOnOverlayClick, onRequestClose } = state;

  const overridesMap = React.useMemo(
    () => ({
      Overlay,
      Inner,
      ...overrides,
    }),
    [overrides],
  );

  return (
    <>
      {React.useMemo(
        () => (
          <overridesMap.Overlay
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            closeOnOverlayClick={closeOnOverlayClick}
          />
        ),
        [overridesMap, isOpen, closeOnOverlayClick, onRequestClose],
      )}
      {React.useMemo(
        () => (
          <overridesMap.Inner isOpen={isOpen} onRequestClose={onRequestClose}>
            {children}
          </overridesMap.Inner>
        ),
        [children, isOpen, overridesMap, onRequestClose],
      )}
    </>
  );
};

export default RenderModal;
