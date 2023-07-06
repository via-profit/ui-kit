import React from 'react';
import styled from '@emotion/styled';
import Autocomplete, { AutocompleteRef } from '@via-profit/ui-kit/src/Autocomplete';
import Button from '@via-profit/ui-kit/src/Button';
import TextField from '@via-profit/ui-kit/src/TextField';

import countries from './countries.json';

type Item = {
  readonly code: string;
  readonly name: string;
};

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const ChipBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  margin: 0.43em;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
  border: 2px solid ${({ theme }) => theme.colors.accentPrimary.toString()};
  background-color: ${({ theme }) => theme.colors.surface.toString()};
  border-radius: ${({ theme }) => theme.shape.radiusFactor * 2}em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  max-width: 10em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
`;

const ExampleAutocompleteOverview: React.FC = () => {
  const anchorElementRef = React.useRef<HTMLDivElement | null>(null);
  const [selectedItems, setSelectedItems] = React.useState<readonly Item[]>([]);
  const [isMultiple, setMultiple] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);
  const autocompleteRef = React.useRef<AutocompleteRef<Item> | null>(null);
  const items = countries;

  return (
    <Autocomplete
      ref={autocompleteRef}
      isOpen={isOpen}
      estimatedItemSize={32}
      multiple={isMultiple}
      renderItem={({ item }) => <>{item.name}</>}
      items={items}
      getOptionSelected={({ item, value }) => item.code === value.code}
      value={selectedItems}
      filterItems={(variants, { query }) =>
        variants.filter(c => {
          const candidade = c.name.trim().toLowerCase();

          return candidade.indexOf(query) !== -1;
        })
      }
      itemToString={item => item.name}
      onSelectItem={item => {
        if (Array.isArray(item)) {
          setSelectedItems(item);
        }

        if (!Array.isArray(item)) {
          anchorElementRef.current?.focus();
          setSelectedItems([item as Item]);
          setOpen(false);
        }
      }}
      renderInput={({ selected, ...inputProps }) => (
        <>
          <InputBox>
            <TextField ref={anchorElementRef} {...inputProps} />
            <Button
              onMouseDown={event => {
                event.preventDefault();
                autocompleteRef.current?.blur();
                autocompleteRef.current?.focus();
              }}
            >
              ^
            </Button>
            <Button
              onClick={() => {
                autocompleteRef.current?.clear();
              }}
            >
              X
            </Button>
          </InputBox>
          {Array.isArray(selected) && (
            <ChipBox>
              {(selected as Item[]).map(selecedeItem => (
                <Chip
                  key={selecedeItem.code}
                  onClick={() => {
                    setSelectedItems(s => s.filter(s => s.code !== selecedeItem.code));
                    autocompleteRef.current?.focus();
                    autocompleteRef.current?.clearInput();
                  }}
                >
                  {selecedeItem.code}
                </Chip>
              ))}
            </ChipBox>
          )}
        </>
      )}
      onRequestOpen={() => setOpen(true)}
      onRequestClose={event => {
        const isKeybordEvent = (e: typeof event): e is KeyboardEvent => e?.type === 'keydown';
        if (isKeybordEvent(event)) {
          if (event.code === 'Escape') {
            anchorElementRef.current?.focus();
          }
        }
        setOpen(false);
      }}
    />
  );
};

export default ExampleAutocompleteOverview;
