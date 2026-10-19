import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleInfoNoteBasic from '~/examples/info-note/ExampleInfoNoteBasic';
import ExampleInfoNoteVariants from '~/examples/info-note/ExampleInfoNoteVariants';
import ExampleInfoNoteTitle from '~/examples/info-note/ExampleInfoNoteTitle';
import ExampleInfoNoteOverrides from '~/examples/info-note/ExampleInfoNoteOverrides';
import content from '@via-profit/ui-kit/docs/info-note/README.md';

const InfoNoteOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleInfoNoteBasic,
          ExampleInfoNoteVariants,
          ExampleInfoNoteTitle,
          ExampleInfoNoteOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default InfoNoteOverview;
