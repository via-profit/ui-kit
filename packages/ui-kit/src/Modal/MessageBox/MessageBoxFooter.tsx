import React from 'react';
import styled from '@emotion/styled';

import Button from '../../Button';

export type MessageBoxFooterProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;

  /**
   * On close request
   */
  readonly onRequestClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Label of button
   * **Default**: `"OK"`
   */
  readonly okButtonLabel?: React.ReactNode;
};

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em 1em 1em 1em;

  & > button {
    border-radius: 0;
  }

  & > button:first-of-type {
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
  }

  & > button:last-child {
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
  }
`;

const MessageBoxFooter: React.ForwardRefRenderFunction<HTMLDivElement, MessageBoxFooterProps> = (
  props,
  ref,
) => {
  const { onRequestClose, okButtonLabel, ...nativeProps } = props;

  return (
    <Footer {...nativeProps} ref={ref}>
      <Button onClick={onRequestClose}>
        {typeof okButtonLabel === 'undefined' ? 'OK' : okButtonLabel}
      </Button>
    </Footer>
  );
};

export default React.forwardRef(MessageBoxFooter);
