import React from 'react';

import AutocompleteContainer, { AutocompleteProps, AutocompleteRef } from './AutocompleteContainer';
import { ContextProvider } from './context';

export * from './AutocompleteContainer';
export * from './AutocompleteItem';

const Autocomplete = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: AutocompleteProps<T, Multiple>,
    ref: React.Ref<AutocompleteRef>,
  ) => {
    const { children, items, isOpen, multiple, selectedItemToString, value, ...restProps } = props;

    return (
      <ContextProvider
        initialState={{
          filteredItems: items,
          currentOpen: isOpen,
          currentValue: value,
          inputValue:
            value === null
              ? ''
              : selectedItemToString(value as Multiple extends undefined ? T : readonly T[]),
        }}
      >
        <AutocompleteContainer
          {...restProps}
          items={items}
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
