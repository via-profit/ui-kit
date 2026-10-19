import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/src/Autocomplete';
import TextField from '@via-profit/ui-kit/src/TextField';
import Grid from '@via-profit/ui-kit/src/Grid';
import { FormattedMessage } from 'react-intl';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const findCountries = (text: string): Item[] => {
  const query = text.trim().toLocaleLowerCase();

  return query.length < 2
    ? []
    : countries.filter(item => item.name.toLocaleLowerCase().includes(query)).slice(0, 8);
};

const ExampleAutocompleteFreeText: React.FC = () => {
  const [name, setName] = React.useState('');
  const [code, setCode] = React.useState('');
  const [items, setItems] = React.useState<Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Grid minColumnWidth="14em" gap="md" style={{ maxWidth: '32em' }}>
      <Autocomplete<Item>
        fullWidth
        label={<FormattedMessage defaultMessage="Страна" />}
        value={null}
        inputValue={name}
        onInputValueChange={text => {
          setName(text);
          const found = findCountries(text);
          setItems(found);
          setIsOpen(found.length > 0);
        }}
        items={items}
        isOpen={isOpen}
        onRequestOpen={() => setIsOpen(items.length > 0)}
        onRequestClose={() => setIsOpen(false)}
        onChange={item => {
          if (item) {
            setName(item.name);
            setCode(item.code);
          }
          setIsOpen(false);
        }}
        selectedItemToString={item => item.name}
        filterItems={list => list}
      >
        {({ item }, itemProps) => (
          <AutocompleteItem {...itemProps} key={item.code}>
            {item.name}
          </AutocompleteItem>
        )}
      </Autocomplete>
      <TextField
        fullWidth
        label={<FormattedMessage defaultMessage="Код страны" />}
        value={code}
        onChange={event => setCode(event.currentTarget.value)}
      />
    </Grid>
  );
};

export default ExampleAutocompleteFreeText;
