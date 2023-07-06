import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';

import content from '@via-profit/ui-kit/docs/README.md';

const Introduction: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return <MarkdownRender>{modifiedContent}</MarkdownRender>;
};

export default Introduction;
