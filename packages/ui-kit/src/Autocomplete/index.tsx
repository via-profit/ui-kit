import React from 'react';

import AutocompleteContainer, { AutocompleteProps, AutocompleteRef } from './AutocompleteContainer';
import { ContextProvider, createInitialState } from './context';

export * from './AutocompleteContainer';
export * from './AutocompleteItem';

const Autocomplete = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: AutocompleteProps<T, Multiple>,
    ref: React.Ref<AutocompleteRef>,
  ) => {
    const {
      children,
      items,
      filterItems,
      isOpen,
      multiple,
      selectedItemToString,
      value,
      ...restProps
    } = props;

    return (
      <ContextProvider
        initialState={createInitialState({
          items,
          selectedItemToString,
          filterItems,
          value,
          isOpen,
        })}
      >
        <AutocompleteContainer
          {...restProps}
          items={items}
          filterItems={filterItems}
          isOpen={isOpen}
          multiple={multiple}
          selectedItemToString={selectedItemToString}
          value={value}
          ref={ref}
        >
          {children}
        </AutocompleteContainer>
      </ContextProvider>
    );
  },
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete as <T, Multiple extends boolean | undefined = undefined>(
  props: AutocompleteProps<T, Multiple> & { ref?: React.Ref<AutocompleteRef> },
) => JSX.Element;
