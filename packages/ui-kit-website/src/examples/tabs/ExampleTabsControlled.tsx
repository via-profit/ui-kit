import React from 'react';
import styled from '@emotion/styled';
import Button from '@via-profit/ui-kit/src/Button';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import { FormattedMessage, useIntl } from 'react-intl';

const Footer = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: 1em;
`;

const steps = ['contacts', 'delivery', 'payment'] as const;

const ExampleTabsControlled: React.FC = () => {
  const intl = useIntl();
  const [step, setStep] = React.useState<string>('contacts');
  const index = steps.indexOf(step as (typeof steps)[number]);

  return (
    <Tabs value={step} onChange={setStep} fullWidth>
      <TabList aria-label={intl.formatMessage({ defaultMessage: 'Оформление заказа' })}>
        <Tab value="contacts">
          <FormattedMessage defaultMessage="1. Контакты" />
        </Tab>
        <Tab value="delivery">
          <FormattedMessage defaultMessage="2. Доставка" />
        </Tab>
        <Tab value="payment">
          <FormattedMessage defaultMessage="3. Оплата" />
        </Tab>
      </TabList>
      <TabPanel value="contacts">
        <FormattedMessage defaultMessage="Имя, телефон и почта покупателя." />
      </TabPanel>
      <TabPanel value="delivery">
        <FormattedMessage defaultMessage="Адрес и время доставки." />
      </TabPanel>
      <TabPanel value="payment">
        <FormattedMessage defaultMessage="Способ оплаты." />
      </TabPanel>
      <Footer>
        <Button variant="outlined" disabled={index === 0} onClick={() => setStep(steps[index - 1])}>
          <FormattedMessage defaultMessage="Назад" />
        </Button>
        <Button
          color="primary"
          disabled={index === steps.length - 1}
          onClick={() => setStep(steps[index + 1])}
        >
          <FormattedMessage defaultMessage="Далее" />
        </Button>
      </Footer>
    </Tabs>
  );
};

export default ExampleTabsControlled;
