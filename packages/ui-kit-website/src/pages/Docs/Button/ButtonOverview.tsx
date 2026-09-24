import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleButtonBasic from '~/examples/button/ExampleButtonBasic';
import ExampleButtonVariants from '~/examples/button/ExampleButtonVariants';
import ExampleButtonColors from '~/examples/button/ExampleButtonColors';
import ExampleButtonOverrides from '~/examples/button/ExampleButtonOverrides';
import ExampleButtonIcons from '~/examples/button/ExampleButtonIcons';
import content from '@via-profit/ui-kit/docs/button/README.md';

const ButtonOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleButtonBasic,
          ExampleButtonVariants,
          ExampleButtonColors,
          ExampleButtonOverrides,
          ExampleButtonIcons,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ButtonOverview;
