import React from 'react';

import MarkdownRender from '~/components/RenderMarkdown';
import TableOfContent from '~/components/TableOfContent';
import content from '@via-profit/ui-kit/docs/loading-indicator/README.md';
import ExampleLoadingindicatorSpinner from '~/examples/loading-indicator/ExampleLoadingindicatorSpinner';
import DocsArticle from '~/components/DocsArticle';

const LoadingIndicator: React.FC = () => (
  <>
    <DocsArticle>
      <MarkdownRender overrides={{ ExampleLoadingindicatorSpinner }}>{content}</MarkdownRender>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default LoadingIndicator;
