import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleHintPopoverBasic from '~/examples/hint-popover/ExampleHintPopoverBasic';
import ExampleHintPopoverPlaces from '~/examples/hint-popover/ExampleHintPopoverPlaces';
import ExampleHintPopoverOverrides from '~/examples/hint-popover/ExampleHintPopoverOverrides';
import content from '@via-profit/ui-kit/docs/hint-popover/README.md';

const HintPopoverOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleHintPopoverBasic,
          ExampleHintPopoverPlaces,
          ExampleHintPopoverOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default HintPopoverOverview;
