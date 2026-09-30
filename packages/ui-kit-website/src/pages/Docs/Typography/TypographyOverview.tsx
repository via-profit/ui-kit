import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/typography/README.md';
import ExampleTypographyHeadings from '~/examples/typography/ExampleTypographyHeadings';
import ExampleTypographyText from '~/examples/typography/ExampleTypographyText';
import ExampleTypographyLists from '~/examples/typography/ExampleTypographyLists';
import ExampleTypographySection from '~/examples/typography/ExampleTypographySection';

const TypographyOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTypographyHeadings,
          ExampleTypographyText,
          ExampleTypographyLists,
          ExampleTypographySection,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TypographyOverview;
