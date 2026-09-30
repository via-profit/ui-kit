import React from 'react';
import Accordion from '@via-profit/ui-kit/src/Accordion';
import { FormattedMessage } from 'react-intl';

const ExampleAccordionMultiple: React.FC = () => (
  <div>
    <Accordion defaultOpened header={<FormattedMessage defaultMessage="Как оформить возврат?" />}>
      <FormattedMessage defaultMessage="Откройте заказ в личном кабинете и нажмите «Вернуть товар». Курьер заберёт его в удобное время." />
    </Accordion>
    <Accordion header={<FormattedMessage defaultMessage="Сколько идут деньги при возврате?" />}>
      <FormattedMessage defaultMessage="Деньги вернутся на карту в течение 10 дней после того, как мы получим товар." />
    </Accordion>
    <Accordion header={<FormattedMessage defaultMessage="Можно ли изменить адрес доставки?" />}>
      <FormattedMessage defaultMessage="Да, пока заказ не передан в доставку. Напишите в поддержку или измените адрес в заказе." />
    </Accordion>
  </div>
);

export default ExampleAccordionMultiple;
