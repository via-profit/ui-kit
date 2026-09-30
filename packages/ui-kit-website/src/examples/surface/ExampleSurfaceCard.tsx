import React from 'react';
import styled from '@emotion/styled';
import Surface from '@via-profit/ui-kit/src/Surface';
import Paragraph from '@via-profit/ui-kit/src/Typography/Paragraph';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const Card = styled(Surface)`
  max-width: 26em;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5em;
`;

const ExampleSurfaceCard: React.FC = () => (
  <Card
    header={<FormattedMessage defaultMessage="Заказ №1042" />}
    subheader={<FormattedMessage defaultMessage="Оформлен 30 сентября" />}
    footer={
      <Actions>
        <Button>
          <FormattedMessage defaultMessage="Отменить" />
        </Button>
        <Button color="primary">
          <FormattedMessage defaultMessage="Оплатить" />
        </Button>
      </Actions>
    }
  >
    <Paragraph>
      <FormattedMessage defaultMessage="3 товара на сумму 4 590 ₽. Доставка курьером, 2–3 дня." />
    </Paragraph>
  </Card>
);

export default ExampleSurfaceCard;
