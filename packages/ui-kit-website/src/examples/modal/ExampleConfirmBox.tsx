import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Typography from '@via-profit/ui-kit/src/Typography';

const ExampleConfirmBox: React.FC = () => {
  const [isOpenFirst, setIsOpenFirst] = React.useState(false);
  const [isOpenInner, setIsOpenInner] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenFirst(true)}>Open confirmation dialog</Button>

      <Modal
        variant="confirm-box"
        isOpen={isOpenFirst}
        onRequestClose={() => setIsOpenFirst(false)}
        header="Title"
        onRequestYes={() => setIsOpenFirst(false)}
      >
        <Typography noMargin>Dialog content</Typography>
        <Button variant="outlined" onClick={() => setIsOpenInner(true)}>
          Open inner dialog
        </Button>
      </Modal>

      <Modal
        variant="confirm-box"
        isOpen={isOpenInner}
        onRequestClose={() => setIsOpenInner(false)}
        header="Title"
        onRequestYes={() => setIsOpenInner(false)}
      >
        <Typography noMargin>Inner Dialog content</Typography>
      </Modal>
    </>
  );
};

export default ExampleConfirmBox;
