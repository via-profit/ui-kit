import React from 'react';

import AutocompleteContainer, { AutocompleteProps, AutocompleteRef } from './AutocompleteContainer';
import { ContextProvider } from './context';
import { Value } from '../Menu';

export * from './AutocompleteContainer';
export * from './AutocompleteItem';

// const a = <T, Multiple extends boolean | undefined = undefined>(
//   items: readonly T[],
//   value: Value<T, Multiple>,
//   selectedItemToString: AutocompleteProps<T, Multiple>['selectedItemToString'],
//   filterItems: AutocompleteProps<T, Multiple>['filterItems'],
// ) => {
//   if(!value) {
//     return items;
//   }
//   const values = Array.isArray(value) ? value : [value];
//   const inputValue = values.map(v => selectedItemToString(value)).join(', ');
  
//   const data = {
//     inputValue: inputValue,
//     query: inputValue.trim().toLocaleLowerCase(),
//   };

//   if (filterItems) {
//     const f = filterItems(items, data);
  
//   return f;
//   }

//   return items;
// };

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
        initialState={{
          filteredItems: items,
          // filteredItems: a(items, value, selectedItemToString, filterItems),
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
