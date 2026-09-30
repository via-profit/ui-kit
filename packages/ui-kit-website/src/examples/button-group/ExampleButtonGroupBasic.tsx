import React from 'react';
import styled from '@emotion/styled';
import ButtonGroup from '@via-profit/ui-kit/src/ButtonGroup';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;
`;

const ExampleButtonGroupBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <Column>
      <ButtonGroup aria-label={intl.formatMessage({ defaultMessage: 'Действия с файлом' })}>
        <Button>
          <FormattedMessage defaultMessage="Открыть" />
        </Button>
        <Button>
          <FormattedMessage defaultMessage="Скачать" />
        </Button>
        <Button>
          <FormattedMessage defaultMessage="Удалить" />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="standard" color="primary">
        <Button>
          <FormattedMessage defaultMessage="Сохранить" />
        </Button>
        <Button>
          <FormattedMessage defaultMessage="Сохранить как…" />
        </Button>
      </ButtonGroup>
      <ButtonGroup disabled>
        <Button>
          <FormattedMessage defaultMessage="Назад" />
        </Button>
        <Button>
          <FormattedMessage defaultMessage="Вперёд" />
        </Button>
      </ButtonGroup>
    </Column>
  );
};

export default ExampleButtonGroupBasic;
