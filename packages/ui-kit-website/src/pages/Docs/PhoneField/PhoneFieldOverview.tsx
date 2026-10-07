import React from 'react';

import TableOfContent from '~/components/TableOfContent';
import DocsArticle from '~/components/DocsArticle';
import RenderMarkdown from '~/components/RenderMarkdown';
import ExamplePhoneFieldOverview from '~/examples/phone-field/ExamplePhoneFieldOverview';
import ExamplePhoneFieldValidation from '~/examples/phone-field/ExamplePhoneFieldValidation';
import ExamplePhoneFieldTemplates from '~/examples/phone-field/ExamplePhoneFieldTemplates';
import ExamplePhoneFieldFormat from '~/examples/phone-field/ExamplePhoneFieldFormat';
import ExamplePhoneFieldOverrides from '~/examples/phone-field/ExamplePhoneFieldOverrides';
import content from '@via-profit/ui-kit/docs/phone-field/README.md';

const PhoneFieldOverview: React.FC = () => (
  <>
    <DocsArticle>
      <RenderMarkdown
        overrides={{
          ExamplePhoneFieldOverview,
          ExamplePhoneFieldValidation,
          ExamplePhoneFieldTemplates,
          ExamplePhoneFieldFormat,
          ExamplePhoneFieldOverrides,
        }}
      >
        {content}
      </RenderMarkdown>
    </DocsArticle>
    <TableOfContent content={content} />
  </>
);

export default PhoneFieldOverview;
