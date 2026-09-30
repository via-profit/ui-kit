import React from 'react';
import Autocomplete, { AutocompleteItem, FilterItems } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import { FormattedMessage, useIntl } from 'react-intl';

import PlusIcon from '../../components/Icons/PlusOutline';
import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
  readonly isVirtual?: boolean;
};

const filterItems: FilterItems<Item> = (items, { query, inputValue }) => {
  const filtered = items.filter(item => item.name.toLocaleLowerCase().includes(query));

  // query is lowercased, the new item keeps the text as it was typed
  const name = inputValue.trim();
  const exists = items.some(item => item.name.toLocaleLowerCase() === query);

  if (name.length > 0 && !exists) {
    return [...filtered, { code: `new:${name}`, name, isVirtual: true }];
  }

  return filtered;
};

const ExampleAutocompleteMultiple: React.FC = () => {
  const intl = useIntl();
  const [items, setItems] = React.useState<readonly Item[]>(countries);
  const [value, setValue] = React.useState<readonly Item[]>(
    countries.filter(country => ['BR', 'RU', 'IN', 'CN', 'ZA'].includes(country.code)),
  );
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (newValue: readonly Item[]) => {
    // The chosen virtual item becomes a real one: it is added to the list and to the value
    const created = newValue
      .filter(item => item.isVirtual)
      .map(({ code, name }) => ({ code, name }));

    if (created.length > 0) {
      setItems(current => [...current, ...created]);
    }

    setValue(newValue.map(item => (item.isVirtual ? { code: item.code, name: item.name } : item)));
  };

  return (
    <Autocomplete
      label={<FormattedMessage defaultMessage="Страны" />}
      placeholder={intl.formatMessage({ defaultMessage: 'Начните вводить название' })}
      multiple
      fullWidth
      value={value}
      items={items}
      isOpen={isOpen}
      onRequestOpen={() => setIsOpen(true)}
      onRequestClose={() => setIsOpen(false)}
      onChange={handleChange}
      getOptionSelected={({ item, value }) => item.code === value.code}
      selectedItemToString={item => item.name}
      filterItems={filterItems}
    >
      {({ item, inputValue }, itemProps) => (
        <AutocompleteItem
          {...itemProps}
          key={item.code}
          startIcon={item.isVirtual ? <PlusIcon /> : undefined}
          variant={item.isVirtual ? 'virtual' : 'standard'}
        >
          {item.isVirtual ? (
            <FormattedMessage defaultMessage="Добавить «{name}»" values={{ name: item.name }} />
          ) : (
            <Highlighted text={item.name} highlight={inputValue} />
          )}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default ExampleAutocompleteMultiple;
