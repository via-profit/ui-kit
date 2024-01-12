import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleAccordionBasic from '~/examples/accordion/ExampleAccordionBasic';
import ExampleAccordionMultiple from '~/examples/accordion/ExampleAccordionMultiple';
import ExampleAccordionOverrides from '~/examples/accordion/ExampleAccordionOverrides';
import ExampleAccordionControlled from '~/examples/accordion/ExampleAccordionControlled';
import content from '@via-profit/ui-kit/docs/accordion/README.md';

const AccordionOverview: React.FC = () => (
  <>
    <Surface>
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
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default AccordionOverview;
