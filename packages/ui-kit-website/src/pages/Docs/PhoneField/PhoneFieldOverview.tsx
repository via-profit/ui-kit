import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExamplePhoneFieldOverview from '~/examples/phone-field/ExamplePhoneFieldOverview';
import content from '@via-profit/ui-kit/docs/phone-field/README.md';

const PhoneFieldOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExamplePhoneFieldOverview,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default PhoneFieldOverview;
