import React from 'react';
import styled from '@emotion/styled';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import { useIntl } from 'react-intl';

const Narrow = styled.div`
  max-width: 22em;
`;

const ExampleTabsScroll: React.FC = () => {
  const intl = useIntl();
  const months = Array.from({ length: 12 }, (_, month) =>
    intl.formatDate(new Date(2026, month, 1), { month: 'long' }),
  );

  return (
    <Narrow>
      <Tabs defaultValue="0" activation="manual">
        <TabList aria-label={intl.formatMessage({ defaultMessage: 'Месяц отчёта' })}>
          {months.map((month, index) => (
            <Tab key={month} value={String(index)}>
              {month}
            </Tab>
          ))}
        </TabList>
        {months.map((month, index) => (
          <TabPanel key={month} value={String(index)}>
            {intl.formatMessage({ defaultMessage: 'Отчёт за {month}' }, { month })}
          </TabPanel>
        ))}
      </Tabs>
    </Narrow>
  );
};

export default ExampleTabsScroll;
