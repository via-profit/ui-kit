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
    const { children, ...restProps } = props;

    return (
      <ContextProvider>
        <AutocompleteContainer {...restProps} ref={ref}>
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
