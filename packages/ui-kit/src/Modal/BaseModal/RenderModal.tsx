import React from 'react';

import { useContext } from './context';
import Overlay, { ModalOverlayProps } from './ModalOverlay';
import Inner, { ModalInnerProps } from './ModalInner';
import InnerContainer, { ModalInnerContainerProps } from './ModalInnerContainer';

interface RenderModalProps {
  readonly children: React.ReactNode | readonly React.ReactNode[];
  readonly overrides: {
    readonly Overlay?: React.ForwardRefExoticComponent<
      ModalOverlayProps & React.RefAttributes<HTMLDivElement>
    >;
    readonly Inner?: React.ForwardRefExoticComponent<
      ModalInnerProps & React.RefAttributes<HTMLDivElement>
    >;
    readonly InnerContainer?: React.ForwardRefExoticComponent<
      ModalInnerContainerProps & React.RefAttributes<HTMLDivElement>
    >;
  };
}

const RenderModal: React.FC<RenderModalProps> = props => {
  const { children, overrides } = props;
  const { state } = useContext();
  const { isOpen, closeOnOverlayClick, onRequestClose } = state;

  const overridesMap = React.useMemo(
    () => ({
      Overlay: overrides?.Overlay || Overlay,
      Inner: overrides?.Inner || Inner,
      InnerContainer: overrides?.InnerContainer || InnerContainer,
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
          <overridesMap.InnerContainer isOpen={isOpen} onRequestClose={onRequestClose}>
            <overridesMap.Inner isOpen={isOpen} onRequestClose={onRequestClose}>
              {children}
            </overridesMap.Inner>
          </overridesMap.InnerContainer>
        ),
        [children, isOpen, overridesMap, onRequestClose],
      )}
    </>
  );
};

export default RenderModal;
