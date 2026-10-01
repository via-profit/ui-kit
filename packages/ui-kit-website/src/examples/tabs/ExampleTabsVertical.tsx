import React from 'react';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTabsVertical: React.FC = () => {
  const intl = useIntl();

  return (
    <Tabs orientation="vertical" defaultValue="profile" color="secondary">
      <TabList aria-label={intl.formatMessage({ defaultMessage: 'Настройки' })}>
        <Tab value="profile">
          <FormattedMessage defaultMessage="Профиль" />
        </Tab>
        <Tab value="notifications">
          <FormattedMessage defaultMessage="Уведомления" />
        </Tab>
        <Tab value="security">
          <FormattedMessage defaultMessage="Безопасность" />
        </Tab>
      </TabList>
      <TabPanel value="profile">
        <FormattedMessage defaultMessage="Имя, фото и должность." />
      </TabPanel>
      <TabPanel value="notifications">
        <FormattedMessage defaultMessage="Почта, push-уведомления и рассылки." />
      </TabPanel>
      <TabPanel value="security">
        <FormattedMessage defaultMessage="Пароль и двухфакторная аутентификация." />
      </TabPanel>
    </Tabs>
  );
};

export default ExampleTabsVertical;
