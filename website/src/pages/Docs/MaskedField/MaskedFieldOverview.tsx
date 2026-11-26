import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleMaskedFieldOverview from '~/examples/masked-field/ExampleMaskedFieldOverview';
import ExampleMaskedFieldValidation from '~/examples/masked-field/ExampleMaskedFieldValidation';
import ExampleMaskedFieldValue from '~/examples/masked-field/ExampleMaskedFieldValue';
import ExampleMaskedFieldDynamic from '~/examples/masked-field/ExampleMaskedFieldDynamic';
import ExampleMaskedFieldTransform from '~/examples/masked-field/ExampleMaskedFieldTransform';
import ExampleMaskedFieldOverrides from '~/examples/masked-field/ExampleMaskedFieldOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const MaskedFieldOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleMaskedFieldOverview,
      ExampleMaskedFieldValidation,
      ExampleMaskedFieldValue,
      ExampleMaskedFieldDynamic,
      ExampleMaskedFieldTransform,
      ExampleMaskedFieldOverrides,
    }}
  />
);

export default MaskedFieldOverview;
