import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Typography from '@via-profit/ui-kit/src/Typography';

const ExampleModalOverview: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>

      <Modal variant="dialog" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <Typography noMargin>Dialog content</Typography>
      </Modal>
    </>
  );
};

export default ExampleModalOverview;
