import React from 'react';
// import styled from '@emotion/styled';
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

      <Modal variant="drawer" isOpen={drawerIsOpen} onRequestClose={() => setDrawerOpen(false)}>
        <div>
          <Typography noMargin>Drawer content</Typography>
        </div>
      </Modal>

      <Modal
        variant="dialog"
        closeButton
        isOpen={dialogIsOpen}
        onRequestClose={() => setDialogOpen(false)}
      >
        <Typography noMargin>Dialog contentdfssfds</Typography>
      </Modal>

      <Modal
        variant="message-box"
        title="Title"
        message="Message"
        isOpen={messageboxIsOpen}
        onRequestClose={() => setMessageboxOpen(false)}
      />

      <Modal
        variant="confirm-box"
        title="Title"
        message="Message"
        closeButton
        isOpen={confirmboxIsOpen}
        onRequestYes={() => setConfirmboxOpen(false)}
        onRequestClose={() => setConfirmboxOpen(false)}
      />
    </>
  );
};

export default ExampleModalDrawerOverview;
