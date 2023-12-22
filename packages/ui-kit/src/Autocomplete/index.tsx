import React from 'react';

import AutocompleteItem from '../Menu/MenuItem';
import AutocompleteContainer, { AutocompleteProps, AutocompleteRef } from './AutocompleteContainer';
import { ContextProvider } from './context';

export * from './AutocompleteContainer';
export { AutocompleteItem };

const Autocomplete = React.forwardRef(
  <T, Multiple extends boolean | undefined = undefined>(
    props: AutocompleteProps<T, Multiple>,
    ref: React.Ref<AutocompleteRef>,
  ) => {
    const { children, items, isOpen, value, ...restProps } = props;

    return (
      <ContextProvider
        initialState={{ filteredItems: items, currentOpen: isOpen, currentValue: value }}
      >
        <AutocompleteContainer {...restProps} items={items} isOpen={isOpen} value={value} ref={ref}>
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
