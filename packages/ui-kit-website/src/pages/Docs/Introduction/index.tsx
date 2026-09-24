import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/README.md';

const Introduction: React.FC = () => (
  <DocsArticle>
    <MarkdownRender>{content}</MarkdownRender>
  </DocsArticle>
);

export default Introduction;
