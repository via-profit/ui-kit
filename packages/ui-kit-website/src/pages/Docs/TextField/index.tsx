import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTextFieldOverview from '~/examples/text-field/ExampleTextFieldOverview';
import ExampleTextFieldOverrides from '~/examples/text-field/ExampleTextFieldOverrides';
import ExampleTextFieldIcons from '~/examples/text-field/ExampleTextFieldIcons';
import content from '@via-profit/ui-kit/docs/text-field/README.md';

const TextFields: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTextFieldOverview,
          ExampleTextFieldOverrides,
          ExampleTextFieldIcons,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TextFields;
