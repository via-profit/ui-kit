import React from 'react';
import styled from '@emotion/styled';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import H3 from '@via-profit/ui-kit/src/Typography/H3';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage } from 'react-intl';

const Content = styled.div`
  max-width: 28em;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ExampleModalOverview: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FormattedMessage defaultMessage="Открыть диалог" />
      </Button>

      <Modal variant="dialog" isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <Content>
          <H3>
            <FormattedMessage defaultMessage="Условия использования" />
          </H3>
          <Paragraph>
            <FormattedMessage defaultMessage="Диалог закрывается кнопкой, клавишей Esc или кликом по затемнённому фону." />
          </Paragraph>
          <Actions>
            <Button color="primary" onClick={() => setIsOpen(false)}>
              <FormattedMessage defaultMessage="Понятно" />
            </Button>
          </Actions>
        </Content>
      </Modal>
    </>
  );
};

export default ExampleModalOverview;
