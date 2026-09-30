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

const Nested = styled(Column)`
  padding-left: 2em;
`;

const ExampleSwitchControlled: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [news, setNews] = React.useState(true);
  const [sales, setSales] = React.useState(false);

  return (
    <Column>
      <Switch checked={enabled} onChange={event => setEnabled(event.currentTarget.checked)}>
        <FormattedMessage defaultMessage="Получать рассылку" />
      </Switch>
      <Nested>
        <Switch
          checked={enabled && news}
          disabled={!enabled}
          onChange={event => setNews(event.currentTarget.checked)}
        >
          <FormattedMessage defaultMessage="Новости" />
        </Switch>
        <Switch
          checked={enabled && sales}
          disabled={!enabled}
          onChange={event => setSales(event.currentTarget.checked)}
        >
          <FormattedMessage defaultMessage="Скидки и акции" />
        </Switch>
      </Nested>
    </Column>
  );
};

export default ExampleSwitchControlled;
