import React from 'react';
import styled from '@emotion/styled';
import Modal from '@via-profit/ui-kit/src/Modal';
import Button from '@via-profit/ui-kit/src/Button';
import TextField from '@via-profit/ui-kit/src/TextField';
import H3 from '@via-profit/ui-kit/src/Typography/H3';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import { FormattedMessage, useIntl } from 'react-intl';

const Form = styled.form`
  width: 24em;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
`;

const ExampleModalForm: React.FC = () => {
  const intl = useIntl();
  const [name, setName] = React.useState('Анна Смирнова');
  const [draft, setDraft] = React.useState(name);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const open = () => {
    setDraft(name);
    setIsOpen(true);
  };

  // Unsaved changes must be confirmed before closing
  const requestClose = () => {
    if (draft !== name) {
      setIsConfirmOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Paragraph>
        <FormattedMessage defaultMessage="Имя: {name}" values={{ name }} />
      </Paragraph>
      <Button onClick={open}>
        <FormattedMessage defaultMessage="Изменить имя" />
      </Button>

      <Modal variant="dialog" isOpen={isOpen} onRequestClose={requestClose}>
        <Form
          onSubmit={event => {
            event.preventDefault();
            setName(draft);
            setIsOpen(false);
          }}
        >
          <H3>
            <FormattedMessage defaultMessage="Изменение имени" />
          </H3>
          <TextField
            label={<FormattedMessage defaultMessage="Имя" />}
            fullWidth
            value={draft}
            onChange={event => setDraft(event.currentTarget.value)}
          />
          <Actions>
            <Button type="button" onClick={requestClose}>
              <FormattedMessage defaultMessage="Отмена" />
            </Button>
            <Button type="submit" color="primary">
              <FormattedMessage defaultMessage="Сохранить" />
            </Button>
          </Actions>
        </Form>
      </Modal>

      <Modal
        variant="confirm-box"
        isOpen={isConfirmOpen}
        header={intl.formatMessage({ defaultMessage: 'Закрыть без сохранения?' })}
        confirmButtonLabel={<FormattedMessage defaultMessage="Закрыть" />}
        dismissButtonLabel={<FormattedMessage defaultMessage="Продолжить редактирование" />}
        onRequestYes={() => {
          setIsConfirmOpen(false);
          setIsOpen(false);
        }}
        onRequestClose={() => setIsConfirmOpen(false)}
      >
        <FormattedMessage defaultMessage="Изменения будут потеряны." />
      </Modal>
    </>
  );
};

export default ExampleModalForm;
