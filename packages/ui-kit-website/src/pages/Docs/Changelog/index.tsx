import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/CHANGELOG.md';

const Changelog: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown>{content}</RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default Changelog;
