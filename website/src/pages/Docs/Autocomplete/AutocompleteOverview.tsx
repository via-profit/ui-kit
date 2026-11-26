import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleAutocompleteOverview from '~/examples/autocomplete/ExampleAutocompleteOverview';
import ExampleAutocompleteCreatable from '~/examples/autocomplete/ExampleAutocompleteCreatable';
import ExampleAutocompleteFetch from '~/examples/autocomplete/ExampleAutocompleteFetch';
import ExampleAutocompleteMultiple from '~/examples/autocomplete/ExampleAutocompleteMultiple';
import ExampleAutocompleteOverrides from '~/examples/autocomplete/ExampleAutocompleteOverrides';
import ExampleAutocompleteFreeText from '~/examples/autocomplete/ExampleAutocompleteFreeText';

/**
 * The page of the component: the documentation with the live examples
 */
const AutocompleteOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleAutocompleteOverview,
      ExampleAutocompleteCreatable,
      ExampleAutocompleteFetch,
      ExampleAutocompleteMultiple,
      ExampleAutocompleteOverrides,
      ExampleAutocompleteFreeText,
    }}
  />
);

export default AutocompleteOverview;
