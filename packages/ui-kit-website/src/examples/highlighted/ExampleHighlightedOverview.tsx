import React from 'react';
import styled from '@emotion/styled';
import TextField from '@via-profit/ui-kit/src/TextField';
import Switch from '@via-profit/ui-kit/src/Switch';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import { FormattedMessage, useIntl } from 'react-intl';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2em;
`;

const ExampleHighlightedOverview: React.FC = () => {
  const intl = useIntl();
  const [query, setQuery] = React.useState('кофе мол');
  const [caseSensitive, setCaseSensitive] = React.useState(false);
  const products = [
    intl.formatMessage({ defaultMessage: 'Кофе в зёрнах, 1 кг' }),
    intl.formatMessage({ defaultMessage: 'Кофе молотый, 250 г' }),
    intl.formatMessage({ defaultMessage: 'Молоко 3,2%, 1 л' }),
    intl.formatMessage({ defaultMessage: 'Кофемолка ручная' }),
    intl.formatMessage({ defaultMessage: 'Чай чёрный, 100 пакетиков' }),
  ];
  // Every word of the query is highlighted separately
  const words = query.split(/\s+/);

  return (
    <Column>
      <TextField
        fullWidth
        label={intl.formatMessage({ defaultMessage: 'Поиск по товарам' })}
        value={query}
        onChange={event => setQuery(event.currentTarget.value)}
      />
      <Switch
        checked={caseSensitive}
        onChange={event => setCaseSensitive(event.currentTarget.checked)}
      >
        <FormattedMessage defaultMessage="Учитывать регистр" />
      </Switch>
      <List>
        {products.map(product => (
          <li key={product}>
            <Highlighted text={product} highlight={words} caseSensitive={caseSensitive} />
          </li>
        ))}
      </List>
    </Column>
  );
};

export default ExampleHighlightedOverview;
