import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleButtonGroupBasic from '~/examples/button-group/ExampleButtonGroupBasic';
import ExampleButtonGroupSelect from '~/examples/button-group/ExampleButtonGroupSelect';
import ExampleButtonGroupMultiple from '~/examples/button-group/ExampleButtonGroupMultiple';
import ExampleButtonGroupOrientation from '~/examples/button-group/ExampleButtonGroupOrientation';
import content from '@via-profit/ui-kit/docs/button-group/README.md';

const ButtonGroupOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleButtonGroupBasic,
          ExampleButtonGroupSelect,
          ExampleButtonGroupMultiple,
          ExampleButtonGroupOrientation,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default ButtonGroupOverview;
