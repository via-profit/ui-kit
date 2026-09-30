import React from 'react';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleConfirmBox: React.FC = () => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);

  return (
    <>
      <Paragraph>
        {isDeleted ? (
          <FormattedMessage defaultMessage="Файл «Отчёт.pdf» удалён" />
        ) : (
          <FormattedMessage defaultMessage="Файл «Отчёт.pdf»" />
        )}
      </Paragraph>
      {isDeleted ? (
        <Button onClick={() => setIsDeleted(false)}>
          <FormattedMessage defaultMessage="Восстановить" />
        </Button>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          <FormattedMessage defaultMessage="Удалить файл" />
        </Button>
      )}

      <Modal
        variant="confirm-box"
        isOpen={isOpen}
        header={intl.formatMessage({ defaultMessage: 'Удалить файл?' })}
        confirmButtonLabel={<FormattedMessage defaultMessage="Удалить" />}
        dismissButtonLabel={<FormattedMessage defaultMessage="Отмена" />}
        onRequestYes={() => {
          setIsDeleted(true);
          setIsOpen(false);
        }}
        onRequestClose={() => setIsOpen(false)}
      >
        <FormattedMessage defaultMessage="Файл «Отчёт.pdf» будет удалён без возможности восстановления." />
      </Modal>
    </>
  );
};

export default ExampleConfirmBox;
