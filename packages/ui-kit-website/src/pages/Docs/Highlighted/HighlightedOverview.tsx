import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/highlighted/README.md';
import ExampleHighlightedOverview from '~/examples/highlighted/ExampleHighlightedOverview';
import ExampleHighlightedOverrides from '~/examples/highlighted/ExampleHighlightedOverrides';

const CountryFlagsOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleHighlightedOverview, ExampleHighlightedOverrides }}>
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default CountryFlagsOverview;
