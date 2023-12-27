import React from 'react';
import styled from '@emotion/styled';
import Autocomplete, { AutocompleteItem } from '@via-profit/ui-kit/src/Autocomplete';
import Highlighted from '@via-profit/ui-kit/src/Highlighted';

import PlusIcon from '../../components/Icons/PlusOutline';
import { css } from '@emotion/react';
import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
  readonly isVirtual?: boolean;
};

const VirtualItem = styled(AutocompleteItem)`
  background-color: ${({ theme }) => theme.color.accentPrimary.alpha(0.1).toString()};
  border-color: ${({ theme }) => theme.color.accentPrimary.toString()};
  border-style: dashed;
  border-width: 1px;
  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.color.accentPrimary.toString()};
      font-weight: 700;
    `}
  :hover {
    background-color: ${({ theme }) => theme.color.accentPrimary.toString()};
    color: ${({ theme }) => theme.color.accentPrimaryContrast.toString()};
    font-weight: 700;
  }
`;

const ExampleAutocompleteOverview: React.FC = () => {
  const [value, setValue] = React.useState<Item | null>(countries[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [items] = React.useState<Item[]>(countries);

  return (
    <>
      <Autocomplete
        value={value}
        items={items}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        onRequestOpen={() => setIsOpen(true)}
        onChange={item => setValue(item)}
        selectedItemToString={item => item.name}
        filterItems={(items, { query }) => {
          const filtered = items.filter(
            item => item.name.toLocaleLowerCase().indexOf(query) !== -1,
          );

          if (query.length > 0) {
            filtered.push({
              code: window.crypto.randomUUID(),
              name: query,
              isVirtual: true,
            });
          }

          return filtered;
        }}
      >
        {({ item, inputValue }, itemProps) => {
          if (value?.code !== item.code && item.isVirtual) {
            return (
              <VirtualItem {...itemProps} key={item.code}>
                <PlusIcon />
                <span style={{ paddingLeft: '0.4em' }}>{item.name}</span>
              </VirtualItem>
            );
          }

          return (
            <AutocompleteItem {...itemProps} key={item.code}>
              <Highlighted text={item.name} highlight={inputValue} />
            </AutocompleteItem>
          );
        }}
      </Autocomplete>
    </>
  );
};

export default ExampleAutocompleteOverview;
