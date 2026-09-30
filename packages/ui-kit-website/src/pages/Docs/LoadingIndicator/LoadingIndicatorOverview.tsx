import React from 'react';

import MarkdownRender from '~/components/RenderMarkdown';
import TableOfContent from '~/components/TableOfContent';
import content from '@via-profit/ui-kit/docs/loading-indicator/README.md';
import ExampleLoadingIndicatorStatic from '~/examples/loading-indicator/ExampleLoadingIndicatorStatic';
import ExampleLoadingIndicatorButton from '~/examples/loading-indicator/ExampleLoadingIndicatorButton';
import ExampleLoadingIndicatorOverlay from '~/examples/loading-indicator/ExampleLoadingIndicatorOverlay';
import DocsArticle from '~/components/DocsArticle';

const LoadingIndicator: React.FC = () => (
  <>
    <DocsArticle>
      <MarkdownRender
        overrides={{
          ExampleLoadingIndicatorStatic,
          ExampleLoadingIndicatorButton,
          ExampleLoadingIndicatorOverlay,
        }}
      >
        {content}
      </MarkdownRender>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default LoadingIndicator;
