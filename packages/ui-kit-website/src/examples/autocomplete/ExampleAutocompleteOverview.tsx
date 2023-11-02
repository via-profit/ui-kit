import React from 'react';
import styled from '@emotion/styled';
import Autocomplete, { AutocompleteRef } from '@via-profit/ui-kit/src/Autocomplete';
import TextField from '@via-profit/ui-kit/src/TextField';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Autocomplete
        value={value}
        items={countries}
        isOpen={isOpen}
        filterItems={(items, { query }) =>
          items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
        }
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onSelectItem={item => setValue(item)}
      />
    </>
  );
};

export default ExampleAutocompleteOverview;
