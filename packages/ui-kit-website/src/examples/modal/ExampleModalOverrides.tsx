import React from 'react';
import styled from '@emotion/styled';
import Modal from '@via-profit/ui-kit/src/Modal';
import ModalOverlay from '@via-profit/ui-kit/src/Modal/BaseModal/ModalOverlay';
import Button from '@via-profit/ui-kit/src/Button';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

// The page behind the dialog is blurred instead of darkened
const Overlay = styled(ModalOverlay)`
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(6px);
`;

// Created once, outside of the component
const overrides = { Overlay };

const ExampleModalOverrides: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FormattedMessage defaultMessage="Открыть диалог" />
      </Button>
      <Modal
        variant="dialog"
        isOpen={isOpen}
        overrides={overrides}
        onRequestClose={() => setIsOpen(false)}
      >
        <Paragraph>
          <FormattedMessage defaultMessage="Фон за окном размыт, а не затемнён." />
        </Paragraph>
        <Button color="primary" onClick={() => setIsOpen(false)}>
          <FormattedMessage defaultMessage="Понятно" />
        </Button>
      </Modal>
    </>
  );
};

export default ExampleModalOverrides;
