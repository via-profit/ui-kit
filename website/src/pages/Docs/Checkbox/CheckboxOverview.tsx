import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleCheckboxBasic from '~/examples/checkbox/ExampleCheckboxBasic';
import ExampleCheckboxIndeterminate from '~/examples/checkbox/ExampleCheckboxIndeterminate';
import ExampleCheckboxColors from '~/examples/checkbox/ExampleCheckboxColors';
import ExampleCheckboxLabelPlacement from '~/examples/checkbox/ExampleCheckboxLabelPlacement';
import ExampleCheckboxValidation from '~/examples/checkbox/ExampleCheckboxValidation';
import ExampleCheckboxOverrides from '~/examples/checkbox/ExampleCheckboxOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const CheckboxOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleCheckboxBasic,
      ExampleCheckboxIndeterminate,
      ExampleCheckboxColors,
      ExampleCheckboxLabelPlacement,
      ExampleCheckboxValidation,
      ExampleCheckboxOverrides,
    }}
  />
);

export default CheckboxOverview;
