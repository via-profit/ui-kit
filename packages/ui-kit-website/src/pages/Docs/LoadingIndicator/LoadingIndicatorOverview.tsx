import React from 'react';

import MarkdownRender from '~/components/RenderMarkdown';
import TableOfContent from '~/components/TableOfContent';
import content from '@via-profit/ui-kit/docs/loading-indicator/README.md';
import ExampleLoadingindicatorSpinner from '~/examples/loading-indicator/ExampleLoadingindicatorSpinner';
import Surface from '@via-profit/ui-kit/src/Surface';

const LoadingIndicator: React.FC = () => {
  const modifiedContent = content.replace(/\.\//g, './docs/');

  return (
    <>
      <Surface>
        <MarkdownRender overrides={{ ExampleLoadingindicatorSpinner }}>
          {modifiedContent}
        </MarkdownRender>
      </Surface>
      <TableOfContent content={content} />
    </>
  );
};

export default LoadingIndicator;
