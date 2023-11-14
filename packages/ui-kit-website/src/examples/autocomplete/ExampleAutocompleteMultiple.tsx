import React from 'react';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';
import Badge from '@via-profit/ui-kit/src/Badge';
import styled from '@emotion/styled';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const BadgeContainer = styled.div`
  & > span {
    margin: 0 0.4em 0.4em 0%;
  }

  & > span:last-of-type {
    margin-right: 0;
  }
`;

const ExampleAutocompleteMultiple: React.FC = () => {
  const [value, setValue] = React.useState<readonly Item[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <BadgeContainer>
        {value.map(item => (
          <Badge
            variant="outlined"
            color="primary"
            onDelete={() => setValue(values => values.filter(v => v.code !== item.code))}
            key={item.code}
          >
            {item.name}
          </Badge>
        ))}
      </BadgeContainer>
      <Autocomplete
        multiple
        value={value}
        items={countries}
        isOpen={isOpen}
        filterItems={(items, { query }) =>
          items.filter(item => item.name.toLocaleLowerCase().indexOf(query) !== -1)
        }
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={items => setValue(items)}
        selectedItemToString={items => items.map(({ name }) => name).join(', ')}
      >
        {({ item, inputValue }, itemProps) => (
          <AutocompleteItem {...itemProps} key={item.code}>
            <Highlighted text={item.name} highlight={inputValue} />
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};

export default ExampleAutocompleteMultiple;
