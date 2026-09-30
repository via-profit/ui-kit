import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExampleTextFieldOverview from '~/examples/text-field/ExampleTextFieldOverview';
import ExampleTextFieldValidation from '~/examples/text-field/ExampleTextFieldValidation';
import ExampleTextFieldIcons from '~/examples/text-field/ExampleTextFieldIcons';
import ExampleTextFieldStates from '~/examples/text-field/ExampleTextFieldStates';
import ExampleTextFieldOverrides from '~/examples/text-field/ExampleTextFieldOverrides';
import content from '@via-profit/ui-kit/docs/text-field/README.md';

const TextFields: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleTextFieldOverview,
          ExampleTextFieldValidation,
          ExampleTextFieldIcons,
          ExampleTextFieldStates,
          ExampleTextFieldOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default TextFields;
