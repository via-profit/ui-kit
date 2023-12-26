import React from 'react';
import Avatar from '@via-profit/ui-kit/src/Avatar';
import Modal from '@via-profit/ui-kit/src/Modal';
import styled from '@emotion/styled';

const AvatarGroup = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleAvatarIcons: React.FC = () => {
  const [dialogisOpen, setDialogOpen] = React.useState(false);

  return (
    <AvatarGroup>
      <Avatar
        variant="circular"
        onClick={() => setDialogOpen(true)}
        src={[
          {
            srcSet: 'https://i.pravatar.cc/300',
            type: 'image/jpeg',
            isDefault: true,
          },
          {
            srcSet: 'https://i.pravatar.cc/300',
            type: 'image/webp',
          },
        ]}
      />

      <Avatar
        variant="rounded"
        onClick={() => setDialogOpen(true)}
        src={[
          {
            srcSet: 'https://i.pravatar.cc/300',
            type: 'image/jpeg',
            isDefault: true,
          },
          {
            srcSet: 'https://i.pravatar.cc/300',
            type: 'image/webp',
          },
        ]}
      />

      <Avatar variant="square" onClick={() => setDialogOpen(true)}>
        H
      </Avatar>

      <Modal
        isOpen={dialogisOpen}
        variant="message-box"
        onRequestClose={() => setDialogOpen(false)}
      >
        Avatar button has been pushed
      </Modal>
    </AvatarGroup>
  );
};

export default ExampleAvatarIcons;
