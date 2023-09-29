import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Typography from '@via-profit/ui-kit/src/Typography';

const ExampleMeesageBox: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open messagebox</Button>

      <Modal
        variant="message-box"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        header="Title"
      >
        <Typography noMargin>Message box</Typography>
      </Modal>
    </>
  );
};

export default ExampleMeesageBox;
