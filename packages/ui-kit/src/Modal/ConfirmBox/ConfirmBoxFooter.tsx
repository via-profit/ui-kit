import React from 'react';
import styled from '@emotion/styled';

import Button from '../../Button';

export type ConfirmBoxFooterProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  /**
   * Dialog unique ID
   */
  readonly dialogID: string;

  /**
   * On confirmation event
   */
  readonly onRequestYes: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * On close request
   */
  readonly onRequestClose: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;

  /**
   * Label of Dissmiss button
   * **Default**: `"Dismiss"`
   */
  readonly dismissButtonLabel?: React.ReactNode;

  /**
   * Label of Confirmation button
   * **Default**: `"Confirm"`
   */
  readonly confirmButtonLabel?: React.ReactNode;
};

const StyledConfirmBoxFooter = styled.div`
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

const ConfirmBoxFooter: React.ForwardRefRenderFunction<HTMLDivElement, ConfirmBoxFooterProps> = (
  props,
  ref,
) => {
  const { onRequestClose, onRequestYes, dismissButtonLabel, confirmButtonLabel, ...nativeProps } =
    props;

  return (
    <StyledConfirmBoxFooter {...nativeProps} ref={ref}>
      <Button onClick={onRequestClose} tabIndex={2}>
        {typeof dismissButtonLabel === 'undefined' ? 'Dismiss' : dismissButtonLabel}
      </Button>
      <Button color="primary" onClick={onRequestYes} tabIndex={1}>
        {typeof confirmButtonLabel === 'undefined' ? 'Confirm' : confirmButtonLabel}
      </Button>
    </StyledConfirmBoxFooter>
  );
};

export default React.forwardRef(ConfirmBoxFooter);
