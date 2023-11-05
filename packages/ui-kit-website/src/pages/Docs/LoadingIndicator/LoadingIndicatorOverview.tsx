import React from 'react';
import MarkdownRender from '~/components/RenderMarkdown';

import content from '@via-profit/ui-kit/docs/loading-indicator/README.md';
import ExampleLoadingindicatorSpinner from '~/examples/loading-indicator/ExampleLoadingindicatorSpinner';

const LoadingIndicator: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return (
    <MarkdownRender overrides={{ ExampleLoadingindicatorSpinner }}>
      {modifiedContent}
    </MarkdownRender>
  );
};

export default LoadingIndicator;
