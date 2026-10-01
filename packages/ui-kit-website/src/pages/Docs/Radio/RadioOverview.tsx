import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleRadioBasic from '~/examples/radio/ExampleRadioBasic';
import ExampleRadioControlled from '~/examples/radio/ExampleRadioControlled';
import ExampleRadioHorizontal from '~/examples/radio/ExampleRadioHorizontal';
import ExampleRadioValidation from '~/examples/radio/ExampleRadioValidation';
import ExampleRadioOverrides from '~/examples/radio/ExampleRadioOverrides';
import content from '@via-profit/ui-kit/docs/radio/README.md';

const RadioOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleRadioBasic,
          ExampleRadioControlled,
          ExampleRadioHorizontal,
          ExampleRadioValidation,
          ExampleRadioOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default RadioOverview;
