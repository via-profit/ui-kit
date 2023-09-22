import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Typography from '@via-profit/ui-kit/src/Typography';

const ExampleModalDrawerOverview: React.FC = () => {
  const [drawerIsOpen, setDrawerOpen] = React.useState(false);
  const [dialogIsOpen, setDialogOpen] = React.useState(false);
  const [messageboxIsOpen, setMessageboxOpen] = React.useState(false);
  const [confirmboxIsOpen, setConfirmboxOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>
      <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
      <Button onClick={() => setMessageboxOpen(true)}>Open messagebox</Button>
      <Button onClick={() => setConfirmboxOpen(true)}>Open confirmbox</Button>

      <Modal variant="drawer" showCloseButton isOpen={drawerIsOpen} onRequestClose={() => setDrawerOpen(false)} footer={<>fdfds</>}>
        <Typography noMargin>Drawer content</Typography>
        <Typography noMargin>Drawer content</Typography>
        <Typography noMargin>Drawer content</Typography>
      </Modal>

      <Modal
        variant="dialog"
        isOpen={dialogIsOpen}
        onRequestClose={() => setDialogOpen(false)}
      >
        <Typography noMargin>Dialog content</Typography>
      </Modal>

      <Modal
        variant="message-box"
        title="Title"
        message="Message"
        okButtonLabel="OK"
        isOpen={messageboxIsOpen}
        onRequestClose={() => setMessageboxOpen(false)}
      />

      <Modal
        variant="confirm-box"
        title="Title"
        message="Message"
        isOpen={confirmboxIsOpen}
        onRequestYes={() => setConfirmboxOpen(false)}
        onRequestClose={() => setConfirmboxOpen(false)}
      />
    </>
  );
};

export default ExampleModalDrawerOverview;
