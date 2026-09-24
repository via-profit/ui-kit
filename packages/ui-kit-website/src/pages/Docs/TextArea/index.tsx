import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTextAreaOverview from '~/examples/text-area/ExampleTextAreaOverview';
import ExampleTextAreaOverrides from '~/examples/text-area/ExampleTextAreaOverrides';
import content from '@via-profit/ui-kit/docs/text-area/README.md';

const TextArea: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTextAreaOverview,
          ExampleTextAreaOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TextArea;
