import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Typography from '@via-profit/ui-kit/src/Typography';

const ExampleConfirmBox: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open confirmation dialog</Button>

      <Modal
        variant="confirm-box"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        header="Title"
        onRequestYes={() => setIsOpen(false)}
      >
        <Typography noMargin>Dialog content</Typography>
      </Modal>
    </>
  );
};

export default ExampleConfirmBox;
