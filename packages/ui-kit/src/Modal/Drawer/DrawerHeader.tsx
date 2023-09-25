import React from 'react';
import styled from '@emotion/styled';

import Base from '../../Typography/Base';
import CloseOutlineIcon from '../CloseIcon';
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

const Header = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled(Base)`
  font-size: 1.3em;
  font-weight: 600;
  margin-right: 1em;
`;

const Toolbar = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CloseButton = styled(Button)<{ $withToolbar: boolean }>`
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
    <Header {...nativeProps} ref={ref}>
      <Title>{header}</Title>
      <Toolbar>{children}</Toolbar>
      {typeof onRequestClose === 'function' && showCloseButton && (
        <CloseButton type="button" $withToolbar={Boolean(toolbar)} onClick={onRequestClose}>
          <CloseOutlineIcon />
        </CloseButton>
      )}
    </Header>
  );
};

export default React.forwardRef(DrawerHeader);
