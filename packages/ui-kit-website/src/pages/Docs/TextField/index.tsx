import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTextFieldOverview from '~/examples/text-field/ExampleTextFieldOverview';
import ExampleTextFieldOverrides from '~/examples/text-field/ExampleTextFieldOverrides';
import ExampleTextFieldIcons from '~/examples/text-field/ExampleTextFieldIcons';
import content from '@via-profit/ui-kit/docs/text-field/README.md';

const TextFields: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown
        overrides={{
          ExampleTextFieldOverview,
          ExampleTextFieldOverrides,
          ExampleTextFieldIcons,
        }}
      >
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default TextFields;
