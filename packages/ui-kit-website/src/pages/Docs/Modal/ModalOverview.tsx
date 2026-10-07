import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleModalOverview from '~/examples/modal/ExampleModalOverview';
import ExampleModalForm from '~/examples/modal/ExampleModalForm';
import ExampleConfirmBox from '~/examples/modal/ExampleConfirmBox';
import ExampleMessageBox from '~/examples/modal/ExampleMessageBox';
import ExampleModalDrawerOverview from '~/examples/modal/ExampleModalDrawerOverview';
import ExampleModalOverrides from '~/examples/modal/ExampleModalOverrides';
import content from '@via-profit/ui-kit/docs/modal/README.md';

const ModalOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleModalOverview,
          ExampleModalForm,
          ExampleConfirmBox,
          ExampleMessageBox,
          ExampleModalDrawerOverview,
          ExampleModalOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ModalOverview;
