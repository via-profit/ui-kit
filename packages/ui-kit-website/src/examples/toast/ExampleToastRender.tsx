import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import { toast, ToastPosition } from '@via-profit/ui-kit/src/Toast';
import { FormattedMessage, useIntl } from 'react-intl';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

const Title = styled.div`
  font-weight: 600;
`;

const positions: readonly ToastPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const ExampleToastRender: React.FC = () => {
  const intl = useIntl();

  const showLead = () =>
    toast(
      ({ closeToast }) => (
        <>
          <Title>
            <FormattedMessage defaultMessage="Новая заявка" />
          </Title>
          <FormattedMessage defaultMessage="Перевозка дивана, Москва → Тверь" />
          <Row style={{ marginTop: '0.6em' }}>
            <Button color="primary" onClick={closeToast}>
              <FormattedMessage defaultMessage="Взять в работу" />
            </Button>
          </Row>
        </>
      ),
      { autoClose: false, type: 'info' },
    );

  return (
    <Row>
      <Button variant="outlined" onClick={showLead}>
        <FormattedMessage defaultMessage="Новая заявка" />
      </Button>
      {positions.map(position => (
        <Button
          key={position}
          variant="plain"
          onClick={() =>
            toast(intl.formatMessage({ defaultMessage: 'Позиция {position}' }, { position }), {
              position,
            })
          }
        >
          {position}
        </Button>
      ))}
    </Row>
  );
};

export default ExampleToastRender;
