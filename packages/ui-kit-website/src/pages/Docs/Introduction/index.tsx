import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/README.md';

const Introduction: React.FC = () => (
  <Surface>
    <MarkdownRender>{content}</MarkdownRender>
  </Surface>
);

export default Introduction;
