import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleAccordionBasic from '~/examples/accordion/ExampleAccordionBasic';
import ExampleAccordionMultiple from '~/examples/accordion/ExampleAccordionMultiple';
import ExampleAccordionOverrides from '~/examples/accordion/ExampleAccordionOverrides';
import ExampleAccordionControlled from '~/examples/accordion/ExampleAccordionControlled';
import content from '@via-profit/ui-kit/docs/accordion/README.md';

const AccordionOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleAccordionBasic,
          ExampleAccordionMultiple,
          ExampleAccordionControlled,
          ExampleAccordionOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default AccordionOverview;
