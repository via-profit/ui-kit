import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleModalDrawerOverview from '~/examples/modal/ExampleModalDrawerOverview';
import ExampleModalOverview from '~/examples/modal/ExampleModalOverview';
import ExampleConfirmBox from '~/examples/modal/ExampleConfirmBox';
import ExampleMeesageBox from '~/examples/modal/ExampleMeesageBox';
import content from '@via-profit/ui-kit/docs/modal/README.md';

const ModalOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleModalDrawerOverview,
          ExampleModalOverview,
          ExampleConfirmBox,
          ExampleMeesageBox,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ModalOverview;
