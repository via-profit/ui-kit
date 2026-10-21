import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleStepperBasic from '~/examples/stepper/ExampleStepperBasic';
import ExampleStepperAlternative from '~/examples/stepper/ExampleStepperAlternative';
import ExampleStepperVertical from '~/examples/stepper/ExampleStepperVertical';
import content from '@via-profit/ui-kit/docs/stepper/README.md';

const StepperOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleStepperBasic,
          ExampleStepperAlternative,
          ExampleStepperVertical,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default StepperOverview;
