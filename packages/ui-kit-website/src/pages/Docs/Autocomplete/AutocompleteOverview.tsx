import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/autocomplete/README.md';
import ExampleAutocompleteOverview from '~/examples/autocomplete/ExampleAutocompleteOverview';

const AutocompleteOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleAutocompleteOverview }}>{content}</RenderMarkdown>
  </Surface>
);

export default AutocompleteOverview;
