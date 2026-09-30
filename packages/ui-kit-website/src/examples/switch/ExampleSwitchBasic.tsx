import React from 'react';
import styled from '@emotion/styled';
import Switch from '@via-profit/ui-kit/src/Switch';
import { FormattedMessage } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5em;
`;

const ExampleSwitchBasic: React.FC = () => (
  <Column>
    <Switch defaultChecked>
      <FormattedMessage defaultMessage="Уведомления по email" />
    </Switch>
    <Switch>
      <FormattedMessage defaultMessage="Уведомления в браузере" />
    </Switch>
    <Switch defaultChecked disabled>
      <FormattedMessage defaultMessage="Системные уведомления" />
    </Switch>
    <Switch disabled>
      <FormattedMessage defaultMessage="SMS (недоступно)" />
    </Switch>
  </Column>
);

export default ExampleSwitchBasic;
