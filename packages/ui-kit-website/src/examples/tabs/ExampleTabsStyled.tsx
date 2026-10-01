import React from 'react';
import styled from '@emotion/styled';
import Tabs, { Tab, TabList, TabPanel } from '@via-profit/ui-kit/src/Tabs';
import { FormattedMessage, useIntl } from 'react-intl';

// Defined once at module level, not during the render
const PillList = styled(TabList)`
  display: inline-flex;
  gap: 0.25em;
  padding: 0.25em;
  border: 0;
  border-radius: 2em;
  background-color: ${({ theme }) => theme.color.textPrimary.alpha(0.06).toString()};
`;

const Pill = styled(Tab)`
  padding: 0.45em 1.1em;
  border-radius: 2em;

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.color.surface.toString()};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }

  &::after {
    display: none;
  }
`;

const ExampleTabsStyled: React.FC = () => {
  const intl = useIntl();

  return (
    <Tabs defaultValue="week">
      <PillList aria-label={intl.formatMessage({ defaultMessage: 'Период' })}>
        <Pill value="day">
          <FormattedMessage defaultMessage="День" />
        </Pill>
        <Pill value="week">
          <FormattedMessage defaultMessage="Неделя" />
        </Pill>
        <Pill value="month">
          <FormattedMessage defaultMessage="Месяц" />
        </Pill>
      </PillList>
      <TabPanel value="day">
        <FormattedMessage defaultMessage="Продажи за день: 48 000 ₽" />
      </TabPanel>
      <TabPanel value="week">
        <FormattedMessage defaultMessage="Продажи за неделю: 312 000 ₽" />
      </TabPanel>
      <TabPanel value="month">
        <FormattedMessage defaultMessage="Продажи за месяц: 1 340 000 ₽" />
      </TabPanel>
    </Tabs>
  );
};

export default ExampleTabsStyled;
