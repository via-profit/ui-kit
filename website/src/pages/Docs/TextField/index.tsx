import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleTextFieldOverview from '~/examples/text-field/ExampleTextFieldOverview';
import ExampleTextFieldValidation from '~/examples/text-field/ExampleTextFieldValidation';
import ExampleTextFieldIcons from '~/examples/text-field/ExampleTextFieldIcons';
import ExampleTextFieldStates from '~/examples/text-field/ExampleTextFieldStates';
import ExampleTextFieldOverrides from '~/examples/text-field/ExampleTextFieldOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const TextFields: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleTextFieldOverview,
      ExampleTextFieldValidation,
      ExampleTextFieldIcons,
      ExampleTextFieldStates,
      ExampleTextFieldOverrides,
    }}
  />
);

export default TextFields;
