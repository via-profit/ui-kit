import React from 'react';
import Modal from '@via-profit/ui-kit/Modal';
import Button from '@via-profit/ui-kit/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleMessageBox: React.FC = () => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <FormattedMessage defaultMessage="Отправить заявку" />
      </Button>

      <Modal
        variant="message-box"
        isOpen={isOpen}
        header={intl.formatMessage({ defaultMessage: 'Заявка отправлена' })}
        okButtonLabel={<FormattedMessage defaultMessage="Хорошо" />}
        onRequestClose={() => setIsOpen(false)}
      >
        <FormattedMessage defaultMessage="Мы свяжемся с вами в течение рабочего дня." />
      </Modal>
    </>
  );
};

export default ExampleMessageBox;
