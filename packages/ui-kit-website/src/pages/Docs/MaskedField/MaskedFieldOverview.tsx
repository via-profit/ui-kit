import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/masked-field/README.md';
import ExampleMaskedFieldBasic from '~/examples/masked-field/ExampleMaskedFieldBasic';
import ExampleMaskedFieldPhone from '~/examples/masked-field/ExampleMaskedFieldPhone';

const MaskedFieldOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown overrides={{ ExampleMaskedFieldBasic, ExampleMaskedFieldPhone }}>
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default MaskedFieldOverview;
