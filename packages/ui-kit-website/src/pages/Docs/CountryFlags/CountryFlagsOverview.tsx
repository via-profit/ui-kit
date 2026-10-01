import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleCountryFlagsBasic from '~/examples/country-flags/ExampleCountryFlagsBasic';
import ExampleCountryFlagsSize from '~/examples/country-flags/ExampleCountryFlagsSize';
import ExampleCountryFlagsByCode from '~/examples/country-flags/ExampleCountryFlagsByCode';
import ExampleCountryFlagsGallery from '~/examples/country-flags/ExampleCountryFlagsGallery';
import content from '@via-profit/ui-kit/docs/country-flags/README.md';

const CountryFlagsOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleCountryFlagsBasic,
          ExampleCountryFlagsSize,
          ExampleCountryFlagsByCode,
          ExampleCountryFlagsGallery,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default CountryFlagsOverview;
