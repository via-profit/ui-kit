import React from 'react';
import Tabs, { Tab, TabList } from '@via-profit/ui-kit/src/Tabs';
import Stack from '@via-profit/ui-kit/src/Stack';
import { FormattedMessage, useIntl } from 'react-intl';

const ExampleTabsVariants: React.FC = () => {
  const intl = useIntl();

  return (
    <Stack gap="lg">
      <Tabs defaultValue="all">
        <TabList aria-label={intl.formatMessage({ defaultMessage: 'Заказы' })}>
          <Tab value="all">
            <FormattedMessage defaultMessage="Все" />
          </Tab>
          <Tab value="new" counter={12}>
            <FormattedMessage defaultMessage="Новые" />
          </Tab>
          <Tab value="problem" counter={0}>
            <FormattedMessage defaultMessage="Требуют решения" />
          </Tab>
          <Tab value="archive" disabled>
            <FormattedMessage defaultMessage="Архив" />
          </Tab>
        </TabList>
      </Tabs>
      <Tabs defaultValue="day" variant="segmented">
        <TabList aria-label={intl.formatMessage({ defaultMessage: 'Период' })}>
          <Tab value="day">
            <FormattedMessage defaultMessage="День" />
          </Tab>
          <Tab value="week">
            <FormattedMessage defaultMessage="Неделя" />
          </Tab>
          <Tab value="month">
            <FormattedMessage defaultMessage="Месяц" />
          </Tab>
        </TabList>
      </Tabs>
      <Stack direction="row" gap="lg" wrap align="center">
        {(['s', 'm', 'l'] as const).map(size => (
          <Tabs key={size} defaultValue="day" size={size}>
            <TabList aria-label={intl.formatMessage({ defaultMessage: 'Период' })}>
              <Tab value="day">
                <FormattedMessage defaultMessage="День" />
              </Tab>
              <Tab value="week">
                <FormattedMessage defaultMessage="Неделя" />
              </Tab>
              <Tab value="month">
                <FormattedMessage defaultMessage="Месяц" />
              </Tab>
            </TabList>
          </Tabs>
        ))}
      </Stack>
    </Stack>
  );
};

export default ExampleTabsVariants;
