import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/country-flags/README.md';
import ExampleCountryFlagsOverview from '~/examples/country-flags/ExampleCountryFlagsOverview';

const CountryFlagsOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleCountryFlagsOverview }}>{content}</RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />{' '}
  </>
);

export default CountryFlagsOverview;
