import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExamplePhoneFieldOverview from '~/examples/phone-field/ExamplePhoneFieldOverview';
import ExamplePhoneFieldValidation from '~/examples/phone-field/ExamplePhoneFieldValidation';
import ExamplePhoneFieldTemplates from '~/examples/phone-field/ExamplePhoneFieldTemplates';
import ExamplePhoneFieldFormat from '~/examples/phone-field/ExamplePhoneFieldFormat';
import ExamplePhoneFieldOverrides from '~/examples/phone-field/ExamplePhoneFieldOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const PhoneFieldOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExamplePhoneFieldOverview,
      ExamplePhoneFieldValidation,
      ExamplePhoneFieldTemplates,
      ExamplePhoneFieldFormat,
      ExamplePhoneFieldOverrides,
    }}
  />
);

export default PhoneFieldOverview;
