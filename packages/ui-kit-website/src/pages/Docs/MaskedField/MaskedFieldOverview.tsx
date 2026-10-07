import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/masked-field/README.md';
import ExampleMaskedFieldOverview from '~/examples/masked-field/ExampleMaskedFieldOverview';
import ExampleMaskedFieldValidation from '~/examples/masked-field/ExampleMaskedFieldValidation';
import ExampleMaskedFieldValue from '~/examples/masked-field/ExampleMaskedFieldValue';
import ExampleMaskedFieldDynamic from '~/examples/masked-field/ExampleMaskedFieldDynamic';
import ExampleMaskedFieldTransform from '~/examples/masked-field/ExampleMaskedFieldTransform';
import ExampleMaskedFieldOverrides from '~/examples/masked-field/ExampleMaskedFieldOverrides';

const MaskedFieldOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExampleMaskedFieldOverview,
          ExampleMaskedFieldValidation,
          ExampleMaskedFieldValue,
          ExampleMaskedFieldDynamic,
          ExampleMaskedFieldTransform,
          ExampleMaskedFieldOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default MaskedFieldOverview;
