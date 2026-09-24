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

    // The initial state is used only on mount, so do not recompute it (and run filterItems) on every render
    const [initialState] = React.useState(() =>
      createInitialState({
        items,
        selectedItemToString,
        filterItems,
        value,
        isOpen,
      }),
    );

    return (
      <ContextProvider initialState={initialState}>
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
