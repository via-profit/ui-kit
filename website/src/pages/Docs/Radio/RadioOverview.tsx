import React from 'react';

import DocPage from '~/pages/DocPage';
import type { DocPageProps } from '~/pages/DocPage';

import ExampleRadioBasic from '~/examples/radio/ExampleRadioBasic';
import ExampleRadioControlled from '~/examples/radio/ExampleRadioControlled';
import ExampleRadioHorizontal from '~/examples/radio/ExampleRadioHorizontal';
import ExampleRadioValidation from '~/examples/radio/ExampleRadioValidation';
import ExampleRadioOverrides from '~/examples/radio/ExampleRadioOverrides';

/**
 * The page of the component: the documentation with the live examples
 */
const RadioOverview: React.FC<DocPageProps> = props => (
  <DocPage
    {...props}
    overrides={{
      ExampleRadioBasic,
      ExampleRadioControlled,
      ExampleRadioHorizontal,
      ExampleRadioValidation,
      ExampleRadioOverrides,
    }}
  />
);

export default RadioOverview;
