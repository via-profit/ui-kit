import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import Surface from '@via-profit/ui-kit/src/Surface';
import RenderMarkdown from '~/components/RenderMarkdown';
import content from '@via-profit/ui-kit/docs/masked-field/README.md';
import ExampleMaskedFieldBasic from '~/examples/masked-field/ExampleMaskedFieldBasic';
import ExampleMaskedFieldPhone from '~/examples/masked-field/ExampleMaskedFieldPhone';

const MaskedFieldOverview: React.FC = () => (
  <>
    <Surface>
      <RenderMarkdown overrides={{ ExampleMaskedFieldBasic, ExampleMaskedFieldPhone }}>
        {content}
      </RenderMarkdown>
    </Surface>
    <TableOfContent content={content} />
  </>
);

export default MaskedFieldOverview;
