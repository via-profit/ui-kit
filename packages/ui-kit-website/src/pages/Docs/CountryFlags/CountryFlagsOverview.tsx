import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/country-flags/README.md';
import ExampleCountryFlagsOverview from '~/examples/country-flags/ExampleCountryFlagsOverview';

const CountryFlagsOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleCountryFlagsOverview }}>{content}</RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />{' '}
  </>
);

export default CountryFlagsOverview;
