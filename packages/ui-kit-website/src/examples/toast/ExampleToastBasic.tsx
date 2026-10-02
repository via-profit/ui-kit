import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import { toast } from '@via-profit/ui-kit/src/Toast';
import { FormattedMessage, useIntl } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const ExampleToastBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <Row>
      <Button
        variant="outlined"
        onClick={() => toast(intl.formatMessage({ defaultMessage: 'Черновик сохранён' }))}
      >
        default
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          toast.info(intl.formatMessage({ defaultMessage: 'Водитель назначен на заказ' }))
        }
      >
        info
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          toast(intl.formatMessage({ defaultMessage: 'Заказ создан' }), { type: 'success' })
        }
      >
        success
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          toast.warning(
            intl.formatMessage({ defaultMessage: 'Смена заканчивается через 15 минут' }),
          )
        }
      >
        warning
      </Button>
      <Button
        variant="outlined"
        onClick={() =>
          toast.error(intl.formatMessage({ defaultMessage: 'Не удалось сохранить заказ' }), {
            description: intl.formatMessage({
              defaultMessage: 'Нет связи с сервером. Попробуйте ещё раз.',
            }),
          })
        }
      >
        error
      </Button>
      <Button variant="plain" onClick={() => toast.dismiss()}>
        <FormattedMessage defaultMessage="Закрыть все" />
      </Button>
    </Row>
  );
};

export default ExampleToastBasic;
