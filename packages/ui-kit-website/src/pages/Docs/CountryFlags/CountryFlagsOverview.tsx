import React from 'react';

import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/country-flags/overview.md';
import ExampleCountryFlagsOverview from '~/examples/country-flags/ExampleCountryFlagsOverview';

const CountryFlagsOverview: React.FC = () => (
  <Surface>
    <RenderMarkdown overrides={{ ExampleCountryFlagsOverview }}>{content}</RenderMarkdown>
  </Surface>
);

export default CountryFlagsOverview;
