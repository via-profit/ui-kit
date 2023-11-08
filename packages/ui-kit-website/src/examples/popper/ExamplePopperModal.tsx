import React from 'react';
import Button from '@via-profit/ui-kit/src/Button';
import Popper from '@via-profit/ui-kit/src/Popper';
import Surface from '@via-profit/ui-kit/src/Surface';
import Dialog from '@via-profit/ui-kit/src/Modal/Dialog';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

const StyledAnchorContainer = styled.div`
  width: 22em;
  height: 22em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.color.backgroundPrimary.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor}em;
`;

const DialogInner: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Surface header="Some header">
        <Button
          color="primary"
          onClick={event => setAnchorElement(anchorElement ? null : event.currentTarget)}
        >
          <FormattedMessage defaultMessage="Открыть popper" />
        </Button>
      </Surface>

      <Popper anchorElement={anchorElement} isOpen={Boolean(anchorElement)}>
        <Surface>
          <FormattedMessage defaultMessage="Какой-либо контент" />
        </Surface>
      </Popper>
    </>
  );
};

const ExamplePopperModal: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <StyledAnchorContainer>
        <Button color="primary" onClick={() => setModalOpen(true)}>
          <FormattedMessage defaultMessage="Открыть диалог" />
        </Button>

        <Dialog isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
          <DialogInner />
          <div>
            <Button color="primary" variant="outlined" onClick={() => setModalOpen(false)}>
              <FormattedMessage defaultMessage="закрыть диалог" />
            </Button>
          </div>
        </Dialog>
      </StyledAnchorContainer>
    </>
  );
};

export default ExamplePopperModal;
