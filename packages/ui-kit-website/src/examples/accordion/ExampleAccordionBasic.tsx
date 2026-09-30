import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import Button from '@via-profit/ui-kit/src/Button';
import { FormattedMessage } from 'react-intl';

const ExampleAccordionBasic: React.FC = () => (
  <Accordion
    header={<FormattedMessage defaultMessage="Доставка и оплата" />}
    actions={
      <Button variant="outlined" color="primary">
        <FormattedMessage defaultMessage="Все способы доставки" />
      </Button>
    }
  >
    <FormattedMessage defaultMessage="Доставляем курьером за 1–2 дня или в пункт выдачи за 2–4 дня. Оплатить заказ можно картой на сайте или при получении." />
  </Accordion>
);

export default ExampleAccordionBasic;
