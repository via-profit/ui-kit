import React from 'react';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTabsBasic: React.FC = () => {
  const intl = useIntl();

  return (
    <Tabs defaultValue="info">
      <TabList aria-label={intl.formatMessage({ defaultMessage: 'Карточка клиента' })}>
        <Tab value="info">
          <FormattedMessage defaultMessage="Информация" />
        </Tab>
        <Tab value="deals">
          <FormattedMessage defaultMessage="Сделки" />
        </Tab>
        <Tab value="history">
          <FormattedMessage defaultMessage="История" />
        </Tab>
        <Tab value="documents" disabled>
          <FormattedMessage defaultMessage="Документы" />
        </Tab>
      </TabList>
      <TabPanel value="info">
        <FormattedMessage defaultMessage="ООО «Ромашка», ИНН 7700000000, менеджер — Анна Смирнова." />
      </TabPanel>
      <TabPanel value="deals">
        <FormattedMessage defaultMessage="Три открытые сделки на 1 250 000 ₽." />
      </TabPanel>
      <TabPanel value="history">
        <FormattedMessage defaultMessage="Последний звонок — вчера в 15:40." />
      </TabPanel>
    </Tabs>
  );
};

export default ExampleTabsBasic;
