import React from 'react';
import RenderMarkdown from '~/components/RenderMarkdown';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import content from '@via-profit/ui-kit/docs/popper/README.md';
import ExamplePopperOverview from '~/examples/popper/ExamplePopperOverview';
import ExamplePopperAnchorPos from '~/examples/popper/ExamplePopperAnchorPos';
import ExamplePopperOutsideClick from '~/examples/popper/ExamplePopperOutsideClick';
import ExamplePopperModal from '~/examples/popper/ExamplePopperModal';

const PopperOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExamplePopperOverview,
          ExamplePopperAnchorPos,
          ExamplePopperOutsideClick,
          ExamplePopperModal,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default PopperOverview;
