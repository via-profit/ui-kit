import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';
import Surface from '@via-profit/ui-kit/src/Surface';
import content from '@via-profit/ui-kit/docs/README.md';

const Introduction: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return (
    <Surface>
      <MarkdownRender>{modifiedContent}</MarkdownRender>
    </Surface>
  );
};

export default Introduction;
