import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTooltipBasic from '~/examples/tooltip/ExampleTooltipBasic';
import ExampleTooltipPlacement from '~/examples/tooltip/ExampleTooltipPlacement';
import ExampleTooltipDescribe from '~/examples/tooltip/ExampleTooltipDescribe';
import ExampleTooltipOverrides from '~/examples/tooltip/ExampleTooltipOverrides';
import content from '@via-profit/ui-kit/docs/tooltip/README.md';

const TooltipOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTooltipBasic,
          ExampleTooltipPlacement,
          ExampleTooltipDescribe,
          ExampleTooltipOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TooltipOverview;
