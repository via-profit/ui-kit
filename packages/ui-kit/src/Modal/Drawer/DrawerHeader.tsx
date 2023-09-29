import React from 'react';
import styled from '@emotion/styled';

import Base from '../../Typography/Base';
import DrawerCloseIcon from './DrawerCloseIcon';
import Button from '../../Button';

export type DrawerHeaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  /**
   * Drawer header
   */

  readonly header?: React.ReactNode;

  /**
   * Display close button in the header
   */
  readonly showCloseButton?: boolean;

  /**
   * On close request
   */
  readonly onRequestClose?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;
};

const StyledDrawerHeader = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DrawerTitle = styled(Base)`
  font-size: 1.3em;
  font-weight: 600;
  margin-right: 1em;
`;

const DrawerToolbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledDrawerCloseButton = styled(Button)<{ $withToolbar: boolean }>`
  margin-left: ${props => (props.$withToolbar ? '1em' : 0)};
  color: ${props => props.theme.color.textPrimary.toString()};
  background: none;
  width: auto;
  height: auto;
  padding: 0.6em;
  font-size: 1em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DrawerHeader: React.ForwardRefRenderFunction<HTMLDivElement, DrawerHeaderProps> = (
  props,
  ref,
) => {
  const { header, children, showCloseButton, onRequestClose, ...nativeProps } = props;

  return (
    <StyledDrawerHeader {...nativeProps} ref={ref}>
      {typeof header !== 'undefined' && <DrawerTitle>{header}</DrawerTitle>}
      {typeof children !== 'undefined' && <DrawerToolbar>{children}</DrawerToolbar>}
      {typeof onRequestClose === 'function' && showCloseButton && (
        <StyledDrawerCloseButton
          type="button"
          $withToolbar={Boolean(toolbar)}
          onClick={onRequestClose}
        >
          <DrawerCloseIcon />
        </StyledDrawerCloseButton>
      )}
    </StyledDrawerHeader>
  );
};

export default React.forwardRef(DrawerHeader);
